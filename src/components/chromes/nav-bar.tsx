import Link from "next/link";
import { ScrollButton } from "@/components/ui/scroll-button";
import { Code } from "lucide-react";
import ThemeToggle from "@/components/chromes/theme-toggle";
import { RxGithubLogo } from "react-icons/rx";
import { VscVscode } from "react-icons/vsc";

interface NavBarProps {
    stars: string | null;
    downloads: string | null;
}

export function NavBar({ stars, downloads }: NavBarProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Code className="h-8 w-8 text-foreground" />
                        <span className="text-xl font-bold">Roo Code</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden text-sm font-medium md:flex md:items-center md:space-x-3 lg:space-x-8">
                    <ScrollButton targetId="features" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        Features
                    </ScrollButton>
                    <ScrollButton targetId="testimonials" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        Testimonials
                    </ScrollButton>
                    <ScrollButton targetId="faq" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        FAQ
                    </ScrollButton>
                    <a href="https://docs.roocode.com" target="_blank" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        Documentation
                    </a>
                </nav>

                <div className="hidden md:flex md:items-center md:space-x-3">
                    <ThemeToggle />
                    <Link href="https://github.com/RooVetGit/Roo-Code" target="_blank" className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground md:flex">
                        <RxGithubLogo className="h-4 w-4" />
                        {stars !== null && <span>{stars}</span>}
                    </Link>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline" target="_blank" className="hidden items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:flex">
                        <VscVscode className="-mr-[2px] mt-[1px] h-4 w-4" />
                        <span>
                            Install <span className="font-black">&middot;</span>
                        </span>
                        {downloads !== null && <span>{downloads}</span>}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex gap-2 md:hidden">
                    <Link href="https://github.com/RooVetGit/Roo-Code" target="_blank" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                        {stars !== null && <span>{stars}</span>}
                        <RxGithubLogo className="h-4 w-4" />
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
