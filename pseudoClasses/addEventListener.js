function EventEmitter(){
	this.events = {};
}
EventEmitter.prototype.addEventListener = function(event, callback){
	if(this.events[event]){//可能绑定多个函数
		this.events[event].push(callback);
	}else{
		this.events[event] = [callback];
	}
	return this;
};
EventEmitter.prototype.emit = function(event, e){
	try{
		var a = 0,
			events = this.events[event];
		while(events[a]){
			events[a++](e);
		}
		return this;
	}catch(e){
		throw "no such event";
	}
};
EventEmitter.prototype.removeEventListener = function(event, callback){
	try{
		var a = -1,
			events = this.events[event];
		while(events[++a]){
			events[a] === callback && events.splice(a, 1);
		}
		return this;
	}catch(e){
		throw "no such event";
	}
};
Element.prototype.bind = function bind(event, callback, isCapture){
	if(this.addEventListener){
		this.addEventListener(event, callback, isCapture);
		return this;
	}
	if(this.attachEvent){
		this.attachEvent("on" + event, callback);
		return this;
	}
	if(!this.event){
		this.event = new EventEmitter;
	}
	this["on" + event] = function(e){
		this.event.emit("click", e);
	};
	this.event.addEventListener(event, callback);
	return this;
};
Element.prototype.unbind = function(event, callback, isCapture){
	if(this.removeEventListener){
		this.removeEventListener(event, callback, isCapture);
		return this;
	}
	if(this.detachEvent){
		this.detachEvent("on" + event, callback);
		return this;
	}
	try{
		this.event.removeEventListener(event, callback);
		return this;
	}catch(e){}
};

var html = document.documentElement;
function a(e){
	console.log(e, 12);
}
html
	.bind("click", function(e){
		console.log(e, 1);
	})
	.bind("click", a)
	.bind("click", function(e){
		console.log(e, 123);
	})
	.bind("click", function(e){
		console.log(e, 1234);
	})
	.unbind("click", a)
	.bind("click", function(e){
		console.log(e, 12345);
	});