// ************* 处理逻辑 *******************
window.onload = function() {
	waterfall('main','pin');
	//通过ajax后台获取的json数据
	var dataInit = {'data': [{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	window.onscroll = function() {
		if(checkscrollside()) {
			var oParent = document.getElementById('main');
			for(var i = 0; i < dataInit.data.length; i++) {
				var oPin = document.createElement('div');
				oPin.className = 'pin';
				oParent.appendChild(oPin);
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oPin.appendChild(oBox);
				var oImg = document.createElement('img');

				// 正常的 BS 模式逻辑
				// oImg.src = './images/' + dataInit.data[i].src;
				// 正常的 BS 模式逻辑 end

				//makefun 一大波随机图片来袭
				var j = Math.floor(Math.random() * 97 + 1);
				oImg.src = './images/' + j + '.jpg';
				//makefun end

				oBox.appendChild(oImg);
			}
			waterfall('main','pin');
		}
	}

};


// ************* 功能实现 *******************

/*
    parend 父级id
    pin 元素id
*/
function waterfall(parent,pin) {
	// 父级对象
	var oParent = document.getElementById(parent);
	// 获取存储块框pin的数组aPin
	var aPin = getByClass(oParent,pin);
	// 一个块框pin的宽
	var iPinW = aPin[0].offsetWidth;
	var num = Math.floor((document.documentElement?document.documentElement.clientWidth:document.body.clientWidth)/iPinW);
	oParent.style.cssText = 'width:' + iPinW*num + 'px;margin:0 auto;';
	//用于存储 每列中的所有块框相加的高度。
	var pinHarr=[];
	//遍历数组aPin的每个块框元素
	for(var i = 0; i<aPin.length; i++) {
		var pinH = aPin[i].offsetHeight;
		if(i<num) {
			//第一行中的num个块框pin 先添加进数组pinHArr
			pinHarr[i] = pinH;
		} else {
		//数组pinHArr中的最小值minH
			var minH = Math.min.apply(null,pinHarr);
			var minHIndex = getminHIndex(pinHarr,minH);
			//设置绝对位移
			aPin[i].style.position = 'absolute';
			aPin[i].style.top = minH + 'px';
			aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';
			//数组 最小高元素的高 + 添加上的aPin[i]块框高
			//更新添加了块框后的列高
			pinHarr[minHIndex] += aPin[i].offsetHeight;
		}
	}
}
/****
    *通过父级和子元素的class类 获取该同类子元素的数组
    */
function getByClass(oParent,className) {
	//获取 父级的所有子集
	var obj = oParent.getElementsByTagName('*');
	//创建一个数组 用于收集子元素
	var pins = [];
	for (var i = 0; i<obj.length; i++) {
		//遍历子元素、判断类别、压入数组
		if(obj[i].className == className) {
			pins.push(obj[i]);
		}
	}
	return pins;
}

/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,minH) {
	for(var i in arr) {
		if(arr[i] == minH)
			return i;
	}
}

function checkscrollside() {
	var oParent = document.getElementById('main');
	var aPin = getByClass(oParent,'pin');
	var lastPinH = aPin[aPin.length-1].offsetTop +
				   Math.floor(aPin[aPin.length-1].offsetHeight/2);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	return (lastPinH<scrollTop+clientHeight?true:false);
}