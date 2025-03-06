import type React from "react";

function DefaultLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex-grow h-full">
            {children}
        </div>
    );
}

export default DefaultLayout;