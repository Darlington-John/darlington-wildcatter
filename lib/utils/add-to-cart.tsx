import { CartItem } from "~/lib/data/cart";

export const addToCart = (item: CartItem) => {
  const cartJSON = localStorage.getItem("cart");
  const cart: CartItem[] = cartJSON ? JSON.parse(cartJSON) : [];

  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id && cartItem.size === item.size
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("bagUpdated"));
};
