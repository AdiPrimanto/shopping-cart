<template>
  <div class="col-span-12 md:col-span-6 flex flex-col gap-4">
    <div class="mb-2">
      <h2 class="text-white font-semibold">Shopping cart</h2>
      <h3 class="text-white">You have {{ cartItems.length }} in your cart</h3>
    </div>

    <template v-for="item in cartItems" :key="item.id">
      <div class="border border-white rounded-xl p-4 text-white">
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <img
            :src="item.image"
            :alt="item.title"
            class="rounded-lg w-24 h-auto"
          />
          <h3>{{ item.title }}</h3>
          <div class="flex gap-2 items-center">
            <p>{{ item.quantity }}</p>
            <div class="flex flex-col">
              <Icon
                name="i-solar-alt-arrow-up-bold"
                size="1.5em"
                class="cursor-pointer hover:text-blue-500"
                @click="increaseQuantity(item)"
              />
              <Icon
                name="i-solar-alt-arrow-down-bold"
                size="1.5em"
                class="cursor-pointer hover:text-blue-500"
                @click="decreaseQuantity(item)"
              />
            </div>
          </div>
          <p>Rp.{{ formatThousand(String(item.price * item.quantity)) }}</p>
          <Icon
            name="i-material-symbols-delete-outline"
            size="2.5em"
            class="cursor-pointer hover:text-red-500"
            @click="removeProduct(item)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types";
import { useCart } from "~/stores/cart";

defineProps(["cartItems"]);

const cart = useCart();

const increaseQuantity = (item: IProduct) => {
  item.quantity++;
  cart.totalItems++;
  cart.saveCartToLocalStorage();
};

const decreaseQuantity = (item: IProduct) => {
  if (item.quantity > 1) {
    item.quantity--;
    cart.totalItems--;
  }
  cart.saveCartToLocalStorage();
};

const removeProduct = (item: IProduct) => {
  cart.removeProduct(item);
};
</script>
