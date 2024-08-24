<template>
  <div
    class="text-white text-2xl font-semibold mb-10 border-b border-neutral-300 p-3"
  >
    Product List
  </div>
  <div class="grid grid-cols-12 gap-4 lg:gap-24">
    <div
      v-for="product in cart.products"
      :key="product.id"
      class="col-span-12 md:col-span-4 border border-neutral-500 p-4 rounded-3xl bg-[#545151] relative"
    >
      <div
        class="absolute -top-2 left-6 bg-[#f4a403] text-white p-3 rounded-b-full font-bold"
      >
        0{{ product.id }}
      </div>
      <div
        class="absolute left-0 right-0 top-2 text-[#f4a403] flex gap-4 items-center justify-center text-sm"
      >
        <Icon name="i-solar-crown-bold" size="1.5em" />
        1.4k purchased in <br />
        the last 30 days
      </div>

      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-auto object-cover mb-10 rounded-xl"
      />
      <h2 class="text-neutral-300">Apple</h2>
      <h3 class="text-white font-medium">{{ product.title }}</h3>
      <div class="flex flex-row gap-1 items-center my-3">
        <template v-for="rating in product.rating">
          <Icon
            name="i-material-symbols-kid-star-sharp"
            class="text-yellow-500"
          />
        </template>
        <span class="text-neutral-300 ml-2">{{ product.review }} reviews</span>
      </div>
      <div class="flex gap-2 items-center">
        <p class="text-black text-xl font-medium">
          Rp.{{ formatThousand(String(product.price)) }}
        </p>
        <p
          v-if="product.discount"
          class="text-xs text-red-600 rounded-full bg-red-100 px-2 py-1.5 font-medium text-center"
        >
          {{ product.discount }}% OFF
        </p>
        <IconPrime />
      </div>

      <button
        @click="addToCart(product)"
        class="bg-green-500 text-white p-3 rounded-full block w-full mt-4 font-bold hover:bg-green-400"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types";
import { useCart } from "~/stores/cart";

const cart = useCart();

const addToCart = (product: IProduct) => {
  cart.addProduct(product);
};
</script>
