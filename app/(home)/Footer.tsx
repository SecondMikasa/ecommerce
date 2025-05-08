import {
    Heart,
    Github
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Mini E-Commerce. All rights reserved.
                </p>
            </div>

            <div className="container mt-4 flex flex-col md:flex-row justify-between items-center">
                <a
                    href="https://arnimfolio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 md:mb-0"
                >
                    SecondMikasa
                </a>

                <a
                    href="https://github.com/SecondMikasa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Github
                        className="h-4 w-4"
                    />
                    GitHub
                </a>
            </div>
        </footer>
    );
}