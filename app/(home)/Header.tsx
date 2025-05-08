"use client";

import { ShoppingBag } from "lucide-react"
import { ModeToggle } from "@/components/custom/mode-toggle"

export default function Header() {
    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div
                className="container flex h-16 items-center justify-between px-4"
            >
                <div className="flex items-center gap-2">
                    <ShoppingBag
                        className="h-6 w-6"
                    />
                    <span className="font-semibold text-lg">
                        Mini E-Commerce
                    </span>
                </div>
                <div className="flex items-center cursor-pointer ml-8">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}