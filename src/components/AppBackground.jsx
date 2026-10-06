import React from "react";

const AppBackground = ({ children }) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f8f7ff]">

            {/* Background circles */}

            <div
                className="
                    fixed
                    -top-32
                    -left-32
                    w-[420px]
                    h-[420px]
                    rounded-full
                    bg-purple-200/40
                    pointer-events-none
                "
            />

            <div
                className="
                    fixed
                    top-24
                    -right-40
                    w-[500px]
                    h-[500px]
                    rounded-full
                    bg-purple-200/35
                    pointer-events-none
                "
            />

            <div
                className="
                    fixed
                    bottom-[-220px]
                    -left-40
                    w-[500px]
                    h-[500px]
                    rounded-full
                    bg-indigo-200/30
                    pointer-events-none
                "
            />

            <div
                className="
                    fixed
                    bottom-[-180px]
                    -right-32
                    w-[450px]
                    h-[450px]
                    rounded-full
                    bg-purple-200/30
                    pointer-events-none
                "
            />


            {/* Left dotted pattern */}

            <div
                className="
                    fixed
                    top-28
                    left-8
                    opacity-30
                    pointer-events-none
                "
            >
                <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 36 }).map((_, index) => (
                        <span
                            key={index}
                            className="w-1.5 h-1.5 rounded-full bg-purple-400"
                        />
                    ))}
                </div>
            </div>


            {/* Right dotted pattern */}

            <div
                className="
                    fixed
                    top-24
                    right-10
                    opacity-25
                    pointer-events-none
                "
            >
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 49 }).map((_, index) => (
                        <span
                            key={index}
                            className="w-1.5 h-1.5 rounded-full bg-purple-400"
                        />
                    ))}
                </div>
            </div>


            {/* Dashed decorative curve - left */}

            <div
                className="
                    fixed
                    top-48
                    left-[12%]
                    w-56
                    h-40
                    border-t
                    border-r
                    border-dashed
                    border-purple-200
                    rounded-tr-[120px]
                    opacity-50
                    pointer-events-none
                "
            />


            {/* Dashed decorative curve - right */}

            <div
                className="
                    fixed
                    top-44
                    right-[12%]
                    w-56
                    h-40
                    border-t
                    border-l
                    border-dashed
                    border-purple-200
                    rounded-tl-[120px]
                    opacity-50
                    pointer-events-none
                "
            />


            {/* Soft center glow */}

            <div
                className="
                    fixed
                    top-[15%]
                    left-1/2
                    -translate-x-1/2
                    w-[900px]
                    h-[600px]
                    rounded-full
                    bg-white/70
                    blur-3xl
                    pointer-events-none
                "
            />


            {/* Application */}

            <div className="relative z-10">
                {children}
            </div>

        </div>
    );
};

export default AppBackground;