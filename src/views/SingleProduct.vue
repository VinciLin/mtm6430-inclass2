<template>
    <div>
        <!-- <h1>Single Product Page</h1> -->
        <!-- {{ $route.params.id }} -->
        <!-- {{ id }} -->
        <ProductInfo :product="product" />
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import ProductInfo from "@/components/ProductInfo.vue";

export default {
    // data function
     components: { ProductInfo },
    data(){
        return {
            product: ""
        }
    },
    // props:["id"]
    // validate
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    computed: mapGetters(["getProductById"]),
    // lifecycle hook
    created(){
        this.product = this.getProductById(this.id);
        console.log(this.product);
    }
}
</script>