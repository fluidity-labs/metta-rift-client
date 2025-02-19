import type React from "react";

function DefaultLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="bg-zinc-950 text-white">
            <main className="mx-auto max-w-5xl h-screen max-h-screen p-8 flex flex-col">
                <div className="mb-4">
                    <h1 className="text-center text-5xl">MeTTa Rift</h1>
                </div>
                <div className="flex-grow h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default DefaultLayout;