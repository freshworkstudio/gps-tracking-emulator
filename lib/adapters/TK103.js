TK103 = {
	availableMethods:function(){
		return ['ping','alarm','login'];
	},
	pingMessage:function(device_uid){
		device_uid = device_uid.substr(0,12);
		return '('+device_uid+'BR00140607A3332.5862S07037.2134W073.3232411144.5600000000L0001B3CC)';
	},
	loginMessage:function(device_uid){
		device_uid = device_uid.substr(0,12);
		return '('+device_uid+'BP05000012341234123140607A3330.4288S07036.8518W019.2230104172.3900000000L00019C2C)';
	},
	alarmMessage:function(device_uid){
		device_uid = device_uid.substr(0,12);
		return '('+device_uid+'BO010140607A3325.6987S07036.6508W000.0223705211.9610000000L000176A0)';
	},
	checkLoginResponse:function(response,device_uid){
		if(response == '('+device_uid+'AP05)')return true;
		return false;
	}
}