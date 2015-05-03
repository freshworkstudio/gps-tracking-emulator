var net = Meteor.npmRequire('net');

ActiveConnections = {};

Meteor.methods({
	addDevice:function(device){
		if(Meteor.user()){
			device.author_id = Meteor.userId();
			Devices.insert(device);
		}
	}
	,
	deleteDevice:function(device_id){
		if(Meteor.user()){
			Devices.remove(device_id);
		}
	},
	connect:function(host, port, device_id){
		return Async.runSync(function(done) {
			connect(host,port, device_id,done);
		});
		
	},
	disconnect:function(device_id){
		ActiveConnections[device_id].destroy();
		return true;
	},
	send:function(data, device_id,waitForResponse){
		if(typeof ActiveConnections[device_id] == 'undefined')return false;

		return Async.runSync(function(done) {
			var onData = function(data){
				ActiveConnections[device_id].removeListener('data',onData);
				done(null,data.toString());
			}

			var couldWrite = ActiveConnections[device_id].write(data,null,function(){
				if(!waitForResponse)done(null,data);
			});
			if(!couldWrite){
				done('PACKET_NOT_SENDED');
			}
			if(waitForResponse){
				ActiveConnections[device_id].on('data',onData);
				setTimeout(function(){
					done('timeout');
				},3000);
			}
		});

	}
	
});

function connect(host, port, device_id,callback){
	client = net.createConnection({
		host:host,
		port:port
	},function(){
		callback(null)
	});

	client.on('error',function(err){
		console.log('error');
		callback(err);
	})
	client.device_id = device_id;
	ActiveConnections[device_id] = client;
	ActiveConnections[device_id].on('data',function(data){
		console.log(data.toString());
	});
	
}