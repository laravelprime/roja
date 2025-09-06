import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { MenuIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import AppLogo from "../app-logo";
import { SharedData } from "@/types";
import { Button } from "../ui/button";

interface MobileMenuProps {
    navlinks?: { title: string; href: string; icon: any }[];
}

export default function MobileMenu({navlinks = []}: MobileMenuProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { auth } = usePage<SharedData>().props;

    return !isDesktop && <div className="inline-flex justify-between items-center">
        <Drawer direction="left">
            <DrawerTrigger>
                <MenuIcon/>
            </DrawerTrigger>
            <DrawerContent>
                <div className="relative h-full">
                    <div>
                        <div className="h-16 flex items-center justify-between border-b border-sidebar-border/50 px-4">
                            <Button variant="ghost" className="flex items-center gap-2 p-1">
                                <Link href="/" className="flex items-center gap-2">
                                    <AppLogo/>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-2 p-4">
                        {navlinks.map((link) => (
                            <li key={link.title}>
                                <Link href={link.href} className="text-primary text-sm inline-flex items-center gap-2">
                                    {link.icon} {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="absolute w-full bottom-0 p-4 flex items-center justify-between">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] text-center w-full"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    </div>
}