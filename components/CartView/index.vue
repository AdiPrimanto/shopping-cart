<template>
  <div class="">
    <div
      class="text-white text-2xl font-semibold mb-10 border-b border-neutral-300 p-3"
    >
      Shopping Continue
    </div>

    <div v-if="cartItems.length === 0">
      <Empty />
    </div>

    <div v-else>
      <div class="grid grid-cols-12 gap-4 md:gap-8">
        <CartViewList :cart-items="cartItems" />

        <CartViewDetail />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from "~/stores/cart";

const cart = useCart();
const cartItems = computed(() => cart.items);
</script>
