import {FormEvent, useEffect, useRef, useState} from "react";
import {Typewriter} from "../components/Typewritter.tsx";
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
    number: number;
    inference: string;
    inferenceRaw: string;
    output: string;
    outputRaw: string;
}

function HomePage() {

    const introMessage = {
        number: 1,
        inference: "Intro",
        inferenceRaw: "!(intro)",
        output: "You open your eyes to a white room. Cold. Quiet. Something’s not right. Better take a look around.",
        outputRaw: "[\"You open your eyes to a white room. Cold. Quiet. Something’s not right. Better take a look around.\"]"
    }

    const allMessages = [
        {
            number: 2,
            inference: "Look around",
            inferenceRaw: "!(look around)",
            output: "You take in your surroundings. A wooden door stands closed. A figure watches from the corner. Two other rooms lie ahead: one red, the other blue",
            outputRaw: "[\"You take in your surroundings. A wooden door stands closed. A figure watches from the corner. Two other rooms lie ahead: one red, the other blue\"]"
        },
        {
            number: 3,
            inference: "Examine door",
            inferenceRaw: "!(examine door)",
            output: "A heavy wooden door. The handle doesn’t budge. It’s locked.",
            outputRaw: "[\"A heavy wooden door. The handle doesn’t budge. It’s locked.\"]"
        },
        {
            number: 4,
            inference: "Move to the red room",
            inferenceRaw: "!(move red_room)",
            output: "You step into the red room. The air is warmer here, tinted by the soft red glow that fills the space.",
            outputRaw: "[\"You step into the red room. The air is warmer here, tinted by the soft red glow that fills the space.\"]"
        },
        {
            number: 5,
            inference: "Look around",
            inferenceRaw: "!(look around)",
            output: "You glance around the red-lit room. The walls are bare, but on the floor, partially hidden in shadow, is a metal lever.",
            outputRaw: "[\"You glance around the red-lit room. The walls are bare, but on the floor, partially hidden in shadow, is a metal lever.\"]"
        },
    ];

    const [messages, setMessages] = useState<Message[]>([introMessage]);
    const [reversedMessages, setReversedMessages] = useState<Message[]>([introMessage]);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isConsoleEnabled, setIsConsoleEnabled] = useState<boolean>(false);
    const [isTranscriptEnabled, setIsTranscriptEnabled] = useState<boolean>(true);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        const form = e.currentTarget;
        form.reset();
        const index = messages.length - 1;
        const maxIndex = allMessages.length - 1;
        setTimeout(() => {
            if (maxIndex >= index) {
                setMessages([allMessages[index], ...messages]);
                setReversedMessages([...reversedMessages, allMessages[index]]);
            }
            setIsSending(false);
            setIsStarted(true);
        }, 1500);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const dropdownRefContains = dropdownRef.current && !dropdownRef.current.contains(event.target as Node);
            const dropdownButtonRefContains = dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target as Node);
            if (dropdownRefContains && dropdownButtonRefContains) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => { document.removeEventListener('mousedown', handleClickOutside) };
    }, []);

    const toggleConsole = () => {
        setIsConsoleEnabled((prevState) => {
            const newState = !prevState;
            if (newState) {
                setIsTranscriptEnabled(false);
            }
            return newState;
        });
    }

    const toggleTranscript = () => {
        setIsTranscriptEnabled((prevState) => {
            const newState = !prevState;
            if (newState) {
                setIsConsoleEnabled(false);
            }
            return newState;
        });
    }

    return (
        <motion.div
            layout
            className={`lg:w-196 w-full lg:p-0 p-2 mx-auto h-full flex flex-col ${isStarted ? '' : 'items-center justify-center'}`}>
            <motion.div
                layout
                className={`w-full ${isStarted ? '' : 'lg:-mt-48 -mt-24'}`}>
                <div className={`flex flex-col justify-center pb-6 text-center ${isStarted ? 'lg:mt-8 mt-4 min-h-48' : ''}`}>
                    <div key={`message-${messages[0].number.toString()}`}>
                        <p className="lg:text-4xl text-2xl font-bold text-white mt-2 text-shadow-xs text-shadow-gray-800">
                            <Typewriter text={messages[0].output} speed={40}/>
                        </p>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="relative flex w-full lg:mt-4 mt-0 rounded-md border border-white bg-white shadow-sm">
                    <input
                        type="text"
                        placeholder="What do you want to do?"
                        spellCheck="false"
                        className="flex-1 lg:text-2xl text-lg lg:px-6 px-4 lg:py-4 py-2 bg-transparent focus:outline-hidden focus:border-gray-300"
                    />
                    <button
                        type="submit"
                        disabled={isSending}
                        className="flex items-center pr-4 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                        {isSending && (
                            <svg className={`animate-spin -ml-1 h-5 w-5`} xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {!isSending && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"/>
                            </svg>
                        )}
                    </button>
                    {isStarted && (
                        <button
                            ref={dropdownButtonRef}
                            type="button"
                            onClick={toggleDropdown}
                            className="flex items-center px-4 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer border-l border-gray-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>
                        </button>
                    )}

                    <div ref={dropdownRef}>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    key="fade-box"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute right-0 z-10 top-full mt-2 w-48 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                                    <li className="cursor-default p-4 text-sm text-gray-800 select-none" id="listbox-option-0" role="option">
                                        <a onClick={toggleConsole} className="flex flex-row justify-between">
                                            Console
                                            {isConsoleEnabled && (
                                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"/>
                                                </svg>
                                            )}
                                        </a>
                                    </li>
                                    <li className="cursor-default p-4 text-sm text-gray-800 select-none" id="listbox-option-0" role="option">
                                        <a onClick={toggleTranscript} className="flex flex-row justify-between">
                                            Transcript
                                            {isTranscriptEnabled && (
                                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"/>
                                                </svg>
                                            )}
                                        </a>
                                    </li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </form>
            </motion.div>

            {isStarted && (
                <>
                    <div className={`${isConsoleEnabled ? '' : 'hidden'} bg-gray-950 text-gray-200 w-full h-96 rounded-md mt-4 flex flex-col font-mono text-sm grow mb-4`}>
                        <div className="overflow-y-auto console-text thin-scrollbar grow">
                            {reversedMessages.map((message) => (
                                <>
                                    <p key={`console-message-system-${message.number.toString()}`}><span className="console-player-text-tag">Player#</span> {message.inferenceRaw}</p>
                                    <p key={`console-message-player-${message.number.toString()}`}><span className="console-system-text-tag">System#</span> {message.outputRaw}</p>
                                </>
                            ))}
                        </div>
                        <div className="border-t border-gray-800 flex flex-row justify-end">
                            <div className="p-4 pr-0 console-player-text-tag">Player#</div>
                            <input type="text" className="p-4 w-full bg-transparent focus:outline-none" spellCheck="false"/>
                        </div>
                    </div>

                    <div className={`${isTranscriptEnabled ? '' : 'hidden'} mt-4`}>
                        <AnimatePresence initial={false}>
                        {messages.map((message, index) => {
                            return index != 0 && (
                                <motion.div
                                    key={`message-${message.number.toString()}`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col justify-end mb-2 text-gray-300 bg-gray-900/10 lg:p-4 p-2 rounded-md border border-gray-900/10 animate-slide-in">
                                    <p className="lg:text-xl text-md">
                                        {message.number.toString()}. {message.output}
                                    </p>
                                </motion.div>
                            )
                        })}
                        </AnimatePresence>
                    </div>
                </>
            )}
        </motion.div>
    );
}

export default HomePage;