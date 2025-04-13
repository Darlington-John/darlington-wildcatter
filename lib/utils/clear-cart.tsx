export const clearCart = () => {
  localStorage.setItem("cart", JSON.stringify([]));
  window.dispatchEvent(new CustomEvent("bagUpdated"));
};
