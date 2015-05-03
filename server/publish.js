
Meteor.publish('devices',function(){
	return Devices.find({author_id:this.userId});
});