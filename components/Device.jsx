var MyComponent = ReactMeteor.createClass({
  templateName: "Device",

  startMeteorSubscriptions: function() {
    //Meteor.subscribe("players");
  },

  // Make sure your component implements this method.
  getMeteorState: function() {
    return {
      
    };
  },

  getInitialState: function(){
    return {
      ip:'',
      port:'',
      model:''
    }
  },
  delete: function(e) {
    this.setState({ip: e.target.value});
  },

  render: function() {
    return (<div></div>);
  }

});

//export MyComponent;