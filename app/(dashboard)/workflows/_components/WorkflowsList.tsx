"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Workflow } from "@/generated/prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox, CheckCircle2, Clock, LayoutGrid, List, MoreVertical, Trash2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function formatDate(value: string | Date) {
    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function StatusBadge({ status }: { status: string }) {
    const isPublished = status === "PUBLISHED";
    const tone = isPublished ? "bg-green-500/10 text-green-700" : "bg-amber-500/10 text-amber-700";
    const Icon = isPublished ? CheckCircle2 : Clock;

    return (
        <Badge className={tone} variant="secondary">
            <Icon className="mr-1 h-3.5 w-3.5" />
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

function WorkflowActions({ workflowName, workflowId }: { workflowName: string; workflowId: string }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = async () => {
        // TODO: Implement delete workflow action
        console.log("Deleting workflow:", workflowId);
        setShowDeleteDialog(false);
    };

    return (
        <>
            <DropdownMenu>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">More actions</span>
                                </Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>More actions</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the workflow <span className="font-semibold">"{workflowName}"</span>.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

function WorkflowsList({ workFlows }: { workFlows: Workflow[] }) {
    const items = workFlows ?? [];
    const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

    // Load preference from localStorage on mount
    useEffect(() => {
        const savedMode = localStorage.getItem("workflow-view-mode");
        if (savedMode === "grid" || savedMode === "compact") {
            setViewMode(savedMode);
        }
    }, []);

    // Save preference to localStorage whenever it changes
    const handleViewModeChange = (value: string) => {
        if (value && (value === "grid" || value === "compact")) {
            setViewMode(value);
            localStorage.setItem("workflow-view-mode", value);
        }
    };

    if (!items.length) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <ToggleGroup type="single" value={viewMode} onValueChange={handleViewModeChange}>
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                        <LayoutGrid className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="compact" aria-label="Compact view">
                        <List className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className={viewMode === "grid" ? "grid gap-4 lg:grid-cols-2" : "grid gap-2 lg:grid-cols-2 xl:grid-cols-3"}>
                {items.map((workflow) => (
                    <Card key={workflow.id} className={viewMode === "grid" ? "h-full" : ""}>
                        {viewMode === "grid" ? (
                            <>
                                <CardHeader className="space-y-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <CardTitle className="text-xl">{workflow.name}</CardTitle>
                                            <CardDescription>
                                                {workflow.description || "No description provided."}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <StatusBadge status={workflow.status} />
                                            <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
                                        </div>
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
                            </>
                        ) : (
                            <CardHeader className="py-3 px-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <StatusBadge status={workflow.status} />
                                        <div className="min-w-0 flex-1">
                                            <CardTitle className="text-sm font-semibold truncate mb-0.5">{workflow.name}</CardTitle>
                                            <p className="text-xs text-muted-foreground truncate">
                                                Updated {formatDate(workflow.updatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <Button variant="outline" size="sm" className="h-8 px-3 text-xs" asChild>
                                            <Link href={`/workflows/editor/${workflow.id}`}>Open</Link>
                                        </Button>
                                        <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
                                    </div>
                                </div>
                            </CardHeader>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default WorkflowsList;
