Template.home.helpers({
	devices:function(){
		if(Meteor.user()){
			return Devices.find();
		}

		return Session.get('devices');
	}
});
Template.home.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("devices");
});