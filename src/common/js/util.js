
//解析URL参数，返回一个对象
//?id=12345&a=b
//return object{id:12345,a:b}
export function urlParse(){
	let url = window.location.search
	let obj = {}
	let reg = /[?&][^?&]+=[^?&]+/g
	//匹配到的数组如['?id=12345','a=b']
	let arr = url.match(reg)
	if(arr){
		arr.forEach((item)=>{
			//处理后获取数组['id','12345']
			let tempArr = item.substring(1).split('=')
			let key = decodeURIComponent(tempArr[0])
			let value = decodeURIComponent(tempArr[1])
			obj[key] = value
		})
	}

	return obj
}