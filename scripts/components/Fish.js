import React from 'react';
import helpers from '../helpers';

var Fish = React.createClass({

    onButtonClick: function() {
        this.props.addToOrder(this.props.index)
    },

    render: function() {

        var details = this.props.details;
        var isAvailable = (details.status === 'available' ? true : false);
        var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out');

        return(
            <li className="menu-fish">
                <img src={details.image} alt="" />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{helpers.formatPrice(details.price)}</span>
                </h3>
                <p>{details.description}</p>
                <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
            </li>
        )
    }

});

export default Fish;