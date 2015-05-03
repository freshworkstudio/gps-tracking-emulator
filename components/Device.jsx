var Device = ReactMeteor.createClass({
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
    return (<div className="device">
        <div className="img">

        </div>
        <div className="info">
          <span><strong>IP:</strong> { this.state.ip }</span>
          <span><strong>Port:</strong> { this.state.port }</span>
        </div>
    </div>);
  }

});

exports = Device;