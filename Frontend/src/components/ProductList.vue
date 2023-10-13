<template>
    <div class="py-5">
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
</template>

<script setup>
import { TailwindPagination } from 'laravel-vue-pagination';
import ProductCard from './ProductCard.vue';
import { computed, onMounted, defineProps } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const route = useRoute()

const props = defineProps(['page'])

const store = useStore()

onMounted(() => {
    const currentPage = parseInt(route.query.page) || 1;
    getProducts(currentPage);
});

const products = computed(() => {
    return store.state.product.products;
});

const getProducts = (page = 1) => {
    router.push({ path: '/', query: { page: page } });
    store.dispatch('product/getProducts', { page: page, searchQuery: '' });
};
</script>
