"use client"
import React from 'react'
import {CoinsIcon, ContactIcon, HomeIcon, Layers2Icon, ShieldCheckIcon} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import Link from "next/link";
import {usePathname} from "next/navigation";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";

const routes = [
    {
        href: "",
        label: "Home",
        icon: HomeIcon
    },
    {
        href: "workflows",
        label: "Workflows",
        icon: Layers2Icon
    },
    {
        href: "credentials",
        label: "Credentials",
        icon: ShieldCheckIcon
    },
    {
        href: "billing",
        label: "Billing",
        icon: CoinsIcon
    },
    {
        href: "contact",
        label: "Contact",
        icon: ContactIcon
    }
]

const DesktopSidebar = () => {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "") {
            return pathname === "/" || pathname === "";
        }
        return pathname.includes(href);
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-center gap-2 border-b border-separate p-4">
                    <Logo/>
                </div>

            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {routes.map((route) => {
                        const Icon = route.icon;
                        const active = isActive(route.href);

                        return (
                            <SidebarMenuItem key={route.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={active}
                                    tooltip={route.label}
                                >
                                    <Link href={`/${route.href}`}>
                                        <Icon className="h-5 w-5" />
                                        <span>{route.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default DesktopSidebar