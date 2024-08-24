<!-- components/Navbar.vue -->
<template>
  <nav
    class="bg-[#1E201E] p-6 text-white flex justify-end gap-4 border-b border-neutral-200"
  >
    <div>
      <button
        @click="setActiveTab('products')"
        :class="{ 'font-bold': activeTab === 'products' }"
        class="hover:rounded-lg hover:bg-neutral-100 hover:text-black p-3"
      >
        Products
      </button>
      <button
        @click="setActiveTab('cart')"
        :class="{ 'font-bold': activeTab === 'cart' }"
        class="hover:rounded-lg hover:bg-neutral-100 hover:text-black p-3"
      >
        Cart ({{ cartTotal }})
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCart } from "~/stores/cart";

const cart = useCart();

const activeTab = computed(() => cart.activeTab);
const cartTotal = computed(() => cart.totalItems);

const setActiveTab = (tab) => {
  cart.setActiveTab(tab);
};
</script>

<style scoped>
button {
  margin-right: 20px;
}
</style>
