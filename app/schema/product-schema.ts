import { z } from 'zod'

export const productCreateSchema = z.object({
    name: z
        .string()
        .min(8, {
        message: "Product name must be at least 8 characters"
    }),
    price: z
        .coerce
        .number()
        .positive({
        message: "Price must be a positive number",
    }),
    description: z
        .string()
        .min(10, {
        message: "Description must be at least 10 characters",
    }),
    image_url: z
        .string()
        .url({
        message: "Please enter a valid URL",
    })
        .optional()
        .or(z.literal(''))
        .transform(val => (val === '' ? null : val)),
})