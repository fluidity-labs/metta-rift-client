import type React from "react";
import backgroundImage from "../assets/background.png";

function DefaultLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="relative h-screen font-sans overflow-hidden bg-cover"
             style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="w-3/12 mx-auto">
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;