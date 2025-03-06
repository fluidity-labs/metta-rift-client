import {FormEvent, useEffect, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
import {apiConfig} from "../config/api-config.ts";

interface Message {
    id: number;
    type: string;
    text: string;
}

const getMessageTypeColor = (messageType: string) => {
    switch (messageType) {
        case "SYSTEM": return "text-amber-700";
        case "USER": return "text-amber-500";
    }
    return "";
}

function HomePage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("image");
    const {
        sendMessage,
        lastJsonMessage,
    } = useWebSocket<Message | null>(apiConfig.webSocketBaseUrl, {
        onOpen: () => {
            setMessages([]);
            setIsLoading(false);
        },
        shouldReconnect: (closeEvent) => {
            console.log(closeEvent); return false
        },
    });

    useEffect(() => {
        setMessages((prevState) => {
            if (!lastJsonMessage) {
                return prevState;
            }
            return [ ...prevState, lastJsonMessage ]
        })
    }, [lastJsonMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex h-screen p-10 bg-zinc-900 text-white px-40 space-x-3"
            style={{
                backgroundImage: `url('https://cdn.pixabay.com/photo/2022/09/27/19/45/ai-generated-7483579_960_720.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "darken",
                backgroundColor: "rgba(0, 0, 0, 0.85)", // Darker effect
        }}>

            
            {/* Left Panel */}
            <div className="w-3/6 flex flex-col space-y-3 py-0">
                {/* Game Title */}

                {/* Location Display */}
                <div className="h-1/10 bg-zinc-800 rounded-sm flex items-center justify-between p-3 px-5">
                    <div className="w-3/4 flex items-center justify-center text-xl">
                        [ Location Placeholder ]
                    </div>
                    <div className="w-1/6 bg-zinc-700 h-full rounded-full flex items-center justify-center aspect-square">
                        <div className="grid grid-cols-3 grid-rows-3 w-full h-full text-xs text-center">
                            <div></div>
                            <div className="flex items-center justify-center">North</div>
                            <div></div>
                            <div className="flex items-center justify-center">West</div>
                            <div className="flex items-center justify-center text-lg font-bold">+</div>
                            <div className="flex items-center justify-center">East</div>
                            <div></div>
                            <div className="flex items-center justify-center">South</div>
                            <div></div>
                        </div>
                    </div>
                </div>

                {/* Location Image and Terminal */}
                <div className="flex w-full relative">
                    {/* Tab Buttons (Left Sidebar) */}
                    <div className="absolute left-[-70px] flex flex-col space-y-1">
                        <button
                            className={`px-6 py-4 rounded-l-lg transition ${
                                activeTab === "image" ? "bg-zinc-700 text-white" : "bg-zinc-800 text-gray-400"
                            }`}
                            onClick={() => setActiveTab("image")}
                        >
                            🖼️
                        </button>
                        <button
                            className={`px-6 py-4 rounded-l-lg transition ${
                                activeTab === "terminal" ? "bg-zinc-700 text-white" : "bg-zinc-800 text-gray-400"
                            }`}
                            onClick={() => setActiveTab("terminal")}
                        >
                            🖥️
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="w-full aspect-square bg-zinc-700 rounded-sm flex items-center justify-center p-2 rounded-tl-none">
                        {activeTab === "image" ? (
                            <div
                                className="w-full h-full bg-zinc-800 rounded-sm"
                                style={{
                                    backgroundImage: `url('https://cdn.pixabay.com/photo/2022/09/27/19/45/ai-generated-7483579_960_720.jpg')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                        ) : (
                            <div className="w-full h-full bg-black text-green-300 font-mono p-4 rounded-sm overflow-y-auto">
                                <p>$ Terminal ...</p>
                            </div>
                        )}
                    </div>
                </div>


                {/* Player & Opponent Stats */}
                <div className="flex flex-col bg-zinc-900 p-0 rounded-sm space-y-2">
                    <div className="text-center bg-zinc-800 p-2 rounded-sm h-1/16">
                        <p><span className="font-bold">Player</span> | HP: 100 | DEF: 100 | Speed: 10</p>
                    </div>
                    <div className="text-center bg-zinc-800 p-2 rounded-sm h-1/16 text-zinc-500">
                        <p><span className="font-bold">Enemy</span> | HP: 10 | DEF: 10 | Speed: 5</p>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-3/4 flex flex-col space-y-2 ml-4">
                {/* Story Display */}
                <div className="h-full w-full mx-auto bg-zinc-800 p-4 rounded-sm thin-scrollbar overflow-y-auto">
                    <p>Story text goes here...</p>
                </div>

                {/* Player Input */}
                <div className="w-full mx-auto bg-zinc-700 rounded-sm flex items-center p-6">
                    <input type="text" className="w-full bg-transparent outline-none" placeholder="Type your action..." />
                </div>
            </div>
        </div>
    );
}


export default HomePage;