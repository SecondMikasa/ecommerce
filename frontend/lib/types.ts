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
  setProducts: (products: ProductProps[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export interface ProductCardProps {
  product: ProductProps;
}