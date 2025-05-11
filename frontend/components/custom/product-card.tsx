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
} from "@/components/ui/card"
import { ProductCardProps } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/functions"


export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { name, price, description, image_url, created_at } = product;
  
  // A placeholder image if no image_url is provided
  const imageUrl = image_url || "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={4/3}>
            <Image
              src={imageUrl}
              alt={name}
              fill
              className={`object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
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
        
        {/* <CardFooter className="pt-2">
          <motion.button
            className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm"
            whileTap={{ scale: 0.97 }}
          >
            View Details
          </motion.button>
        </CardFooter> */}
      </Card>
    </motion.div>
  )
}