"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ScrollButton } from "@/components/ui/scroll-button";
import ThemeToggle from "@/components/chromes/theme-toggle";
import { RxGithubLogo } from "react-icons/rx";
import { VscVscode } from "react-icons/vsc";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useLogoSrc } from "@/lib/hooks/useLogoSrc";

interface NavBarProps {
    stars: string | null;
    downloads: string | null;
}

export function NavBar({ stars, downloads }: NavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const logoSrc = useLogoSrc();

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logoSrc}
                            alt="Roo Code Logo"
                            width={120}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden text-sm font-medium md:flex md:items-center md:space-x-3 lg:space-x-8">
                    <ScrollButton targetId="features" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        Features
                    </ScrollButton>
                    <ScrollButton targetId="testimonials" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground max-lg:hidden">
                        Testimonials
                    </ScrollButton>
                    <ScrollButton targetId="faq" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        FAQ
                    </ScrollButton>
                    <Link href="/enterprise" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        Enterprise
                    </Link>
                    <a href={EXTERNAL_LINKS.DOCUMENTATION} target="_blank" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        Documentation
                    </a>
                    <a href={EXTERNAL_LINKS.CAREERS} target="_blank" className="text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground">
                        Careers
                    </a>
                </nav>

                <div className="hidden md:flex md:items-center md:space-x-3">
                    <ThemeToggle />
                    <Link href={EXTERNAL_LINKS.GITHUB} target="_blank" className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground md:flex">
                        <RxGithubLogo className="h-4 w-4" />
                        {stars !== null && <span>{stars}</span>}
                    </Link>
                    <Link href={EXTERNAL_LINKS.MARKETPLACE} target="_blank" className="hidden items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:flex">
                        <VscVscode className="-mr-[2px] mt-[1px] h-4 w-4" />
                        <span>
                            Install <span className="font-black">&middot;</span>
                        </span>
                        {downloads !== null && <span>{downloads}</span>}
                    </Link>
                </div>

                {/* Mobile Menu Button and Icons */}
                <div className="flex items-center gap-2 md:hidden">
                    <Link href={EXTERNAL_LINKS.GITHUB} target="_blank" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                        <RxGithubLogo className="h-4 w-4" />
                        {stars !== null && <span>{stars}</span>}
                    </Link>
                    <Link href={EXTERNAL_LINKS.MARKETPLACE} target="_blank" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                        <VscVscode className="h-4 w-4" />
                        {downloads !== null && <span>{downloads}</span>}
                    </Link>
                    <ThemeToggle />
                    <button aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Toggle mobile menu"
                    >
                        {isMenuOpen ? (
                            <IoClose className="h-6 w-6" />
                        ) : (
                            <HiMenu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div className={`absolute left-0 right-0 top-16 z-50 transform border-b border-border bg-background shadow-lg backdrop-blur-none transition-all duration-200 md:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'}`}>
                <nav className="flex flex-col py-2">
                    <ScrollButton
                        targetId="features"
                        className="w-full px-8 py-3 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Features
                    </ScrollButton>
                    <ScrollButton
                        targetId="testimonials"
                        className="w-full px-8 py-3 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Testimonials
                    </ScrollButton>
                    <ScrollButton
                        targetId="faq"
                        className="w-full px-8 py-3 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        FAQ
                    </ScrollButton>
                    <Link
                        href="/enterprise"
                        className="w-full px-8 py-3 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Enterprise
                    </Link>
                    <a
                        href={EXTERNAL_LINKS.DOCUMENTATION}
                        target="_blank"
                        className="w-full px-8 py-3 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Documentation
                    </a>
                    <a
                        href={EXTERNAL_LINKS.CAREERS}
                        target="_blank"
                        className="w-full px-8 py-3 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Careers
                    </a>
                </nav>
            </div>
        </header>
    );
}
