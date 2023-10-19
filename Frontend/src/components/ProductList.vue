<template>
    <div v-show="loading" class="py-5">
        <div
            class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center pt-6 pb-1">
            <ProductCard v-for="product in products.data" :key="product.id" :product="product" />
        </div>
        <div class="flex flex-wrap justify-center overflow-hidden my-5">
            <TailwindPagination class="flex flex-wrap rounded-md overflow-hidden" :data="products"
                @pagination-change-page="getProducts" :limit="1" :keepLength="true"
                :item-classes="['bg-gray-100 text-gray-700 rounded-md mx-1 p-2']"
                :active-classes="['bg-blue-600 text-gray-100 rounded-md p-2']" />
        </div>
    </div>
    <div v-show="loading == false" class="fixed inset-0 flex justify-center items-center overflow-hidden bg-gray-900 bg-opacity-90">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-9 h-9 animate-bounce">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
    </div>
</template>

<script setup>
import { TailwindPagination } from 'laravel-vue-pagination';
import ProductCard from './ProductCard.vue';
import { computed, onMounted, defineProps, onBeforeMount } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const route = useRoute()

const props = defineProps(['page'])

const store = useStore()

const loading = ref(false);

onBeforeMount(() => {
    setTimeout(() => {
        const currentPage = parseInt(route.query.page) || 1;
        getProducts(currentPage);
        loading.value = true;
    }, 400);
});

const products = computed(() => {
    return store.state.product.products;
});

const getProducts = (page = 1) => {
    router.push({ path: '/', query: { page: page } });
    store.dispatch('product/getProducts', { page: page, searchQuery: '' });
};
</script>
