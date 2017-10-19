<template>
	<div class="goods">
		<div class="menu-w">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-w"></div>
	</div>	
</template>

<script>

	const ERR_OK = 0

	export default {
	  props:{
	  	seller:{
	  		type:Object
	  	}
	  },
	  data(){
	  	return {
	  		goods:[]
	  	}
	  },
	  created(){
	  	this.$http.get('/api/goods').then((response)=>{
	  		response = response.body
	        if(response.errno === ERR_OK){
	          this.goods = response.data
	        }
	  	})
	  	this.classMap = ['decrease','discount','special','invoice','guarantee']
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

		}
	}
</style>