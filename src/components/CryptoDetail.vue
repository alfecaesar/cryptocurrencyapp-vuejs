<template>
    <div class="contentarea">
details
    </div>
</template>

<script>
    import axios from 'axios'
    
    
    export default{
        name: 'CryptoDetail',
        data(){
            return{
                posts:[],
            }
        },
        created(){
            axios.get('https://api.udilia.com/coins/v1/cryptocurrencies?page='+this.currentPage+'&perPage=20').then(posts=>{
                 this.posts = posts.data.currencies
            });
        }, 
        methods: {
            backToHome: function(e){
                e.stopPropagation()

                
            },
        }
    }
</script>

<style>

</style>