export interface CartItem {
  id: number | undefined;
  name: string;
  price: number;
  image: string;
  size: string | null;
  sizes: boolean;
  slug: string;
  quantity: number;
}
