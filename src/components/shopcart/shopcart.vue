<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-w">
					<!--选择商品(数量>0)后，购物车logo增加highlight样式-->
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<!--选择商品(数量>0)后，数量标志显示-->
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<!--选择商品(总价>0)后，总价增加highlight样式-->
				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<!--payClass绑定计算属性切换样式-->
				<div class="pay" :class="payClass">{{payDesc}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			selectFoods:{
				type:Array,
				default(){
					return []
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		computed:{
			//总价
			totalPrice(){
				let total = 0
				//遍历选中的商品，计算单价*数量的和，得到总价
				this.selectFoods.forEach((food)=>{
					total += food.price*food.count
				})
				return total
			},
			//商品数量总和
			totalCount(){
				let count = 0
				this.selectFoods.forEach((food)=>{
					count += food.count
				})
				return count
			},
			//配送总价情况
			payDesc(){
				if(this.totalPrice === 0){
					return `￥${this.minPrice}起送`
				}else if(this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}起送`
				}else{
					return '去结算'
				}
			},
			payClass(){
				if(this.totalPrice < this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.shopcart{
		position: fixed;
		left:0;
		bottom:0;
		z-index: 50;
		width:100%;
		height:48px;
		.content{
			display: flex;
			background:#141d27;
			font-size: 0;
			.content-left{
				flex:1;
				.logo-w{
					display: inline-block;
					vertical-align: top;
					position: relative;
					top:-10px;
					margin:0 12px;
					padding:6px;
					width:56px;
					height:56px;
					box-sizing: border-box;
					border-radius: 50%;
					background:#141d27;
					.logo{
						width:100%;
						height:100%;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;
						&.highlight{
							background:rgb(0,160,220);
						}
						.icon-shopping_cart{
							font-size: 24px;
							color:#80858a;
							line-height: 44px;
							&.highlight{
								color:#fff;
							}
						}
					}
					.num{
						position: absolute;
						top:0;
						right:0;
						width:24px;
						height:16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color:#fff;
						background:rgb(240,20,20);
						box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
					}
				}
				.price{
					display: inline-block;
					vertical-align: top;
					margin-top:12px;
					padding-right:12px;
					border-right:1px solid rgba(255, 255, 255, 0.1);
					box-sizing: border-box;
					line-height: 24px;
					font-size: 16px;
					font-weight: 700;
					color:rgba(255,255,255,.4);
					&.highlight{
						color:#fff;
					}
				}
				.desc{
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin:12px 0 0 12px;
					font-size: 10px;
					color:rgba(255,255,255,.4);
				}
			}
			.content-right{
				flex:0 0 105px;
				width:105px;
				.pay{
					line-height: 48px;
					height:48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
					color:rgba(255,255,255,.4);
					&.not-enough{
						background:#2b333b;
					}
					&.enough{
						background:#00b43c;
						color:#fff;
					}
				}
			}
		}
	}
</style>