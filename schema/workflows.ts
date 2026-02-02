import {z} from "zod";


export const CreateWorkflowSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
});


export type CreateWorkFlowSchemaType = z.infer<typeof CreateWorkflowSchema>;