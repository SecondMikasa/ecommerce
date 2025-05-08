"use client";

import { useState } from "react"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

import { ProductProps } from "@/lib/types"

import ProductSubmitForm from "../(sections)/products-submit-form"
import ProductGallery from "../(sections)/products-gallery"

export default function ProductTabs() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleProductSubmit = (newProduct: ProductProps) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Mini E-Commerce Platform
        </h1>
        <p className="text-muted-foreground">
          Submit your products and browse your collection in one place.
        </p>
      </div>
      
      <Tabs defaultValue="submission" className="space-y-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="submission">
            Product Submission
          </TabsTrigger>
          <TabsTrigger value="products">
            My Products
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="submission" className="space-y-4">
          <div className="md:max-w-[800px] mx-auto">
            <ProductSubmitForm 
              onProductSubmit={handleProductSubmit}
              setIsLoading={setIsLoading}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <ProductGallery 
            products={products}
            setProducts={setProducts}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}