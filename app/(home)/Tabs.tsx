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
    <div className="w-full max-w-6xl mx-auto space-y-10 px-4 py-8 animate-in fade-in duration-500">
      <Tabs defaultValue="submission" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto bg-muted rounded-lg p-1">
          <TabsTrigger
            value="submission"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
          >
            Product Submission
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
          >
            My Products
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="submission"
          className="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 max-w-3xl mx-auto">
            <ProductSubmitForm
              onProductSubmit={handleProductSubmit}
            />
          </div>
        </TabsContent>

        <TabsContent
          value="products"
          className="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <ProductGallery
              products={products}
              setProducts={setProducts}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}