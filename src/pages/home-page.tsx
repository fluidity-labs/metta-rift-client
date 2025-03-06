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
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    const storyRef = useRef(null);

    // Auto-scroll to bottom when the terminal opens
    useEffect(() => {
        if (isTerminalOpen && storyRef.current) {
            storyRef.current.scrollTop = storyRef.current.scrollHeight;
        }
    }, [isTerminalOpen]);

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
        <div
            className="flex h-screen p-10 bg-zinc-900 text-white px-40 space-x-3"
            style={{
                backgroundImage: `url('https://cdn.pixabay.com/photo/2022/09/27/19/45/ai-generated-7483579_960_720.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "darken",
                backgroundColor: "rgba(0, 0, 0, 0.85)", // Darker effect
            }}
        >
            {/* Left Panel */}
            <div className="w-3/6 flex flex-col space-y-3 py-0">
                {/* Location Display */}
                <div className="bg-zinc-800 rounded-sm flex items-center justify-between p-5 pt-7">
                    <div className="w-full flex items-center justify-center text-center text-xl">
                        [ Location Placeholder ]
                    </div>
                </div>

                {/* Location Image Display */}
                <div className="w-full aspect-square bg-zinc-700 rounded-sm flex items-center justify-center p-2">
                    <div
                        className="w-full h-full bg-zinc-800 rounded-sm"
                        style={{
                            backgroundImage: `url('https://cdn.pixabay.com/photo/2022/09/27/19/45/ai-generated-7483579_960_720.jpg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
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
                {/* Story Display & Terminal */}
                <div className="h-full w-full mx-auto bg-zinc-800 p-0 rounded-sm thin-scrollbar overflow-y-auto flex flex-col">
                    {/* Story Text */}
                    <div ref={storyRef} className={`flex-1 overflow-y-auto p-10 px-16 ${isTerminalOpen ? "h-2/3" : "h-full"}` }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat ut nisi sed finibus. Quisque porta pellentesque nisl viverra aliquet. Nunc ut nisi id sem sagittis blandit. Aenean dapibus at neque scelerisque ultrices. Aenean scelerisque a nisi id venenatis. Maecenas nec feugiat nisl. Mauris feugiat laoreet odio, eget imperdiet risus. Proin ultricies pretium purus, non congue tortor auctor eu. Cras euismod condimentum ipsum. Vestibulum varius diam a rhoncus pellentesque. Aenean id massa ac justo ultricies ullamcorper eget eget magna. Quisque in dui sed augue dapibus lacinia vehicula vitae nibh. Nunc pellentesque sed orci at viverra. Quisque luctus sem dictum, viverra ligula eu, gravida felis. Integer sit amet aliquet quam, sed posuere erat.
                        <br></br>
                        <br></br>
Nam dictum sed orci vitae sagittis. Duis gravida quis nibh in ullamcorper. Cras imperdiet pulvinar euismod. Donec id congue lorem, quis posuere ligula. Mauris tincidunt nisi a diam viverra, quis sodales lectus commodo. In interdum leo at tortor cursus ultricies a vitae ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sodales massa a elementum bibendum. Phasellus condimentum fermentum nibh, id dapibus elit tempor a.
                        <br></br>
                        <br></br>
Aliquam consequat velit eget viverra tincidunt. Vestibulum pellentesque leo vel neque sollicitudin, et ullamcorper erat tincidunt. Curabitur efficitur magna mauris, id congue mauris accumsan sed. Morbi purus quam, maximus in quam eget, laoreet euismod nisi. Suspendisse euismod orci eu turpis pulvinar, vitae facilisis mi finibus. Duis condimentum purus dapibus lectus viverra accumsan. Sed pretium consectetur nisi at tincidunt. Vivamus eleifend, mi non commodo sagittis, mi ex dapibus massa, ut bibendum eros urna ac neque. Nullam efficitur tellus vitae lacinia vulputate. Phasellus non iaculis urna, non mattis tellus. Suspendisse maximus, lectus a faucibus pellentesque, justo libero tincidunt purus, in rhoncus justo tellus sed ex. Quisque sodales hendrerit dolor, aliquet commodo purus faucibus sed. Etiam vitae aliquet enim. Maecenas tempus, sapien vitae sollicitudin rutrum, diam lorem vehicula felis, non mollis neque dui a est. Morbi lacinia a ante at venenatis. 
                    </div>

                    {/* Terminal (Toggled) */}
                    {isTerminalOpen && (
                        <div className="h-1/3 bg-black text-green-300 font-mono p-4 rounded-sm overflow-y-auto mt-2">
                            <p>$ Terminal ...</p>
                        </div>
                    )}
                </div>

                {/* Player Input & Toggle Button */}
                <div className="w-full mx-auto bg-zinc-700 rounded-sm flex items-center p-6">
                    <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                        placeholder="Type your action..."
                    />
                    <button
                        className="ml-4 px-4 py-2 bg-zinc-800 rounded-sm text-gray-400 hover:text-white transition"
                        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                    >
                        🖥️
                    </button>
                </div>
            </div>
        </div>
    );
}


export default HomePage;