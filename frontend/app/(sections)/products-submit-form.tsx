"use client";

import { useState } from "react"
import {
    Image,
    Loader2
} from "lucide-react"

import apiClient from "@/lib/axios";

import { useForm } from "react-hook-form"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "sonner";

import { ProductProps } from "@/lib/types"
// import { ApiResponse } from "@/lib/ApiResponse"

const formSchema = z.object({
    name: z.string().min(5, {
        message: "Product name must be at least 5 characters.",
    }),
    price: z.coerce.number().positive({
        message: "Price must be a positive number.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    image_url: z.string().url({
        message: "Please enter a valid URL.",
    })
        .optional()
        .or(z.literal('')),
})

interface ProductSubmissionFormProps {
    onProductSubmit: (product: ProductProps) => void;
}

export default function ProductSubmissionForm({
    onProductSubmit,
}: ProductSubmissionFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            image_url: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await apiClient.post('/addProduct', values);

            toast.success("Your product has been successfully added.")

            onProductSubmit(response.data);
            form.reset();
        } catch (error) {
            console.error("Error submitting product:", error)
            toast.error("Failed to submit product. Please try again.")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Submit a New Product
                </h2>
                <p className="text-sm text-muted-foreground">
                    Fill out the form below to add a new product to your collection.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Product Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Modern Desk Chair"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Price (Rs)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="99.99"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe your product..."
                                        className="min-h-[100px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Image URL (optional)
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center space-x-2">
                                        <Image
                                            className="h-4 w-4 text-muted-foreground"
                                        />
                                        <Input
                                            placeholder="https://example.com/image.jpg"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Enter a URL for your product image.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end pt-4"> 
                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                            disabled={isSubmitting}
                            size="lg"
                        >
                            {
                                isSubmitting ?
                                    (
                                        <>
                                            <Loader2
                                                className="mr-2 h-4 w-4 animate-spin"
                                            />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Product"
                                    )
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}