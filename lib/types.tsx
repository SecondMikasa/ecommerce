export interface ProductProps {
    id: number;
    name: string;
    price: number;
    description: string;
    image_url?: string;
    created_at: string;
  }
  
  export interface ProductFormDataProps {
    name: string;
    price: number;
    description: string;
    image_url?: string;
}
  
export interface ProductGalleryProps {
  products: ProductProps[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProductCardProps {
  product: ProductProps;
}