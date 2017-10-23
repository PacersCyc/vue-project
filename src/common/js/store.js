
//存储商家的收藏状态到localstorage
export function saveToLocal(id,key,value){
	let seller = window.localStorage._seller_
	if(!seller){
		seller = {}
		seller[id] = {}		
	}else{
		seller = JSON.parse(seller)
		//判断商家信息是否已被存储过
		if(!seller.id){
			seller[id] = {}
		}
	}
	//存储商家数据
	seller[id][key] = value
	window.localStorage._seller_ = JSON.stringify(seller)
}


//从localstorage中读取商家的收藏状态，def变量意为default默认值
export function loadFromLocal(id,key,def){
	let seller = window.localStorage._seller_
	if(!seller){
		return def
	}else{
		seller = JSON.parse(seller)[id]
		if(!seller){
			return def
		}else{
			let ret = seller[key]
			return ret || def
		}
	}
}
