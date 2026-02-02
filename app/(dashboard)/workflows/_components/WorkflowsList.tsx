"use client"

import Link from "next/link";
import type { Workflow } from "@/generated/prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Inbox } from "lucide-react";

function formatDate(value: string | Date) {
    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function StatusBadge({ status }: { status: string }) {
    const tone = status === "PUBLISHED" ? "bg-green-500/10 text-green-700" : "bg-amber-500/10 text-amber-700";
    return (
        <Badge className={tone} variant="secondary">
            {status}
        </Badge>
    );
}

function EmptyState() {
    return (
        <Card className="flex h-full items-center justify-center border-dashed text-center">
            <CardContent className="flex flex-col items-center gap-3 py-10">
                <div className="rounded-full bg-muted p-3">
                    <Inbox className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                    <p className="text-lg font-semibold">No workflows yet</p>
                    <p className="text-sm text-muted-foreground">Create your first workflow to get started.</p>
                </div>
            </CardContent>
        </Card>
    );
}

function WorkflowsList({ workFlows }: { workFlows: Workflow[] }) {
    const items = workFlows ?? [];

    if (!items.length) {
        return <EmptyState />;
    }

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            {items.map((workflow) => (
                <Card key={workflow.id} className="h-full">
                    <CardHeader className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <CardTitle className="text-xl">{workflow.name}</CardTitle>
                                <CardDescription>
                                    {workflow.description || "No description provided."}
                                </CardDescription>
                            </div>
                            <StatusBadge status={workflow.status} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Updated {formatDate(workflow.updatedAt)}
                        </p>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Created</span>
                            <span className="font-medium text-foreground">{formatDate(workflow.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/workflows/editor/${workflow.id}`}>Open</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default WorkflowsList;
