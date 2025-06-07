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
        case "PLAYER": return "text-amber-500";
    }
    return "";
}

function HomePage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
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
    }, [lastJsonMessage])
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const message = formData.get("message");
        if (!message) {
            return;
        }
        form.reset();
        sendMessage(String(message));
    }
    useEffect(() => {
        // Scroll to the bottom when messages change
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <div className="flex flex-col h-full font-mono">
            <div className="border-2 border-gray-800 mb-4 flex flex-col flex-grow">
                <div className="min-h-0 h-0 flex-grow overflow-y-auto thin-scrollbar">
                    <ol className="list-none">
                        {isLoading && (
                            <li className="text-center">Loading...</li>
                        )}
                        {messages.map((message) => (
                            <li key={"message-" + String(message.id)} className="p-2 border-b-2 border-gray-800">
                                <span className={"font-bold " + getMessageTypeColor(message.type)}>{message.type}</span>
                                &nbsp;<span dangerouslySetInnerHTML={{ __html: message.text }}></span>
                            </li>
                        ))}
                    </ol>
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {!isLoading && (
                <form onSubmit={onSubmit} className="flex gap-2">
                    <input type="text" name="message" className="p-2 bg-zinc-800 flex-grow outline-none" autoFocus autoComplete="off" />
                    <input type="submit" value="Submit" className="bg-amber-800 p-2" autoComplete="off"  />
                </form>
            )}
        </div>
    );
}

export default HomePage;