<template>
    <div class="row">
        <h1 class="col-12">Product List Page</h1>
        <div
            class="col-sm-4 p-1"
            v-for="product in products"
            :key="product.id">
            <!-- {{ product.title }} -->
            <!-- product="product", 前一个任意名字， 后一个是真的property -->
            <ProductCard :product="product" />
            </div>
          <!-- // way 1 -->
        <!-- {{ products }} -->
    </div>
</template>
 <script>
 import ProductCard from "@/components/ProductCard.vue"
// way 2 
// step 1 , import 
import { mapState } from "vuex";
export default {
    created(){
        this.$store.dispatch("fetchData");
    },
    // way 1
    // computed: {
    //     products() {
    //         return this.$store.state.products;
    //     }
    // }

    // way2

    computed: mapState(["products"]),
    components: {
        ProductCard
    }
}
</script>