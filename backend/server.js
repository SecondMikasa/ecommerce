require('dotenv').config()
const express = require('express')
const { PrismaClient } = require('./lib/generated/prisma');
const { z } = require('zod');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const productCreateSchema = z.object({
    name: z.string().min(8, {
        message: "Product name must be at least 8 characters.",
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
        .or(z.literal(''))
        .transform(val => (val === '' ? null : val)), // Transform empty string to null for DB
});

// --- API Routes ---

// GET /api/products - Fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                created_at: 'desc',
            },
        })
        console.log('Fetched products:', products)
        res.status(200).json(products)
    }
    catch (error) {
        console.error('Error fetching products:', error)

        res.status(500).json({ error: 'Failed to fetch products' });
    }
})

// POST /api/products - Create a new product
app.post('/api/addProduct', async (req, res) => {
    try {
        const body = req.body;

        // Validate request body against the Zod schema
        const validation = productCreateSchema.safeParse(body);

        if (!validation.success) {
            return res.status(400).json({
                error: 'Invalid input',
                details: validation.error.flatten().fieldErrors,
            });
        }

        // Use validated and transformed data
        const { name, price, description, image_url } = validation.data;

        const product = await prisma.product.create({
            data: {
                name,
                price, // Already coerced to number by Zod
                description,
                image_url, // Already transformed ('' to null) by Zod
            },
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        // Consider more specific error handling for Prisma errors if needed
        // e.g., if (error instanceof Prisma.PrismaClientKnownRequestError) { ... }
        res.status(500).json({ error: 'Failed to create product' });
    }
});

app.post('/api/deleteProduct', async (req, res) => {
    try {
        const { productId } = req.body

        if (!productId) {
            return res.status(404).json({ error: 'Failed to fetch productId' })
        }

        const deletedProduct = await prisma.product.delete({
            where: {
                id: productId
            }
        })

        res.status(200).json({
            message: "Product deleted successfully",
            deletedProduct
        })
    }
    catch (error) {
        console.error('Error deleting product:', error);

        res.status(500).json({ error: 'Failed to create product' });
    }
})

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Product API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown for Prisma Client (optional but good practice)
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});