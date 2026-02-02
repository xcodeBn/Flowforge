"use client"

import {useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Layers2Icon} from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CeateWorkflowSchema} from "@/schema/workflows";
import {zodResolver} from "@hookform/resolvers/zod";

function CreateWorkFlowDialog({triggerText} : {triggerText?: string}) {
    const [open,setOpen] =  useState(false);
    const form = useForm<z.infer<typeof  CeateWorkflowSchema>>(
        {
            resolver : zodResolver(CeateWorkflowSchema),
            defaultValues : {}
        }
    );

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>{triggerText?? "Create Workflow"}</Button>
        </DialogTrigger>
        <DialogContent className={"px-0"}>
            <CustomDialogHeader
                icon = {Layers2Icon}
                title = "Create New Workflow"
                subTitle = "Start building your Workflow"
            ></CustomDialogHeader>
        </DialogContent>
    </Dialog>;
}

export default CreateWorkFlowDialog;