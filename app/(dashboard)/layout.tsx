import React from "react"
import { Separator } from "@/components/ui/separator"
import DesktopSidebar from "@/components/DesktopSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import BreadCrumbHeader from "@/components/BreadCrumbHeader"
import { ModeToggle } from "@/components/ThemeModeToggle"
import {SignedIn, UserButton} from "@clerk/nextjs";

function Layout({ children }: { children: React.ReactNode }) {
    return (<div>

        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <DesktopSidebar />
                {/* Main column */}
                <div className="flex flex-col flex-1 min-h-screen">
                    {/* Header */}
                    <header className="w-full border-b">
                        <div className="container flex h-14 items-center justify-between px-6">

                            <div className="flex  flex-start items-center gap-3">
                                <SidebarTrigger className={"m-0"} variant={"ghost"}/>

                                <BreadCrumbHeader />
                            </div>

                            <div className={"flex items-center"}>
                                <SignedIn>
                                    <UserButton/>
                                </SignedIn>
                                <ModeToggle />
                            </div>
                        </div>
                    </header>

                    <Separator />

                    {/* Content */}
                    <div className="flex-1 overflow-auto">
                        <div className="container py-4 text-accent-foreground">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>

        </div>

    )
}

export default Layout
