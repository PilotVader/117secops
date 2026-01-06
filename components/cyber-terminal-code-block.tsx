"use client"

import { useState } from "react"

interface CyberTerminalCodeBlockProps {
    code: string
    title?: string
    language?: string
}

export function CyberTerminalCodeBlock({
    code,
    title = "~/117-secops",
}: CyberTerminalCodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    return (
        <div className="my-6 rounded-lg overflow-hidden border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-[#0a0a0a] font-mono text-sm border-l-4 border-l-purple-500">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-purple-900/30">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-gray-400 text-xs select-none font-medium tracking-wide">
                    {title}
                </div>
                <button
                    onClick={handleCopy}
                    className="group relative p-1.5 hover:bg-purple-900/20 rounded transition-colors focus:outline-none"
                    title="Copy code"
                >
                    {isCopied ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-purple-400"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500 group-hover:text-purple-400 transition-colors"
                        >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                    )}

                    {/* Tooltip feedback */}
                    {isCopied && (
                        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-xs text-purple-300 px-2 py-1 bg-purple-950/90 rounded border border-purple-500/30 animate-in fade-in zoom-in duration-200">
                            Copied!
                        </span>
                    )}
                </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 overflow-x-auto relative">


                {/* 
                  Using text-gray-200 (brighter) as base which is readable on dark bg. 
                  Added dark:text-gray-200 explicitly to ensure it overrides any global 'dark mode' inversion if that's happening.
                */}
                <pre className="text-gray-200 font-medium whitespace-pre font-mono leading-relaxed pl-1 text-base">
                    <code>
                        {code}
                    </code>
                </pre>
                {/* Scanline effect overlay (subtle) */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
            </div>
        </div>
    )
}
