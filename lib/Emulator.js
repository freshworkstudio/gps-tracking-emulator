Emulator = function(){
	var _this = this;
	this.models = {'TK103':TK103};
	this.adapter = null;
	this.device_id = null;
	this.device_uid = null;
	this.loged = false;
	this.interval = null;
	this.timeout = null;

	this.connected = false;

	this.init = function(device_model,device_id, device_uid){
		if(typeof this.models[device_model] == "undefined")throw "Device model "+device_model+" not supported";

		this.adapter = this.models[device_model];
		this.device_id = device_id;
		this.device_uid = device_uid;
	}

	this.setTimeout = function(timeout){
		this.timeout = timeout;
	};

	this.getAvailableMethods = function(){
		return this.adapter.availableMethods();
	}

	this.addModel = function(code,object){
		this.models[code] = object;
	}

	this.connect = function (host, port,cb){
		this.onConnect();
		Meteor.call('connect',host, port, this.device_id,function(error,result){
			if(result.error || error){
				_this.loged = false;
				_this.onConnectionError();
			}else{
				_this.loged = true;

				_this.login();
				_this.onConnected();
			}
			if(typeof cb == 'function')cb(_this.loged,result);
		});
	}

	this.disconnect = function(){
		_this.onDisconnect();
		Meteor.call('disconnect',this.device_id,function(error,result){
			var error = error || result.error;

			if(error)return false;

			_this.loged = false;
			_this.connected = false;
			_this.pausePings();

			_this.onDisconnected();
		})
	}

	this.startPings = function(){
		if(this.interval)clearInterval(this.interval);
		this.onStartPings();
		this.interval = setInterval(function(){
			_this.ping();
		},this.timeout);
	}

	this.pausePings = function(){
		this.onPausePings();
		if(this.interval)clearInterval(_this.interval);
	}

	this.login = function(cb){
		this.onLogin();
		this.send(this.adapter.loginMessage(this.device_uid),true,function(error,result){
			if(error){
				_this.onLoginRejected(error,result);
				return false;
			}

			var loginResponse = _this.adapter.checkLoginResponse(result,_this.device_uid);
			if(!loginResponse){
				_this.onLoginRejected(error,result);
				return false;
			}

			if(typeof cb == 'function')cb(error,result);

			_this.onLoginAuthorized(result);
		});

	}

	this.ping = function(cb){
		this.onPing();
		this.send(this.adapter.pingMessage(this.device_uid),false,function(error,result){
			if(typeof cb == 'function')cb(error,result);
		});
	}

	this.alarm = function(cb){
		this.onAlarm();
		this.send(this.adapter.alarmMessage(this.device_uid),false,function(error,result){
			if(typeof cb == 'function')cb(error,result);
		});
	}

	this.sendCustom = function(message, cb){
		this.send(message,false,function(error,result){
			if(typeof cb == 'function')cb(error,result);
			_this.onCustomMessageSended(error, result, message);
		});
	}

	this.send = function(data,waitForResponse,cb){
		var waitForResponse = waitForResponse || false;
		Meteor.call('send',data,this.device_id,waitForResponse,function(error, result){
			var error = error || result.error;
			if(typeof cb == 'function')cb(error,result.result);
		});
		
	}

	this.onConnect = function(){}
	
	this.onConnected = function(){}

	this.onDisconnect = function(){}

	this.onDisconnected = function(){}
	
	this.onLogin = function(){}

	this.onPing = function(){}

	this.onAlarm = function(){}

	this.onSend = function(){}

	this.onLoginAuthorized = function(){
		_this.startPings();
	}
	this.onLoginRejected = function(){}

	this.onStartPings = function(){};

	this.onPausePings = function(){};

	this.onCustomMessageSended = function(){};

}