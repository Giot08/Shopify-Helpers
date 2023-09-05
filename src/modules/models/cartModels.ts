interface CartItemFeaturedImage {
  aspect_ratio: number;
  alt: string;
  height: number;
  url: string;
  width: number;
}
interface CartItemQuantityRule {
  min: number;
  max: number | null;
  increment: number;
}
interface CartItem {
  discounted_price: number;
  discounts: any; // To define Later
  featured_image: CartItemFeaturedImage;
  final_line_price: number;
  final_price: number;
  gift_card: boolean;
  grams: number;
  handle: string;
  has_components: boolean;
  id: number;
  image: string;
  key: string;
  line_level_discount_allocations: any; // To define Later
  line_level_total_discount: number;
  line_price: number;
  options_with_values: object;
  original_line_price: number;
  original_price: number;
  price: number;
  product_description: string;
  product_has_only_default_variant: boolean;
  product_id: number;
  product_title: string;
  product_type: string;
  properties: any; // To define Later
  quantity: number;
  quantity_rule: CartItemQuantityRule;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  total_discount: number;
  url: string;
  variant_id: number;
  variant_options: any; // To define Later
  variant_title: string | null;
  vendor: string | null;
}

interface Cart {
  attributes: object;
  cart_level_discount_applications: Array<any>;
  currency: string;
  item_count: number;
  items: Array<CartItem>;
  items_subtotal_price: number;
  note: string;
  original_total_price: number;
  requires_shipping: boolean;
  token: string;
  total_discount: number;
  total_price: number;
  total_weight: number;
}

export { Cart, CartItem };
