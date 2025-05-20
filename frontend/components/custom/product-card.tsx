"use client"

import { useState } from "react"

import Image from "next/image"

import { motion } from "framer-motion"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { formatCurrency, formatDate } from "@/lib/functions"
import { ProductCardProps } from "@/lib/types"
import apiClient from "@/lib/axios"

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id, name, price, description, image_url, created_at } = product;

  const imageUrl =
    image_url ||
    "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setIsDeleting(true);
      const res = await apiClient.post('/deleteProduct', {
        productId: id
      })

      if (res.status === 200) {
        onDelete?.()
      }
      else {
        alert(res.data.error || "Failed to delete product");
      }
    }
    catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the product.");
    }
    finally {
      setIsDeleting(false);
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={imageUrl}
              alt={name}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"
                }`}
            />
          </AspectRatio>
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-sm font-medium">
            {formatCurrency(price)}
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1">{name}</CardTitle>
          <CardDescription className="text-xs">
            Added {formatDate(created_at)}
          </CardDescription>
        </CardHeader>

        <CardContent className="py-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </CardContent>

        <CardFooter className="pt-2 flex justify-end">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}