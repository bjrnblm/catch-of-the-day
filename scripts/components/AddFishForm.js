import React from 'react';

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

export default AddFishForm;