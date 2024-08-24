<template>
  <NuxtLoadingIndicator color="#7D3EB9" />

  <client-only>
    <div class="scroll-smooth min-h-screen">
      <Navbar />

      <main class="bg-[#1E201E] min-h-screen relative">
        <div id="main-content" class="p-8">
          <!-- pages -->
          <slot />
        </div>
      </main>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
</script>
