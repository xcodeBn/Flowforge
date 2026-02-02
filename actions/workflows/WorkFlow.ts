"use server";

import {z} from "zod";
import {CreateWorkflowSchema, CreateWorkFlowSchemaType} from "@/schema/workflows";
import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import {WorkFlowStatus} from "@/types/workflow";

export async function createWorkFlow({form}:{form:CreateWorkFlowSchemaType}){
    const {success,data} = CreateWorkflowSchema.safeParse(form);

    if(!success){
        throw new Error("Failed to create workflow, invalid form data");
    }

    const {userId} = await auth();
    if(!userId){
        throw new Error("User not authenticated");
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkFlowStatus.DRAFT,
            definition: "TODO",
            ...data
        }
    })
}