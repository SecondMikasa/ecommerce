import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

import { productCreateSchema } from '@/app/schema/product-schema'

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                created_at: 'desc',
            },
        })

        return NextResponse.json(products,
            {
                status: 200
            })
    }
    catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            {
                error: 'Failed to fetch products'
            },
            {
                status: 500
            }
        )
    }
}

// POST new product
export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate required fields
        const validation = productCreateSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'Invalid input',
                    details: validation.error.flatten().fieldErrors,
                },
                { status: 400 }
            )
        }

        const { name, price, description, image_url } = validation.data

        const product = await prisma.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                image_url: image_url,
            },
        })

        return NextResponse.json(
            product,
            {
                status: 201
            })
    }
    catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json(
            {
                error: 'Failed to create product'
            },
            {
                status: 500
            }
        )
    }
}