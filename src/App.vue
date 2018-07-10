<template>
    <div id="app">
        <div class="top-bar">
            <div class="top-bar-left">
                <ul class="dropdown menu" data-dropdown-menu>
                    <li class="menu-text">
                        <a href="/">
                            <svg style="width:50px;height:50px" viewBox="0 0 24 24">
                                <path fill="#000000" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
                            </svg>
                        </a>
                    </li>
                    <li class="menu-text text-center" style="padding-top:21px;">
                        A Vue.js Project <br /> <a href="https://alfecaesar.com" target="_blank">Alfe Caesar Lagas</a>
                    </li>
                </ul>
            </div>
            <div class="top-bar-right">
                <ul class="menu">
                    <li>
                        <input type="search" placeholder="Search" v-model="searchText" v-on:keyup="searchItem($event)" v-on:keyup.delete="searchItem($event)">
                    </li>
                    <li>
                        <button type="button" class="button">Search</button>
                    </li>
                </ul>
            </div>
        </div>
        
    <div class="contentarea" v-if="searchText != ''" >
        <div class="table-container">
            <table class="unstriped">
                <thead>
                    <tr>
                        <th width="40%">Cryptocurrency</th>
                        <th width="20%">Price</th>
                        <th width="20%">Market</th>
                        <th width="10%">24H</th>
                        <th width="10%"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="crypto-container" v-for="(post,key,index) in posts">
                        <td><span class="rankSign">{{posts[key].rank}}</span> {{posts[key].name}}</td>
                        <td><span class="dollarSign">$</span> {{posts[key].price}}</td>
                        <td><span class="dollarSign">$</span>{{posts[key].marketCap}}</td>
                        <td>{{posts[key].percentChange24h}}</td>
                        <th width="10%">
                            <router-link :to="{ name: 'CryptoDetail', path: '/cryptodetail/:id', params: { id: posts[key].id, name: posts[key].name, rank: posts[key].rank, price: posts[key].price, marketcap: posts[key].marketCap, percentchange: posts[key].percentChange24h }}">View</router-link>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
        
    <router-view :key="$route.fullPath"><CryptoList  /></router-view>
        

        
    </div>
</template>

<script>
    import CryptoList from './components/CryptoList'
    import CryptoDetail from './components/CryptoDetail'
    import axios from 'axios'    
   

    export default {
        name: 'App',
        data(){
            return{
                searchText: '',
                displayCryptoDetail: false,
                posts:[]
            }
        },
        components: {
            CryptoList,
            CryptoDetail
        },
        methods:{
            searchItem: function(e){
                    axios.get('https://api.udilia.com/coins/v1/autocomplete?searchQuery='+this.searchText).then(posts=>{
                         this.posts = posts.data
                    });
            }
        }
    }
</script>

<style>
    @import "../node_modules/foundation-sites/dist/css/foundation.min.css"
</style>

<style>
    .rankSign{
        display:inline-block;
        width: 30px;
        font-size: 13px;
        color: brown;
    }
    .dollarSign{
        display:inline-block;
        width: 12px;
        font-size: 14px;
        color: goldenrod;
    }
    .dropdown.menu a{
        padding: 0px;
    }
</style>
