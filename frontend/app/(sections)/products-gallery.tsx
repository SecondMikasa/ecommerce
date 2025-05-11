"use client";

import { useEffect, useState } from "react"
import {
    Search,
    Loader2
} from "lucide-react"

import apiClient from "@/lib/axios";

import { Input } from "@/components/ui/input"
import { toast } from "sonner";

import { ProductProps, ProductGalleryProps } from "@/lib/types"
import ProductCard from "@/components/custom/product-card"

export default function ProductGallery({
    products,
    setProducts,
    isLoading,
    setIsLoading,
}: ProductGalleryProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([])

    useEffect(() => {
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const response = await apiClient.get('/products')
          setProducts(response.data)
        }
        catch (error) {
          console.error("Error fetching products:", error)
          toast.error("Failed to load products. Please try again.")
        }
        finally {
          setIsLoading(false);
        }
      }

      fetchProducts()
    }, [setProducts, setIsLoading])

    useEffect(() => {
      if (searchQuery.trim() === "") {
        setFilteredProducts(products)
      }
      else {
        const query = searchQuery.toLowerCase()
        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered)
      }
    }, [searchQuery, products])

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                        {
                            searchQuery
                                ? "No products match your search criteria."
                                : "Add some products to get started!"
                        }
                    </p>
                </div>
            )}
        </div>
    )
}