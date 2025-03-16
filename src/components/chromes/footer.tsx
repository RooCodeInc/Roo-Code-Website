import { Code } from "lucide-react";
import { RxGithubLogo, RxDiscordLogo } from "react-icons/rx";
import { FaReddit } from "react-icons/fa6";
import { ScrollButton } from "@/components/ui/scroll-button";

export function Footer() {
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
                            <a href="https://github.com/RooVetGit/Roo-Code" target="_blank" className="text-muted-foreground transition-colors hover:text-foreground">
                                <RxGithubLogo className="h-6 w-6" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://discord.gg/roocode" target="_blank" className="text-muted-foreground transition-colors hover:text-foreground">
                                <RxDiscordLogo className="h-6 w-6" />
                                <span className="sr-only">Discord</span>
                            </a>
                            <a href="https://reddit.com/r/RooCode" target="_blank" className="text-muted-foreground transition-colors hover:text-foreground">
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
                                        <ScrollButton targetId="testimonials" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Testimonials
                                        </ScrollButton>
                                    </li>
                                    <li>
                                        <a href="https://docs.roocode.com/community" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Integrations
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/RooVetGit/Roo-Code/blob/main/CHANGELOG.md" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Changelog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold uppercase leading-6 text-foreground">Resources</h3>
                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a href="https://docs.roocode.com" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://docs.roocode.com/tutorial-videos" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Tutorials
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/RooVetGit/Roo-Code/discussions" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Community
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://discord.gg/roocode" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Discord
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.reddit.com/r/RooCode/" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
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
                                        <a href="https://github.com/RooVetGit/Roo-Code/issues" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Issues
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/RooVetGit/Roo-Code/discussions/categories/feature-requests" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
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
                                        <a href="https://github.com/RooVetGit/Roo-Code/blob/main/PRIVACY.md" target="_blank" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                                            Privacy Policy
                                        </a>
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
