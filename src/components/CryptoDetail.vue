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
                
                <p v-for="(post,key,index) in posts.slice(0, 1)">Symbol: <strong>{{posts[key].symbol}}</strong></p>
            </div>
            
        </div>
        
        <ul class="tabs" data-deep-link="true" data-update-history="true" data-deep-link-smudge="true" data-deep-link-smudge-delay="500" data-tabs id="deeplinked-tabs">
            <li class="tabs-title is-active"><a href="javascript:void(0)" v-on:click="switchTab1($event)">Value last 30 days</a></li>
            <li class="tabs-title"><a href="javascript:void(0)" v-on:click="switchTab2($event)">Value last 24 hours</a></li>
        </ul>

        <div class="tabs-content" data-tabs-content="deeplinked-tabs">
            <div id="panel1d" v-if="activeTab == 'tab-1'">
                <line-chart :data="chartData" />
            </div>
            <div id="panel2d" v-if="activeTab == 'tab-2'">
                <line-chart :data="chartData2" />
            </div>

        </div>
        
        <div class="text-center gobackHome">
            <router-link :to="{ name: 'Home', params: {  }}" class="button" >Back</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'


    export default {
        name: 'CryptoDetail',
        props: ["id", "name", "rank", "price", "marketcap", "percentchange"],
        components:{
 
        },
        data() {
            return {
                posts: [],
                chartd: [],
                chartData: '',
                chartd2: [],
                chartData2: '',
                activeTab: 'tab-1'
            }
        },
        created() {
            axios.get('https://api.udilia.com/coins/v1/autocomplete?searchQuery=' + this.name).then(posts => {
                this.posts = posts.data
                
                // Chart - Days
                axios.get('https://min-api.cryptocompare.com/data/histoday?fsym='+posts.data[0].symbol+'&tsym=USD&limit=29&aggregate=1&e=CCCAGG').then(chartd => {
                    this.chartd = chartd.data
                    var cL = chartd.data.Data;                   
                    var a, b, c, d, e, chartDataArrayHigh = [], chartDataArrayLow= [], arrA = {}, arrB = {}
                    for(var i=0; i <= cL.length-1; i++){   
                        a = cL[i].time
                        b = cL[i].high
                        c = cL[i].low
                        chartDataArrayHigh.push([cL[i].time , cL[i].high])
                        chartDataArrayLow.push([cL[i].time , cL[i].low])
                    }
                    this.chartData = [
                      {name: 'Highest', data: chartDataArrayHigh},
                      {name: 'Lowest', data: chartDataArrayLow}
                    ];
                });
                
                // Chart - Hours
                axios.get('https://min-api.cryptocompare.com/data/histohour?fsym='+posts.data[0].symbol+'&tsym=USD&limit=24&aggregate=3&e=CCCAGG').then(chartd2 => {
                    this.chartd2 = chartd2.data
                    var cL = chartd2.data.Data;                   
                    var a, b, c, d, e, chartDataArrayHigh = [], chartDataArrayLow= [], arrA = {}, arrB = {}
                    for(var i=0; i <= cL.length-1; i++){   
                        a = cL[i].time
                        b = cL[i].high
                        c = cL[i].low
                        chartDataArrayHigh.push([cL[i].time , cL[i].high])
                        chartDataArrayLow.push([cL[i].time , cL[i].low])
                    }
                    this.chartData2 = [
                      {name: 'Highest', data: chartDataArrayHigh},
                      {name: 'Lowest', data: chartDataArrayLow}
                    ];
                });
                
                
            });
        },
        methods: {
            backToHome: function(e) {
                e.stopPropagation()
            },
            switchTab1: function(e){
                e.stopPropagation()
                this.activeTab = 'tab-1'
            },
            switchTab2: function(e){
                e.stopPropagation()
                this.activeTab = 'tab-2'
            }
        }
    }

</script>

<style>
    .gobackHome{
        margin-top: 30px;
    }
</style>
