<template>
  <Head>
    <Title>Dashboard</Title>
    <Meta name="description" content="Dashboard" />
  </Head>

  <SnackbarContainer />

  <div class="py-4 px-4 md:px-16">
    <div v-if="activeTab === 'products'">
      <Product />
    </div>
    <div v-if="activeTab === 'cart'">
      <CartView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "~/stores/cart";

const cart = useCart();

const activeTab = computed(() => cart.activeTab);
</script>
