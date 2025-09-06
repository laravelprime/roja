import { Mail, Phone } from "lucide-react";
import AppLogo from "../app-logo";
import { Link } from "@inertiajs/react";
import Heading from "../heading";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { FaGithub, FaLinkedin, FaReddit, FaWhatsapp } from "react-icons/fa";

interface FooterProps {
    className?: string;
}

export default function Footer({className}: FooterProps) {
    return (
        <footer className={`bg-sidebar py-8 ${className} grid lg:grid-cols-3 max-lg:gap-12`}>
            <div>
                <h2 className="mb-9">
                    <Link href="/" className="flex justify-center items-center gap-2">
                        <AppLogo/>
                    </Link>
                </h2>
                <ul className="flex flex-col gap-2">
                    <li>
                        <a className="inline-flex items-center gap-2" href="tel:+263784988345">
                            <Phone size={16}/>
                            +263 78 498 8345
                        </a>
                    </li>
                    <li>
                        <a className="inline-flex items-center gap-2" href="mailto:admin@laravelprime.com">
                            <Mail size={16}/>
                            admin@laravelprime.com
                        </a>
                    </li>
                    <li>
                        {/* Whatsapp, Reddit and LinkedIn Icons */}
                        <div className="flex gap-3">
                            <a href="https://wa.me/263784988345" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp">
                                <FaWhatsapp size={24} className=""/>
                            </a>
                            <a href="https://github.com/laravelprime" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
                                <FaGithub size={24} className=""/>
                            </a>
                            <a href="https://www.linkedin.com/in/comfort-prince/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin size={24} className=""/>
                            </a>
                            <a href="https://www.reddit.com/user/Additional_Pride_593/" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
                                <FaReddit size={24} className=""/>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <Heading title="Quick Links"/>
                <ul className="flex flex-col gap-2">
                    <li>
                        <Link className="hover:underline transition-all" href="/properties">Properties</Link>
                    </li>
                    <li>
                        <Link className="hover:underline" href="/contact">Contact Us</Link>
                    </li>
                    <li>
                        <Link className="hover:underline" href="/about">About Us</Link>
                    </li>
                </ul>
            </div>
            <div>
                <Heading title="Newsletter" description="Subscribe to our newsletter for the latest updates."/>
                <form>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="mb-4 w-full"
                        disabled
                    />
                    <Button disabled variant="default" className="w-full mb-4">
                        <Mail size={16} />
                        Subscribe
                    </Button>
                </form>
            </div>
        </footer>
    );
}