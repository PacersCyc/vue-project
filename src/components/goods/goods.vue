<template>
	<div class="goods-w">
		<div class="goods">
			<div class="menu-w" ref="menu">
				<ul>
					<li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex===index}" @click="selectMenu(index)">
						<span class="text border-1px">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-w" ref="foods">
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food)">
								<div class="icon">
									<img :src="food.icon" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
									</div>
									<!--组件外包裹容器用于定位-->
									<div class="cartcontrol-w">
										<!--将列表循环中的food数据传入子组件-->
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<!--关键点：将selectFoods作为计算属性传入子组件,实现父子组件间的联动-->
			<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>	
		</div>
		<food :food="selectedFood" ref="food"></food>
	</div>	
</template>

<script>
	import BScroll from 'better-scroll'
	import shopcart from 'components/shopcart/shopcart'
	import cartcontrol from 'components/cartcontrol/cartcontrol'
	import food from 'components/food/food'

	const ERR_OK = 0

	export default {
	  props:{
	  	seller:{
	  		type:Object
	  	}
	  },
	  data(){
	  	return {
	  		goods:[],
	  		//用于存储每个区间的高度
	  		listHeight:[],
	  		scrollY:0,
	  		selectedFood:{}
	  	}
	  },
	  computed:{
	  	currentIndex(){
	  		for(let i=0;i<this.listHeight.length;i++){
	  			let height1 = this.listHeight[i]
	  			let height2 = this.listHeight[i+1]
	  			//当i为数组最后一项 或 scrollY处于任一高度区间之内时,返回i
	  			if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
	  				return i
	  			}
	  		}
	  		return 0
	  	},
	  	//选中的商品，父子组件通信精髓？响应式数据
	  	selectFoods(){
	  		let foods = []
	  		this.goods.forEach((good)=>{
	  			good.foods.forEach((food)=>{
	  				//判断count属性是否存在，若存在说明在cartcontrol组件中添加按钮已被点击，创建了count属性
	  				if(food.count){
	  					//将选中的商品放入数组
	  					foods.push(food)
	  				}
	  			})
	  		})
	  		return foods
	  	}
	  },
	  created(){
	  	this.$http.get('/api/goods').then((response)=>{
	  		response = response.body
	        if(response.errno === ERR_OK){
	          this.goods = response.data

	          this.$nextTick(()=>{
	          	this._initScroll()
	          	this._calculateHeight()
	          })	          
	        }
	  	})
	  	this.classMap = ['decrease','discount','special','invoice','guarantee']
	  },
	  methods:{
	  	_initScroll(){
	  		//实例化better-scroll
	  		this.menuScroll = new BScroll(this.$refs.menu,{
	  			//该选项默认为true，不阻止默认点击事件
	  			click:true
	  		})
	  		this.foodsScroll = new BScroll(this.$refs.foods,{
	  			click:true,
	  			//获取实时滚动位置
	  			probeType:3
	  		})
	  		//设置probeType属性后，可监听scroll事件
	  		this.foodsScroll.on('scroll',(pos)=>{
	  			this.scrollY = Math.abs(Math.round(pos.y))
	  		})
	  	},
	  	_calculateHeight(){
	  		//获取每一类商品的DOM元素
	  		let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
	  		//创建变量，存储每一类商品的视口高度
	  		let height = 0
	  		this.listHeight.push(height)
	  		//遍历商品种类
	  		for(let i=0;i<foodList.length;i++){
	  			let item = foodList[i]
	  			//获取每一类商品视口高度并存入数组
	  			height += item.clientHeight
	  			this.listHeight.push(height)
	  		}
	  	},
	  	selectMenu(index){
	  		let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
	  		//获取相应需要展现的DOM元素
	  		let el = foodList[index]
	  		//调用better-scroll实例化后的接口，实现点击后的滚动动画
	  		this.foodsScroll.scrollToElement(el,300)
	  	},
	  	_drop(target){
	  		//调用nextTick接口触发方法，优化动画效果提高性能
	  		this.$nextTick(()=>{
	  			this.$refs.shopcart.drop(target)
	  		})	  		
	  	},
	  	selectFood(food){
	  		this.selectedFood = food
	  		this.$refs.food.show()
	  	}
	  },
	  
	  events:{
	  	'cart.add'(target){
	  		this._drop(target)
	  	}
	  },
	  
	  components:{
	  	shopcart,
	  	cartcontrol,
	  	food
	  }
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import '../../common/less/mixin.less';

	.goods{
		display: flex;
		position:absolute;
		top:174px;
		bottom:46px;
		width:100%;
		overflow: hidden;
		.menu-w{
			flex:0 0 80px;
			width:80px;
			background:#f3f5f7;
			.menu-item{
				/*利用table实现内容垂直居中，且具有较好兼容性*/
				display: table;
				width:56px;
				height:54px;
				line-height: 14px;
				padding:0 12px;
				/*高亮时样式*/
				&.current{
					position: relative;
					z-index: 10;
					margin-top:-1px;
					background:#fff;
					font-weight: 700;
					.text{
						.border-none();
					}
				}
				.text{
					display: table-cell;
					width:56px;
					vertical-align: middle;
					font-size: 12px;
					.border-1px(rgba(7,17,27,.1));
					.icon{
						display: inline-block;
						vertical-align: top;
						width:12px;
						height:12px;
						margin-right:2px;
						background-size:12px 12px;
						background-repeat: no-repeat;
						&.decrease{
							.bg-img('../img/decrease_3')
						}
						&.discount{
							.bg-img('../img/discount_3')
						}
						&.guarantee{
							.bg-img('../img/guarantee_3')
						}
						&.invoice{
							.bg-img('../img/invoice_3')
						}
						&.special{
							.bg-img('../img/special_3')
						}
					}
				}								
			}
		}
		.foods-w{
			flex:1;
			.title{
				padding-left:14px;
				height:26px;
				line-height: 26px;
				border-left:2px solid #d9dde1;
				font-size: 12px;
				color:rgb(147,153,159);
				background:#f3f5f7;
			}
			.food-item{
				display: flex;
				margin:18px;
				padding-bottom:18px;
				.border-1px(rgba(7,17,27,.1));
				&:last-child{
					.border-none();
					margin-bottom:0;
				}
				.icon{
					flex:0 0 57px;
					margin-right:10px;
				}
				.content{
					flex:1;
					.name{
						margin:2px 0 8px 0;
						height:14px;
						line-height: 14px;
						font-size: 14px;
						color:rgb(7,17,27);
					}
					.desc{
						margin-bottom:8px;
						line-height: 10px;
						font-size: 12px;
						color:rgb(147,153,159);
					}
					.extra{
						line-height: 10px;
						font-size: 10px;
						color:rgb(147,153,159);
						.count{
							margin-right: 12px;
						}
					}
					.price{
						font-size: 0;
						font-weight: 700;
						line-height: 24px;
						.now{
							margin-right: 8px;
							font-size: 14px;
							color:rgb(240,20,20)
						}
						.old{
							text-decoration: line-through;
							font-size: 10px;
							color:rgb(147,153,159);
						}
					}
					.cartcontrol-w{
						position: absolute;
						right:0;
						bottom:12px;
					}
				}
			}
		}
	}
</style>