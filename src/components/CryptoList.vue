<template>
    <div class="contentarea">
        <div class="table-container">
            <table class="unstriped">
                <thead>
                    <tr>
                        <th width="40%">Cryptocurrency</th>
                        <th width="20%">Price</th>
                        <th width="20%">Market</th>
                        <th width="20%">24H</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="crypto-container" v-for="(post,key,index) in posts" v-on:click="detailView($event)">
                        <td><span class="rankSign">{{posts[key].rank}}</span> {{posts[key].name}}</td>
                        <td><span class="dollarSign">$</span> {{posts[key].price}}</td>
                        <td><span class="dollarSign">$</span>{{posts[key].marketCap}}</td>
                        <td>{{posts[key].percentChange24h}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <nav aria-label="Pagination">
                <ul class="pagination text-center">
                    <li :class="currentPage === 1 ? 'disabled pagination-previous' : 'enabled pagination-previous'">
                        <a v-if="currentPage != 1" href="#" aria-label="Previous Page" v-on:click="prevPage($event)">Previous</a>
                    </li>
                    <li>page {{currentPage}} of 80</li>
                    <li :class="currentPage === 81 ? 'disabled pagination-next' : 'enabled pagination-next'">
                        <a v-if="currentPage < 81" href="#" aria-label="Next page" v-on:click="nextPage($event)">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
        
        
    </div>
</template>

<script>
    import axios from 'axios'
    
    export default{
        name: 'CryptoList',
        data(){
            return{
                posts:[],
                currentPage : 1
            }
        },
        components: {
            
        },
        created(){
            axios.get('https://api.udilia.com/coins/v1/cryptocurrencies?page='+this.currentPage+'&perPage=20').then(posts=>{
                 this.posts = posts.data.currencies
            });
            
        }, 
        methods: {
            nextPage: function(e){
                e.stopPropagation()
                this.currentPage++
                axios.get('https://api.udilia.com/coins/v1/cryptocurrencies?page='+this.currentPage+'&perPage=20').then(posts=>{
                     this.posts = posts.data.currencies
                });
                
            },
            prevPage: function(e){
                e.stopPropagation()
                this.currentPage--
                axios.get('https://api.udilia.com/coins/v1/cryptocurrencies?page='+this.currentPage+'&perPage=20').then(posts=>{
                     this.posts = posts.data.currencies
                });
            }, 
            detailView: function(e){
                // go to detail view
            }
        }
    }
</script>

<style>
    table.unstriped tbody tr:hover{
        cursor:pointer;
        background-color:  #eee;
    }
</style>