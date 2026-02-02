"use client"

import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

interface Props{
    title?: string;
    subTitle?: string;
    icon?: LucideIcon;

    iconClassName?: string;
    titleClassName?: string;
    subTitleClassName?: string;
}


const CustomDialogHeader = (props:Props) => {
    const Icon = props.icon;

    return (
        <DialogHeader className={"py-6"}>
            <DialogTitle asChild>
                <div className={"flex flex-col items-center gap-2 mb-2"}>
                    {Icon && <Icon size={30} className={cn("stroke-primary",props.iconClassName)}/>}
                    {props.title && <h2 className={cn("text-2xl font-bold text-foreground",props.titleClassName)}>{props.title}</h2>}
                    {props.subTitle && <p className={cn("text-sm text-muted-foreground",props.subTitleClassName)}>{props.subTitle}</p>}
                </div>
            </DialogTitle>
            <Separator/>
        </DialogHeader>
    )
}
export default CustomDialogHeader
