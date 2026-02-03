import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <div className="mx-auto max-w-md text-center">
                {/* Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="rounded-full bg-muted p-6">
                        <FileQuestion className="h-16 w-16 text-muted-foreground" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="mb-2 text-7xl font-bold tracking-tight text-foreground">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">
                    Page Not Found
                </h2>

                <p className="mb-8 text-muted-foreground">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild size="lg">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Link>
                    </Button>
                </div>

                {/* Additional Help Text */}
                <p className="mt-8 text-sm text-muted-foreground">
                    Need help?{" "}
                    <Link
                        href="/contact"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Contact support
                    </Link>
                </p>
            </div>
        </div>
    );
}