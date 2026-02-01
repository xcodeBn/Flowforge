import React from 'react'
import Link from "next/link";
import {cn} from "@/lib/utils";
import {SquareDashedMousePointer} from "lucide-react";

const Logo = ({
    fontSize = "text-2xl",
    iconSize = 24
}: {
    fontSize?: string,
    iconSize?: number
              }) => {
    return (
        <Link href={"/"} className={cn("text-2xl font-extrabold flex items-center gap-2",fontSize)}>
            <div className={"rounded-xl bg-linear-to-r from-primary to-fuchsia-600 p-2"}>
                <SquareDashedMousePointer size={iconSize} className={"stroke-white"}/>
            </div>
            <div>
                <span className={"bg-linear-to-r from-primary to-fuchsia-600 bg-clip-text text-transparent"}>
                    Forge
                </span>
                <span className={"text-stone-700 dark:text-stone-300 "}>
                    Flow
                </span>
            </div>
        </Link>
    )
}
export default Logo
