// stores/cart.js
import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import type { IProduct } from "~/types";

export const useCart = defineStore("cart", () => {
  const products = ref<Array<IProduct>>([
    {
      id: 1,
      title: "(iBox) New Macbook Air M2 256GB 2022 Garansi Resmi Indonesia",
      image:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/12/9/c405e6e5-a7e2-4808-85f0-790188488f26.jpg.webp?ect=4g",
      price: 15000000,
      discount: 10,
      stock: 10,
      rating: 4,
      review: 204,
      quantity: 0,
    },
    {
      id: 2,
      title:
        "Apple Macbook Air M3 13' inch 2024 - Garansi Resmi Apple Indonesia iBox'",
      image:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/9/9/fbc13a48-f451-443d-be76-4c55c3e025f9.jpg.webp?ect=4g",
      price: 20000000,
      discount: 15,
      stock: 5,
      rating: 5,
      review: 399,
      quantity: 0,
    },
    {
      id: 3,
      title:
        "Apple Macbook Air M2 2022 13,6 inch - Garansi Resmi iBox Apple Indo",
      image:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/5/30/fb713728-8489-4756-922c-1d42805b3262.jpg.webp?ect=4g",
      price: 15000000,
      discount: 20,
      stock: 5,
      rating: 5,
      review: 980,
      quantity: 0,
    },
  ]);
  const items = ref<Array<IProduct>>([]);
  const totalItems = ref(0);
  const activeTab = ref("products");
  const shipping = ref(9000);
  const subtotal = computed(() =>
    items.value.reduce(
      (sum, item: IProduct) => sum + item.price * item.quantity,
      0
    )
  );
  const total = computed(() => subtotal.value + shipping.value);
  const existingProduct = ref<IProduct>();

  const addProduct = (product: IProduct) => {
    existingProduct.value = items.value.find(
      (item: IProduct) => item.id === product.id
    );
    if (existingProduct.value) {
      existingProduct.value.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
    totalItems.value++;
    product.stock--;
    saveCartToLocalStorage();
  };

  const removeProduct = (product: IProduct) => {
    const index = items.value.findIndex(
      (item: IProduct) => item.id === product.id
    );
    if (index !== -1) {
      totalItems.value -= items.value[index].quantity || 0;
      items.value.splice(index, 1);
      saveCartToLocalStorage();
    }
  };

  const saveCartToLocalStorage = () => {
    if (process.client) {
      localStorage.setItem("cart", JSON.stringify(items.value));
    }
  };

  const loadCartFromLocalStorage = () => {
    if (process.client) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cart) {
        items.value = cart;
        totalItems.value = items.value.reduce(
          (sum, item: IProduct) => sum + item.quantity,
          0
        );
      }
    }
  };

  const clearCart = () => {
    items.value = [];
    totalItems.value = 0;
    saveCartToLocalStorage();
  };

  const setActiveTab = (tab: string) => {
    activeTab.value = tab;
  };

  onMounted(() => {
    loadCartFromLocalStorage();
  });

  return {
    products,
    items,
    totalItems,
    activeTab,
    shipping,
    subtotal,
    total,
    addProduct,
    removeProduct,
    clearCart,
    setActiveTab,
    saveCartToLocalStorage,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}
