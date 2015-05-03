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
  handleSubmit:function(e){
    e.preventDefault();

    var ip = React.findDOMNode(this.refs.ip).value.trim();
    var port = React.findDOMNode(this.refs.port).value.trim();
    if (!ip || !port) {
      return;
    }

    React.renderComponent(<Device />, document.body);

    React.findDOMNode(this.refs.ip).value = '';
    React.findDOMNode(this.refs.port).value = '';

    if(this.props.onSubmit)this.props.onSubmit({ip: ip, port: port});
  },

  render: function() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        
        <div className="form-group">
          <label for="ip">IP</label>
          <input type="text" className="form-control" value={this.state.ip} onChange={this.onChangeIP} ref="ip" placeholder="200.214.122.12" />
        </div>

        <div className="form-group">
          <label for="port">PORT</label>
          <input type="text" className="form-control" value={this.state.port} onChange={this.onChangePort} ref="port" id="port" placeholder="8090" />
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
