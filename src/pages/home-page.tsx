import {FormEvent, useEffect, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
import {apiConfig} from "../config/api-config.ts";

interface Message {
    id: number;
    type: string;
    text: string;
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
        <>
            <div className="flex flex-col justify-end h-[50vh] px-4 pb-6">
                <p className="text-3xl font-bold text-white mt-2 drop-shadow-2xl">You wake in a white room. A strange feeling runs through your chest. You should look around and see if there&#39;s anything here.</p>
            </div>

            <div className="w-full">
                <input type="text"
                       name="message"
                       placeholder="Type your message here..."
                       className={`w-full text-xl px-4 py-2 border-2 border-white rounded-md focus:outline-none focus:border-gray-300`} />
            </div>
        </>
    );
}

export default HomePage;