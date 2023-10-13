<template>
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center pt-6 pb-10">
        <ProductCard v-for="product in products.data" :key="product.id" :product="product" />
        <br>
        <TailwindPagination :data="products" @pagination-change-page="getProducts" />
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
