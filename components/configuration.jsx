var MyComponent = ReactMeteor.createClass({
   templateName: "ConfigurationForm",

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
  onChangeIP: function(e) {
    this.setState({ip: e.target.value});
  },
  onChangePort: function(e) {
    this.setState({port: e.target.value});
  },
  onChangeModel: function(e) {
    this.setState({model: e.target.value});
  },

  render: function() {
    return (
      <form className="form">
        
        <div className="form-group">
          <label for="ip">IP</label>
          <input type="text" className="form-control" value={this.state.ip} onChange={this.onChangeIP} placeholder="200.214.122.12" />
        </div>

        <div className="form-group">
          <label for="port">PORT</label>
          <input type="email" className="form-control" value={this.state.port} onChange={this.onChangePort}  id="port" placeholder="8090" />
        </div>

        <div className="form-group">
          <label for="port">Device Model</label>
          <select className="form-control" id="model" value={this.state.model} onChange={this.onChangeModel} >
            <option value="TK103">TK103</option>
          </select>
        </div>

        <button type="submit" className="btn btn-default">Add Device</button>
      </form>
    );
  }

});
