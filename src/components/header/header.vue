<template>
	<div class="header">
		<div class="content">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="details">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="desc">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<!--传入数据为数组且渲染时出现索引时，需加v-if判断数组是否存在，否则读取不到length属性-->
				<div class="support" v-if="seller.supports">
					<!--动态绑定class到处理后的数据上，从而根据class切换背景图-->
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-w" @click="showDetail">
			<span class="title"></span><span class="text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="bg">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<!--弹出层使用css sticky footer布局，见样式部分-->
			<div class="detail" v-show="detailShow">
				<div class="detail-w clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-w">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>		
					</div>
				</div>
				<div class="close" @click="hideDeatil">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>	
		
	</div>
</template>

<script>
	import star from 'components/star/star'

	export default {
		props:{
			seller:{

			}
		},
		data(){
			return {
				detailShow:false
			}
		},
		methods:{
			showDetail(){
				this.detailShow = true
			},hideDeatil(){
				this.detailShow = false
			}
		},
		created(){
			//将定义好的样式字段传入数组，以接收到的seller.supports数组中每一项的type作为下标切换样式
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		components:{
			star
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import '../../common/less/mixin.less';

	.header{
		position: relative;
		overflow: hidden;
		width:100%;
		height:134px;
		color:#fff;
		background-color:rgba(7,17,27,.5);
		.content{
			position: relative;
			padding:24px 12px 18px 24px;
			font-size: 0;
			.avatar{
				display:inline-block;
				vertical-align: top;
				img{
					border-radius: 2px;
				}								
			}
			.details{
				display:inline-block;
				margin-left:16px;
				font-size: 14px;
				.title{
					margin:2px 0 8px 0;
					.brand{
						display: inline-block;
						vertical-align: top;
						width:30px;
						height:18px;
						.bg-img('../img/brand');
						background-size:30px 18px;
						background-repeat:no-repeat;
					}
					.name{
						margin-left:6px;
						font-size: 16px;
						line-height:18px;
						font-weight: bold;
					}
				}
				.desc{
					margin-bottom:10px;
					line-height: 12px;
					font-size: 12px;
				}
				.support{
					font-size: 0;
					.icon{
						display: inline-block;
						vertical-align: top;
						width:12px;
						height:12px;
						margin-right:4px;
						background-size:12px 12px;
						background-repeat: no-repeat;
						&.decrease{
							.bg-img('../img/decrease_1')
						}
						&.discount{
							.bg-img('../img/discount_1')
						}
						&.guarantee{
							.bg-img('../img/guarantee_1')
						}
						&.invoice{
							.bg-img('../img/invoice_1')
						}
						&.special{
							.bg-img('../img/special_1')
						}
					}
					.text{
						font-size: 10px;
						line-height: 12px;
					}
				}
			}
			.support-count{
				position: absolute;
				right: 12px;
				bottom: 14px;
				padding:0 8px;
				height:24px;
				line-height: 24px;
				border-radius: 14px;
				background:rgba(0,0,0,.2);
				text-align: center;
				.count{
					vertical-align: top;
					font-size: 10px;
				}
				.icon-keyboard_arrow_right{
					margin-left: 2px;
					font-size: 10px;
					line-height: 24px;
				}
			}
		}
		.bulletin-w{
			position: relative;
			height:28px;
			line-height: 28px;
			padding:0 22px 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow:ellipsis;
			//font-size: 0;
			background: rgba(7,17,27,.2);
			.title{
				display: inline-block;
				vertical-align: top;
				margin-top:8px;
				width:22px;
				height:12px;
				.bg-img('../img/bulletin');
				background-size:22px 12px;
				background-repeat: no-repeat;
			}
			.text{
				vertical-align: top;
				margin:0 4px;
				font-size: 10px;
			}
			.icon-keyboard_arrow_right{
				position: absolute;
				right:12px;
				top:8px;
				font-size: 10px;
			}
		}
		.bg{
			position: absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			z-index:-1;
			filter:blur(10px);
		}
		.detail{
			position: fixed;
			top:0;
			left:0;
			z-index: 100;
			width:100%;
			height:100%;
			overflow: auto;
			background:rgba(7,17,27,.8);
			//iOS特有属性
			backdrop-filter:blur(10px);
				&.fade-enter-active,&.fade-leave-active{
					transition:all 0.5s;
				}
				&.fade-enter,&.fade-leave-to{
					opacity:0;
					background:rgba(7,17,27,0);
				}
			/*css sticky footer 布局*/
			.detail-w{
				min-height: 100%;
				width:100%;
				.detail-main{
					margin-top:64px;
					/*关键点：利用下padding为底部预留出空间*/
					padding-bottom:64px;
					.name{
						line-height: 16px;
						font-size: 16px;
						text-align: center;
						font-weight: 700;
					}
					.star-w{
						margin-top:16px;
						padding:2px 0;
						text-align: center;
					}
					.title{
						display: flex;
						width:80%;
						margin:28px auto 24px auto;
						.line{
							flex:1;
							position: relative;
							top:-6px;
							border-bottom:1px solid rgba(255,255,255,.2);
						}
						.text{
							padding:0 12px;
							font-size: 14px;
							font-weight: 700;
						}
					}
					.supports{
						width:80%;
						margin:0 auto;
						.support-item{
							padding:0 12px;
							margin-bottom:12px;
							font-size: 0;
							&:last-child{
								margin-bottom: 0;
							}
							.icon{
								display: inline-block;
								vertical-align: top;
								width:16px;
								height:16px;
								margin-right: 6px;
								background-size: 16px 16px;
								background-repeat: no-repeat;
								&.decrease{
									.bg-img('../img/decrease_2')
								}
								&.discount{
									.bg-img('../img/discount_2')
								}
								&.guarantee{
									.bg-img('../img/guarantee_2')
								}
								&.invoice{
									.bg-img('../img/invoice_2')
								}
								&.special{
									.bg-img('../img/special_2')
								}
							}
							.text{
								font-size: 12px;
								line-height: 16px;
							}
						}
					}
					.bulletin{
						width:80%;
						margin:0 auto;
						.content{
							padding:0 12px;
							line-height: 24px;
							font-size: 12px;
						}
					}
				}
			}
			.close{
				position: relative;
				width:32px;
				height:32px;
				margin:-64px auto 0 auto;
				clear:both;
				font-size: 32px;					
			}
		}
	}
</style>