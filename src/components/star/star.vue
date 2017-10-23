<template>
	<div class="star" :class="starType">
		<span v-for="(itemClass,index) in itemClasses" class="star-item" :class="itemClass" key="index"></span>
	</div>
</template>

<script>
	//定义常量，星星个数、全星、半星样式字段
	const LENGTH = 5
	const CLS_ON = 'on'
	const CLS_HALF = 'half'
	const CLS_OFF = 'off'

	export default {
		//对外接收星星个数(score)和尺寸(size)的数据
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		//利用计算属性动态修改样式字段
		computed:{
			starType(){
				return 'star-' + this.size
			},
			itemClasses(){
				//创建数组并加入星星样式
				let result = []
				//得到星星评分，如4.3=>4   4.7=>4.5
				let score = Math.floor(this.score*2)/2
				//判断是否有小数
				let hasDecimal = score%1 !== 0
				//取整数部分
				let integer = Math.floor(score)
				//整数个全星样式
				for(let i=0;i<integer;i++){
					result.push(CLS_ON)
				}
				//判断后加入半星样式
				if(hasDecimal){
					result.push(CLS_HALF)
				}
				//补全星星个数(LENGTH)内的无星样式
				while(result.length<LENGTH){
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}
</script>

<style lang="less" rel="styleshet/less">
	@import '../../common/less/mixin.less';

	.star{
		font-size: 0;
		.star-item{
			display: inline-block;
			background-repeat: no-repeat;
		}
		&.star-48{
			.star-item{
				width:20px;
				height:20px;
				margin-right:22px;
				background-size:20px 20px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					.bg-img('../img/star48_on');
				}
				&.half{
					.bg-img('../img/star48_half');
				}
				&.off{
					.bg-img('../img/star48_off');
				}
			}
		}
		&.star-36{
			.star-item{
				width:15px;
				height:15px;
				margin-right:16px;
				background-size:15px 15px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					.bg-img('../img/star36_on');
				}
				&.half{
					.bg-img('../img/star36_half');
				}
				&.off{
					.bg-img('../img/star36_off');
				}
			}
		}
		&.star-24{
			.star-item{
				width:10px;
				height:10px;
				margin-right:3px;
				background-size:10px 10px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					.bg-img('../img/star24_on');
				}
				&.half{
					.bg-img('../img/star24_half');
				}
				&.off{
					.bg-img('../img/star24_off');
				}
			}
		}

	}
</style>