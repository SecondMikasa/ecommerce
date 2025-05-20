"use client";

import { useEffect, useState } from "react"
import {
  Search,
  Loader2
} from "lucide-react"

import { Input } from "@/components/ui/input"
import ProductCard from "@/components/custom/product-card"
import { toast } from "sonner";

import { ProductProps, ProductGalleryProps } from "@/lib/types"
import apiClient from "@/lib/axios";

export default function ProductGallery({
  products,
  setProducts,
  isLoading,
  setIsLoading,
}: ProductGalleryProps) {

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Debounce search query - wait 500ms after user stops typing before updating
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
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

  // Use the debounced search query for filtering
  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setFilteredProducts(products)
      return
    }

    const fetchAIKeywords = async () => {
      setIsSearching(true);
      try {
        const res = await apiClient.post('/search', {
          query: debouncedSearchQuery
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await res.data
        // console.log(res.data)
        const aiKeywords = data.keywords

        console.log("AI Keywords:", aiKeywords)

        // If AI return no keywords, no results are shown
        if (!Array.isArray(aiKeywords) || aiKeywords.length === 0) {
          setFilteredProducts([])
          return
        }

        const filtered = products.filter((product) => {
          const lowerName = product.name.toLowerCase()
          const lowerDesc = product.description.toLowerCase()
          return aiKeywords.some((keyword: string) =>
            lowerName.includes(keyword) || lowerDesc.includes(keyword)
          )
        })

        setFilteredProducts(filtered)
      }
      catch (err) {
        console.error("AI search failed:", err)

        toast.error("AI search failed. Falling back to keyword search.")

        // Fallback to basic search
        const query = debouncedSearchQuery.toLowerCase();
        const fallback = products.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        )
        setFilteredProducts(fallback)
      }
      finally {
        setIsSearching(false);
      }
    };

    fetchAIKeywords()
  }, [debouncedSearchQuery, products])

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
        {
          isSearching && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )
        }
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => {
                setProducts((prev) => prev.filter((p) => p.id !== product.id))
              }}
            />
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