"use client";

import { Code, ChevronDown } from "lucide-react";
import { RxGithubLogo, RxDiscordLogo } from "react-icons/rx";
import { FaReddit } from "react-icons/fa6";
import { ScrollButton } from "@/components/ui/scroll-button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function Footer() {
    const [privacyDropdownOpen, setPrivacyDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setPrivacyDropdownOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-6 pb-6 pt-12 md:pb-8 md:pt-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <div className="flex items-center space-x-2">
                            <Code className="h-6 w-6 text-foreground" />
                            <span className="text-lg font-bold text-foreground">Roo Code</span>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-muted-foreground md:pr-16 lg:pr-32">Empowering developers to build better software faster with AI-powered tools and insights.</p>
                        <div className="flex space-x-5">
                            <a href={EXTERNAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                                <RxGithubLogo className="h-6 w-6" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href={EXTERNAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                                <RxDiscordLogo className="h-6 w-6" />
                                <span className="sr-only">Discord</span>
                            </a>
                            <a href={EXTERNAL_LINKS.REDDIT} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                                <FaReddit className="h-6 w-6" />
                                <span className="sr-only">Reddit</span>
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold uppercase leading-6 text-foreground">Product</h3>
                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <ScrollButton targetId="features" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Features
                                        </ScrollButton>
                                    </li>
                                    <li>
                                        <Link href="/enterprise" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Enterprise
                                        </Link>
                                    </li>
                                    <li>
                                        <ScrollButton targetId="testimonials" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Testimonials
                                        </ScrollButton>
                                    </li>
                                    <li>
                                        <a href={EXTERNAL_LINKS.INTEGRATIONS} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Integrations
                                        </a>
                                    </li>
                                    <li>
                                        <a href={EXTERNAL_LINKS.CHANGELOG} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Changelog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold uppercase leading-6 text-foreground">Resources</h3>
                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a href={EXTERNAL_LINKS.DOCUMENTATION} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a href={EXTERNAL_LINKS.TUTORIALS} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Tutorials
                                        </a>
                                    </li>
                                    <li>
                                        <a href={EXTERNAL_LINKS.COMMUNITY} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Community
                                        </a>
                                    </li>
                                    <li>
                                        <a href={EXTERNAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Discord
                                        </a>
                                    </li>
                                    <li>
                                        <a href={EXTERNAL_LINKS.REDDIT} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Reddit
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold uppercase leading-6 text-foreground">Support</h3>
                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a href={EXTERNAL_LINKS.ISSUES} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Issues
                                        </a>
                                    </li>
                                    <li>
                                        <a href={EXTERNAL_LINKS.FEATURE_REQUESTS} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Feature Requests
                                        </a>
                                    </li>
                                    <li>
                                        <ScrollButton targetId="faq" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            FAQ
                                        </ScrollButton>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold uppercase leading-6 text-foreground">Company</h3>
                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a href="mailto:support@roocode.com" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a href={EXTERNAL_LINKS.CAREERS} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Careers
                                        </a>
                                    </li>
                                    <li>
                                        <div className="relative z-10" ref={dropdownRef}>
                                            <button
                                                onClick={() => setPrivacyDropdownOpen(!privacyDropdownOpen)}
                                                className="flex items-center text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                                                aria-expanded={privacyDropdownOpen}
                                                aria-haspopup="true"
                                            >
                                                Privacy Policy
                                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${privacyDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            
                                            {privacyDropdownOpen && (
                                                <div className="absolute z-50 mt-2 w-48 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none left-0 md:right-0 md:left-auto border border-border">
                                                    <div className="py-1">
                                                        <a
                                                            href={EXTERNAL_LINKS.PRIVACY_POLICY_EXTENSION}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block px-4 py-2 text-sm text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground"
                                                            onClick={() => setPrivacyDropdownOpen(false)}
                                                        >
                                                            Extension
                                                        </a>
                                                        <Link
                                                            href={EXTERNAL_LINKS.PRIVACY_POLICY_WEBSITE}
                                                            className="block px-4 py-2 text-sm text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground"
                                                            onClick={() => setPrivacyDropdownOpen(false)}
                                                        >
                                                            Marketing Website
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex border-t border-border pt-8 sm:mt-20 lg:mt-24">
                    <p className="mx-auto text-sm leading-5 text-muted-foreground">&copy; {new Date().getFullYear()} Roo Code. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
