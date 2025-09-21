import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import AppLogo from "../app-logo";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";
import { Building, Contact, Contact2, Home, House, icons, Phone } from "lucide-react";

const navlinks = [
    {
        title: "Home",
        href: "/",
        icon: <Home size={16} />
    },
    {
        title: "Properties",
        href: "/properties",
        icon: <Building size={16} />
    },
    {
        title: "Contact",
        href: "/contact",
        icon: <Phone size={16} />
    },
];

interface NavBarProps {
    className?: string;
}

export default function NavBar({ className }: NavBarProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className={`flex items-center justify-between border-b border-sidebar-border/50 h-16 ${className}`}>
            <Button variant="ghost" className="flex items-center gap-2 p-1">
                <Link href="/" className="flex items-center gap-2">
                    <AppLogo/>
                </Link>
            </Button>

            <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                    {navlinks.map((link) => (
                        <NavigationMenuItem key={link.title}>
                            <NavigationMenuLink asChild>
                                <Link href={link.href}>{link.title}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            <MobileMenu navlinks={navlinks}/>

            <div className="hidden md:flex items-center justify-end gap-4">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
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
    );
}