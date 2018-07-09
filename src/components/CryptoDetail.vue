<template>
    <div class="contentarea">    
        
        <div class="card">
            <div class="card-section">
                <h4>{{name}}</h4>
            </div>
            <div class="card-section">
                <p>ID: <strong>{{id}}</strong></p>
                <p>Rank: <strong>{{rank}}</strong></p>
                <p>Price: <strong>{{price}}</strong></p>
                <p>Marketcap: <strong>{{marketcap}}</strong></p>
                <p>Percentchange24: <strong>{{percentchange}}</strong></p>
            </div>
        </div>
        
        <line-chart></line-chart>
        
        
        <div class="text-center">
            <router-link :to="{ name: 'Home', params: {  }}" class="button" >Back</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    //import LineChart from './components/LineChart'  
    //import Reactive from './components/Reactive'

    export default {
        name: 'CryptoDetail',
        props: ["id", "name", "rank", "price", "marketcap", "percentchange"],
        components:{
            //LineChart, 
            //Reactive
        },
        data() {
            return {
                posts: [],
            }
        },
        created() {
            axios.get('https://api.udilia.com/coins/v1/cryptocurrencies?page=' + this.currentPage + '&perPage=20').then(posts => {
                this.posts = posts.data.currencies
            });
        },
        methods: {
            backToHome: function(e) {
                e.stopPropagation()


            },
        }
    }

</script>

<style>
    

</style>
