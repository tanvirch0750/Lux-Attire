export interface Product {
  _id?: string;
  name: string;
  description: string;
  details: string[];
  isAvailable: boolean;
  categoryDetails: {
    label: string;
    value: string;
  };
  colors: Color[];
  images: ProductImage[];
  salesData: SaleData[];
  totalQuantitySold: number;
  totalRevenueGenerated: number;
}

export interface Color {
  name: string;
  bgColor: string;
  sizeStocks: SizeStock[];
}

export interface SizeStock {
  size: string;
  stock: number;
  isAvailable: boolean;
}

export interface ProductImage {
  id: string;
  imageSrc: string;
  imageAlt: string;
  primary: boolean;
}

export interface SaleData {
  color: string;
  size: string;
  totalQuantity: number;
  totalRevenue: number;
}
