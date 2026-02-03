"use client"

import {useCallback, useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Layers2Icon, Loader2} from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import {useForm} from "react-hook-form";
import {CreateWorkflowSchema, CreateWorkFlowSchemaType} from "@/schema/workflows";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useMutation} from "@tanstack/react-query";
import {createWorkFlow} from "@/actions/workflows/WorkFlowActions";
import {toast} from "sonner";

function CreateWorkFlowDialog({triggerText} : {triggerText?: string}) {
    const [open,setOpen] =  useState(false);


    const form = useForm<CreateWorkFlowSchemaType>(
        {
            resolver : zodResolver(CreateWorkflowSchema),
            defaultValues : {
                name: "",
                description: ""
            }
        }
    );

    const {mutate, isPending} = useMutation(
        {
            mutationFn: createWorkFlow,
            onSuccess: () => {
                toast.success("Workflow created successfully!");
            },
            onError: () => {
                toast.error("Failed to create workflow. Please try again.");
            }
        })


    const onSubmit = useCallback(
        (values: CreateWorkFlowSchemaType) => {
            const loadingToast = toast.loading("Creating your workflow...");
            mutate({form: values}, {
                onSuccess: () => {
                    toast.dismiss(loadingToast);
                },
                onError: () => {
                    toast.dismiss(loadingToast);
                }
            });
        },
        [mutate]
    )

    return <Dialog open={open} onOpenChange={
        (open)=> {
            form.reset();
            setOpen(open)
        }}
    >
        <DialogTrigger asChild>
            <Button>{triggerText?? "Create Workflow"}</Button>
        </DialogTrigger>
        <DialogContent className={"px-0"}>
            <CustomDialogHeader
                icon = {Layers2Icon}
                title = "Create New Workflow"
                subTitle = "Start building your Workflow"
            ></CustomDialogHeader>
            <div className={"p-6"}>
                <Form {...form}>
                    <form className={"space-y-8 w-full"} onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField render={({field}) => {
                            return(<FormItem>
                                <FormLabel className={"flex gap-1 items-center "}>
                                    Name
                                    <p className={"text-xs text-primary"}>(required)</p>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field}></Input>
                                </FormControl>
                                <FormDescription>
                                    Choose a descriptive name for your workflow to easily identify its purpose.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>)
                        }} name={"name"}>
                        </FormField>
                        <FormField name={"description"} render={({field}) => {
                            return(<FormItem>
                                <FormLabel className={"flex gap-1 items-center "}>
                                    Description
                                    <p className={"text-xs text-primary"}>(optional)</p>
                                </FormLabel>
                                <FormControl>
                                    <Textarea className={"resize-none"} {...field}></Textarea>
                                </FormControl>
                                <FormDescription>
                                    Choose a descriptive name for your workflow to easily identify its purpose.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>)
                        }} />
                        <Button type={"submit"} className={"w-full"} disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Loading...
                                </>
                            ) : (
                                "Proceed"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </DialogContent>
    </Dialog>;
}

export default CreateWorkFlowDialog;