var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var helpers = require('./helpers');

var App = React.createClass({

    getInitialState: function() {
        return {
            fishes: {},
            order: {},
        }
    },

    addFish: function(fish) {
        var timestamp = (new Date()).getTime();

        //Update the state
        this.state.fishes['fish-' + timestamp] = fish;

        //set the state
        this.setState({ fishes: this.state.fishes });
    },

    loadSamples: function() {
        this.setState({
            fishes: require('./sample-fishes')
        });
    },

    renderFish: function(key) {
        return (
            <Fish key={key} index={key} details={this.state.fishes[key]} />
        )
    },

    render: function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        )
    }

});

var Fish = React.createClass({

    render: function() {
        var details = this.props.details;
        return(
            <li className="menu-fish">
                <img src={details.image} alt="" />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{helpers.formatPrice(details.price)}</span>
                </h3>
                <p>{details.description}</p>
            </li>
        )
    }

})

var AddFishForm = React.createClass({
    createFish : function(event) {

        // Stop the form from submitting
        event.preventDefault();

        //Get the date for the fish
        var fish = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            status: this.refs.status.value,
            description: this.refs.description.value,
            image: this.refs.image.value,
        }

        //Add fish to app state
        this.props.addFish(fish);
        this.refs.fishForm.reset();
    },

    render: function() {
        return (
            <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
                <input type="text" ref="name" placeholder="Fish Name"/>
                <input type="text" ref="price" placeholder="Fish Price" />
                <select ref="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" ref="description" placeholder="Description"></textarea>
                <input type="text" ref="image" placeholder="URL to Image" />
                <button type="submit">+ Add Item </button>
            </form>
        )
    }

});

var Header = React.createClass({

    render: function() {
        return (
            <header className="top">
                <h1>Catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span>
                Day</h1>
                <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
        )
    }
});

var Order = React.createClass({

    render: function() {
        return (
            <p>Order</p>
        )
    }
});

var Inventory = React.createClass({

    render: function() {
        return (
            <div>
                <h2>Inventory</h2>
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample fishes</button>
            </div>
        )
    }
});

var StorePicker = React.createClass({
    mixins: [History],

    goToStore : function(event) {
        event.preventDefault();
        var storeId = this.refs.storeId.value;
        this.history.pushState(null, '/store/' + storeId);
    },

    render: function() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input type="text" defaultValue={helpers.getFunName()} ref="storeId" required />
                <input type="Submit" />
            </form>
        )
    }

});

var NotFound = React.createClass({

    render: function() {
        return (
            <h1>Not found</h1>
        )
    }

})

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route path="*" component={NotFound} />
    </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));