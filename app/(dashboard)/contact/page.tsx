"use client"

import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-16">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
                    Contact us
                </h1>
                <p className="text-lg text-muted-foreground">
                    We do not use an email form here—reach us directly with the details below.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Talk to us
                        </CardTitle>
                        <CardDescription>
                            Choose the channel that works best for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                                <Mail className="h-4 w-4 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Support email</p>
                                <a
                                    href="mailto:pisceshelpcenter@outlook.com"
                                    className="text-sm text-primary hover:underline"
                                >
                                    pisceshelpcenter@outlook.com
                                </a>
                                <p className="text-sm text-muted-foreground">
                                    Share a clear subject and any relevant screenshots or links.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-sm font-semibold">Need to report a bug?</p>
                            <p className="text-sm text-muted-foreground">
                                Include steps to reproduce, expected vs. actual behavior, and your browser/OS.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button variant="secondary" asChild>
                                <Link href="mailto:pisceshelpcenter@outlook.com?subject=Support%20request">
                                    Email support
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="mailto:pisceshelpcenter@outlook.com?subject=Feedback">
                                    Send feedback
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Clock className="h-4 w-4" />
                                Response time
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                We typically respond within 24–48 hours on business days.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MapPin className="h-4 w-4" />
                                Time zone
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Our team works primarily in UTC±0. Please allow for time zone differences.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}