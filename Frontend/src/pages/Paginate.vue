<template>
    <div>
        <input v-model="searchQuery" placeholder="Search products" />
        {{ searchQuery }}

        <ul>
            <li v-for="post in laravelData.data" :key="post.id">{{ post.title }}</li>
        </ul>

        <TailwindPagination :data="laravelData" @pagination-change-page="getResults" />
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import axios from '../../src/axios';

const laravelData = ref({});
const searchQuery = ref('');

const getResults = (page = 1) => {
    axios.get(`products?page=${page}&search=${searchQuery.value}`)
        .then((response) => {
            laravelData.value = response.data.products;
            console.log(response.data.products);
        }).catch((error) => {
            console.log(error);
        });
}

watch(searchQuery, () => {
    getResults();
});

getResults();
</script>
  