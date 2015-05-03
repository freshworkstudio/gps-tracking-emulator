Template.device.events({
	'click .delete-btn':function(e){
		e.preventDefault();


		clearInterval(this.timeout);

		if(Meteor.user()){
			Meteor.call('deleteDevice',this._id);
		}else{
			var devices = Session.get('devices');
			for(var i = 0; i < devices.length; i++){
				if(devices[i]._id == this._id){
					devices.splice(i,1);
					break;
				}
			}
			Session.setPersistent('devices',devices);			
		}
	},
	'click .connect':function(e){
		e.preventDefault();
		Template.instance().connect();
	},
	'click .disconnect':function(e){
		e.preventDefault();
		Template.instance().disconnect();
	},
	'click .login':function(e){
		e.preventDefault();
		Template.instance().login();
	},
	'click .ping':function(e){
		e.preventDefault();
		Template.instance().ping();
	},
	'click .alarm':function(e){
		e.preventDefault();
		Template.instance().alarm();
	},
	'click .startPings':function(e){
		e.preventDefault();
		Template.instance().startPings();
	},
	'click .pausePings':function(e){
		e.preventDefault();
		Template.instance().pausePings();
	},
	'click .sendCustom':function(e){
		var tpl = Template.instance();
		e.preventDefault();
		swal({   
			title: "Send custom message",   
			text: "Write your custom message:",   
			type: "input",   
			showCancelButton: true,   
			closeOnConfirm: false,   
			animation: "slide-from-top",   
			inputPlaceholder: "Write something" 
		}, function(inputValue){   
			if (inputValue === false) 
				return false;      
			if (inputValue === "") {     
				swal.showInputError("You need to write something!");     
				return false   
			}      
			swal("Nice!", "You wrote: " + inputValue, "success"); 
			tpl.sendCustom(inputValue);
		});

	},
	'click .show-log':function(e){
		e.preventDefault();
		$(e.target).parent().find('ul').toggle();
	}

});

Template.device.helpers({
	statuses:function(){
		return Session.get('devices.'+this._id+".statuses") || [];
	},
	lastStatus:function(){
		var statuses = Session.get('devices.'+this._id+".statuses") || [''];
		return statuses[0] || '';
	},
	logCount:function(){
		var statuses = Session.get('devices.'+this._id+".statuses") || [];
		return statuses.length;
	},
	connectionStatus:function(){
		return Session.get('devices.'+this._id+".connection") || 0;
	},
	equals:function(a,b){
		return (a == b);
	}
});

Template.device.rendered = function(){
	var _this = this;
	var pings = 0;

	_this.status = function(status){
		var id ='devices.'+_this.data._id+".statuses";
		var statuses = Session.get(id) || [];
		statuses.unshift(status);
		Session.set(id,statuses);
	}

	_this.connectionStatus = function(status){
		Session.set('devices.'+_this.data._id+".connection",status);
	}

	

	this.emulator = new Emulator();
	this.emulator.init(this.data.model,this.data._id, this.data.uid);
	this.emulator.setTimeout(this.data.timeout);

	_this.emulator.onConnect = function(){
		_this.status("Connecting...");
		_this.connectionStatus('connecting');
	}
	_this.emulator.onConnected = function(){
		_this.status('Connected');
		_this.connectionStatus('connected');
	}

	_this.emulator.onDisconnected = function(){
		_this.status('Disconnected');
		_this.connectionStatus('disconnected');
	}

	_this.emulator.onConnectionError = function(){
		_this.status('Connection error');
		_this.connectionStatus('disconnected');
	}

	_this.emulator.onLoginAuthorized = function(){
		_this.status('Login accepted');
		this.startPings();
	}
	_this.emulator.onLoginRejected = function(error,response){
		_this.status('Login rejected: '+response);
	}
	_this.emulator.onPing = function(){
		pings++;
		_this.status('Ping sended! (x'+pings+')');
	}
	_this.emulator.onLogin = function(){
		_this.status("Sending login request...");
	}

	_this.emulator.onStartPings = function(){
		_this.status("Starting to send pings every "+_this.data.timeout+"ms...");
	}

	_this.emulator.onPausePings = function(){
		_this.status("Pings paused");
	}
	_this.emulator.onCustomMessageSended = function(error, result, message){
		_this.status("Message sended: "+message);
	}

	//FUNCTIONS
	_this.connect = function(){
		_this.emulator.connect(this.data.ip,this.data.port,function(loged,response){
			//Do something...
		});
	};

	_this.disconnect = function(){
		_this.emulator.disconnect();
	};

	_this.login = function(){
		_this.emulator.login();
	};

	_this.ping = function(){
		_this.emulator.ping();
	};

	_this.alarm = function(){
		_this.emulator.alarm();
	}

	_this.startPings = function(){
		_this.emulator.startPings();
	}

	_this.pausePings = function(){
		_this.emulator.pausePings();
	}

	_this.sendCustom = function(message){
		_this.emulator.sendCustom(message);
	}


	//CONNECT
	_this.connect();


	
}

Template.device.destroyed = function(){
	this.emulator.disconnect();
}
