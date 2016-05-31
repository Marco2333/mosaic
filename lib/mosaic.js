(function(window) {
	function extend(custom,defaults) {
		var key,value;
		for(key in custom) {
			if((value = custom[key]) != null) {
				defaults[key] = value;
			}
		}
		return defaults;
	}

	function Mosaic(options) {
		if(null == options) {
			options = {};
		}
		this.config = extend(options,this.defaults);
	}

	Mosaic.prototype = {
		defaults: {
			boxClass: "mosaic",
			width: 12,
			scale: 2,
			radius: null,
			border: null,
			random: false,
			maxScale: 5
		},
		start: function() {
			var i, len, 
			boxEles = document.getElementsByClassName(this.config.boxClass);
			for(i = 0,len = boxEles.length;i < len;i++) {
				this.domToPiece(boxEles[0]);
			}
		},
		domToPiece: function(ele) {
			var i,j,div,img
			,pieceWidth = this.config.width
			,border = this.config.border
			,radius = this.config.radius
			,rowCount = Math.floor(ele.height / pieceWidth)
			,colCount = Math.floor(ele.width / pieceWidth) 

			,divWrap = document.createElement('div')
			,imgSrc = ele.src
			,divCssText = "width:" + pieceWidth + "px;height:" + pieceWidth 
						+ "px;position:absolute;overflow:hidden";
			if(border && border !== "none") {
				divCssText += ";border:" + border;
			}
			if(radius) {
				divCssText += ";border-radius:" + radius;
			}
			for(i = 0;i < colCount;i++) {
				for(j = 0;j < rowCount;j++) {
					div = document.createElement('div');
					div.style.cssText = divCssText + ";left:" + i * pieceWidth + "px;top:" + j * pieceWidth + "px";
					img = document.createElement('img');
					img.src = imgSrc;
					img.style.cssText = "position:absolute;left:" 
						+ -i * pieceWidth + "px;top:" + -j * pieceWidth + "px";
					div.appendChild(img);
					divWrap.appendChild(div);
				}
			}
			divWrap.className = 'mosaic-wrap';
			divWrap.style.cssText = 'width:' +  ele.width + "px;height:" + ele.height 
				+ "px;position:relative;display:inline-block;overflow:hidden";
			// ele.parentNode.insertBefore(divWrap,ele);
			// ele.style.display = "none";
			ele.parentNode.replaceChild(divWrap,ele);
			this.mosaic(divWrap);
		},
		mosaic: function(ele) {
			var i, len, config = this.config, scale = config.scale
			,mosaicEle = ele.childNodes, random = config.random
			,rowCount = Math.floor(ele.height / config.width)
			,colCount = Math.floor(ele.width / config.width);

			for(i = 0,len = mosaicEle.length;i < len;i++) {
				if(random) {
					scale = config.maxScale * Math.round(Math.random());
				}
				mosaicEle[i].style.transform = "scale("+scale+")";
			}
		}
	};

	window.Mosaic = Mosaic;
})(window);