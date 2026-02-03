"use server";

import {CreateWorkflowSchema, CreateWorkFlowSchemaType} from "@/schema/workflows";
import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import {WorkFlowStatus} from "@/types/workflow";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

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

    if(!result){
        throw new Error("Failed to create workflow");
    }

    redirect(`/workflows/editor/${result.id}`);
}

export async function deleteWorkflow(id: string) {
    const {userId} = await auth();

    if(!userId){
        throw new Error("User not authenticated");
    }

    // Verify the workflow belongs to the user before deleting
    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId
        }
    });

    if(!workflow){
        throw new Error("Workflow not found or you don't have permission to delete it");
    }

    await prisma.workflow.delete({
        where: {
            id,
            userId
        }
    });

    revalidatePath("/workflows");
}

export async function getWorkFlowsForUser() {
    const {userId} = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    return prisma.workflow.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}