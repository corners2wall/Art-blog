export interface PostDto {
  id: string;
  description: string;
  title: string;
  tag: string;
}

interface PriceDto {
  price: number;
  oldPrice: number;
  currency: string;
}

export interface ProductDto {
  id: string;
  title: string;
  designer: string;
  price: PriceDto;
}
