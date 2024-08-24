<template>
  <div class="col-span-12 md:col-span-6">
    <div class="p-4 border border-white rounded-xl text-white">
      <h3 class="text-xl font-semibold mb-4">Card Details</h3>

      <label for="">Card type</label>

      <div class="flex flex-col md:flex-row gap-4 mb-4 mt-2">
        <div
          class="p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100"
          :class="
            cardType === 'visa'
              ? 'border-2 border-blue-500'
              : 'border border-white'
          "
        >
          <input
            v-model="cardType"
            type="radio"
            value="visa"
            name="card"
            id="visa"
            class="hidden"
          />
          <label for="visa" class="cursor-pointer">
            <Icon name="i-logos-visaelectron" size="2.5em" />
          </label>
        </div>
        <div
          class="p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100"
          :class="
            cardType === 'mastercard'
              ? 'border-2 border-blue-500'
              : 'border border-white'
          "
        >
          <input
            v-model="cardType"
            type="radio"
            value="mastercard"
            name="card"
            id="mastercard"
            class="hidden"
          />
          <label for="mastercard" class="cursor-pointer">
            <Icon name="i-logos-mastercard" size="2.5em" />
          </label>
        </div>
        <div
          class="p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100"
          :class="
            cardType === 'gpay'
              ? 'border-2 border-blue-500'
              : 'border border-white'
          "
        >
          <input
            v-model="cardType"
            type="radio"
            value="gpay"
            name="card"
            id="gpay"
            class="hidden"
          />
          <label for="gpay" class="cursor-pointer">
            <Icon name="i-logos-google-pay" size="2.5em" />
          </label>
        </div>
        <div
          class="p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100"
          :class="
            cardType === 'paypal'
              ? 'border-2 border-blue-500'
              : 'border border-white'
          "
        >
          <input
            v-model="cardType"
            type="radio"
            value="paypal"
            name="card"
            id="paypal"
            class="hidden"
          />
          <label for="paypal" class="cursor-pointer">
            <Icon name="i-logos-paypal" size="2.5em" />
          </label>
        </div>
      </div>

      <div class="flex gap-2 flex-col mb-4">
        <label for="name_on_card">Name on Card</label>
        <input
          type="text"
          name="name_on_card"
          placeholder="Name on Card"
          class="p-2 border border-white bg-[#1e201e] w-full rounded-md"
        />
      </div>

      <div class="flex gap-2 flex-col mb-4">
        <label for="card_number">Card Number</label>
        <input
          type="text"
          name="card_number"
          placeholder="Card Number"
          class="p-2 border border-white bg-[#1e201e] w-full rounded-md"
        />
      </div>

      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-6">
          <div class="flex gap-2 flex-col mb-4">
            <label for="expiry_date">Expiration date</label>
            <input
              type="text"
              name="expiry_date"
              placeholder="mm/yy"
              class="p-2 border border-white bg-[#1e201e] w-full rounded-md"
            />
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <div class="flex gap-2 flex-col mb-4">
            <label for="cvv">CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              class="p-2 border border-white bg-[#1e201e] w-full rounded-md"
            />
          </div>
        </div>
      </div>

      <hr class="border border-white my-4" />

      <div class="flex justify-between items-center gap-3 mb-2">
        <p>Subtotal</p>
        <p>Rp.{{ formatThousand(String(subtotal)) }}</p>
      </div>
      <div class="flex justify-between items-center gap-3 mb-2">
        <p>Shipping</p>
        <p>Rp.{{ formatThousand(String(shipping)) }}</p>
      </div>
      <div class="flex justify-between items-center gap-3 mb-4">
        <p>Total (Tax incl.)</p>
        <p>Rp.{{ formatThousand(String(total)) }}</p>
      </div>

      <button
        @click="onCheckout"
        class="bg-[#1e201e] border border-white text-white p-4 w-full rounded-lg hover:bg-white hover:text-black flex justify-between items-center gap-2"
      >
        Rp.{{ formatThousand(String(total)) }}
        <div class="flex justify-between-items-center gap-2">
          Checkout
          <Icon
            name="i-material-symbols-arrow-right-alt-rounded"
            size="1.5em"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "~/stores/cart";

const cart = useCart();
const subtotal = computed(() => cart.subtotal);
const shipping = computed(() => cart.shipping);
const total = computed(() => cart.total);

const cardType = ref("");

const onCheckout = () => {
  if (process.client) {
    localStorage.setItem("checkout-data", JSON.stringify(cart));
  }

  cart.clearCart();

  useSnackbars().push({
    type: "success",
    content: "Produk berhasil dibeli",
    duration: 5000,
  });

  cart.setActiveTab("products");
};
</script>
