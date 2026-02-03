import React from 'react'
import CreateWorkFlowDialog from "@/app/(dashboard)/workflows/_components/CreateWorkFlowDialog";
import WorkflowsList from "@/app/(dashboard)/workflows/_components/WorkflowsList";
import {getWorkFlowsForUser} from "@/actions/workflows/WorkFlowActions";

async function WorkFlowsPage() {
    const workFlows = await getWorkFlowsForUser();

    return (
        <div className={"flex-1 flex flex-col h-full "}>
            <div className={"flex justify-between "}>
                <div className={"flex flex-col"}>
                    <h1 className={"text-3xl font-bold text-foreground"}>
                        Workflows
                    </h1>
                    <p className={"text-muted-foreground"}>
                        Manage your workflows and automation here.
                    </p>
                </div>
                <CreateWorkFlowDialog />
            </div>
            <div className={"h-full py-6"}>
                <WorkflowsList workFlows={workFlows} />
            </div>
        </div>
    )
}

export default WorkFlowsPage
