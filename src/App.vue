<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link> 
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>      
  </div>
</template>

<script>
  import header from 'components/header/header'
  import {urlParse} from 'common/js/util.js'

  //采用常量定义状态码
  const ERR_OK = 0

  export default {
    data(){
      return {
        seller:{
          id:(()=>{
            let queryParam = urlParse()
            console.log(queryParam) 
            return queryParam.id
          })()
        }
      }
    },
    created(){
      this.$http.get('/api/seller?id='+this.seller.id).then((response)=>{
        response = response.body
        if(response.errno === ERR_OK){
          //为了保留id参数，不能够直接赋值，应采用对象扩展方法
          //this.seller = response.data
          this.seller = Object.assign({},this.seller,response.data)
        }
      })
    },
    components:{
      //header本身作为HTML原生标签不能直接使用
      'v-header':header
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  //注意less语法中@import语句需在结尾添加分号
  @import './common/less/mixin.less';

  .tab{
    display: flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:40px;
    line-height:40px;
    text-align: center;
    //border-bottom:1px solid rgba(7,17,27,.1);
    .border-1px(rgba(7,17,27,.1));
    .tab-item{
      flex:1;
      font-size: 14px;
      color:rgb(77,85,93);
      &.active{
        color:rgb(240,20,20);
      }
    }
  }

</style>
