Template.device_form.helpers({
	uid:function(){
		return makeid(12)
	},
	timeout:5000
});

Template.device_form.events({
	'submit form':function(e){
		e.preventDefault();

		var device = {
			ip: 	$(e.target).find('[ref=ip]').val(),
			port: 	$(e.target).find('[ref=port]').val(),
			model: 	$(e.target).find('[ref=model]').val(),
			uid: 	$(e.target).find('[ref=uid]').val(),
			timeout:$(e.target).find('[ref=timeout]').val()
		}

		
		if(Meteor.user()){
			Meteor.call('addDevice',device);
		}else{
			var devices = Session.get('devices') || [];
			device._id = Math.random();
			devices.push(device);
			Session.setPersistent('devices',devices);			
		}
		
		$(e.target).find('input,select,textarea').not('[type=submit]').val('');
	}
});