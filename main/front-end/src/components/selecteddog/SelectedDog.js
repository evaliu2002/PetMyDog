import React from 'react';

export class SelectedDog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: {longitude: 0, latitude: 0},
            ownerName: '',
            dogName: '',
            dogAge: 0,
            dogBreed: '',
            dogLocation: {longitude: 0, latitude: 0},
            distanceLeft: 0,
        };
    }

    render() {
        return (
            <div>
                <h3>{ this.state.dogName }</h3>

                <h5>{ this.state.dogName }'s Location </h5>
                <p>{ this.state.distanceLeft }</p>

                <h5>About { this.state.ownerDogName }</h5>
                <p>Age: { this.state.dogAge }</p>
                <p>Breed: { this.state.dogBreed }</p>

                <img></img>

                <button>Go to Dog</button>
            </div>
        );
    }
}