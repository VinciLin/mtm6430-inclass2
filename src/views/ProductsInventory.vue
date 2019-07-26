<template>
    <div>
        <h1>Product Inventory Page</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.title }}</td>
                    <td>{{ product.price }}</td>
                    <!-- step1 two-way binding -->
                    <td><input type="number" min="0" v-model="product.quantity "/>
                    </td>
                    <td>
                            <!-- step2 click event -->
                        <button class="btn btn-warning" @click="sendQuantity(product.quantity, product)" >Add</button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
    
     created(){
        this.$store.dispatch("fetchData");
    },

    computed: mapState(["products"]),
    //  if need a newCoputed(){} , need to add "..." before the first computed

    // step3 add method
    methods: {
        // step4 dispatch action
        ...mapActions(["updateQuantity"]),
        sendQuantity(quantity, product){
            // send the quantity to store an update the state and database
            // {key:value }object
            if(quantity >= 0){
            this.updateQuantity({ quantity:quantity, product:product });
        }else{
            // throw an error
            console.log("quantity must be 0 or above")
        }
    }
    }
}
</script>