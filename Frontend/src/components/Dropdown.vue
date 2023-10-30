<template>
    <div>
        <Popover v-slot="{ open }" class="relative">
            <PopoverButton :class="open ? '' : 'text-opacity-90'"
                class="relative group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <div v-show="LengthProduct > 0"
                    class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {{ LengthProduct }}
                </div>
            </PopoverButton>

            <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
                <PopoverPanel class="absolute right-0 z-10 mt-3 max-w-sm px-4 sm:px-0 lg:max-w-3xl">
                    <div v-if="LengthProduct > 0"
                        class="overflow-hidden rounded-lg shadow-lg ring-1 bg-gray-50 ring-black ring-opacity-5 divide-y divide-gray-300">
                        <div v-for="cart in carts" :key="cart.id"
                            class="p-3 flex bg-white cursor-pointer border-b border-gray-100 text-gray-700">
                            <div class="flex-auto text-sm w-32">
                                <div class="font-bold">{{ cart.product_list.title }}</div>
                                <div class="flex gap-2">
                                    <div class="truncate">{{ cart.quantity }} x</div>
                                    <button v-if="cart.quantity > 1"
                                        class="px-1 pr-1.5 rounded-full cursor-pointer text-red-600"
                                        @click="decrementCart(cart)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="w-5 h-5">
                                            <path fill-rule="evenodd"
                                                d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zM12.53 9.22a.75.75 0 10-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L15.31 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <div class="truncate font-bold">${{ cart.product_list.price }}</div>
                                </div>
                                <!-- <div class="font-bold whitespace-nowrap">
                                    {{ moment(cart.updated_at).format('Y-MM-DD HH:mm:ss') }}
                                </div> -->
                            </div>
                            <div class="flex flex-col w-16 font-medium items-end">
                                <button @click="removeProduct(cart)"
                                    class="w-5 h-5 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="feather feather-trash-2 ">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path
                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                        </path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="p-2 justify-center flex">
                            <button @click="clearCart()"
                                class="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-700 hover:text-teal-100 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                                Checkout ${{ totalPrice }}
                            </button>
                        </div>
                    </div>
                    <div v-else
                        class="overflow-hidden rounded-lg shadow-lg ring-1 bg-gray-50 ring-black ring-opacity-5 divide-y divide-gray-300">
                        <div class="p-3 w-44 flex bg-white cursor-pointer border-b border-gray-100 text-gray-700">
                            Nothing in your cart!
                        </div>
                    </div>
                </PopoverPanel>
            </transition>
        </Popover>
    </div>
</template>
  
<script setup>
import moment from 'moment';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useStore } from 'vuex'
import { ref, computed, onMounted, onBeforeMount, onUpdated } from 'vue'

const store = useStore();

const LengthProduct = computed(() => {
    const length = store.state.cart.carts.length;
    if (length > 0) {
        return length;
    } else {
        return 0;
    }
});

const carts = computed(() => {
    return store.getters['cart/cartItems'];
});

onBeforeMount(() => {
    fetchCarts();
});

const fetchCarts = async () => {
    await store.dispatch('cart/fetchCarts');
}

const totalPrice = computed(() => {
    return store.state.cart.carts.reduce((total, product) => total + (product.product_list.price * product.quantity), 0);
});

const removeProduct = (cart) => {
    store.dispatch('cart/removeProduct', cart);
}

const decrementCart = (cart) => {
    store.dispatch('cart/decrementCart', cart)
}

const clearCart = () => {
    store.dispatch('cart/clearCart')
}

</script>
  