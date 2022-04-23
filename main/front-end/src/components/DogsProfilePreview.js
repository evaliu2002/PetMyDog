import React from 'react';

export class DogsProfilePrewview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userLocation: [0,0],
            ownerName: '',
            ownerDogName: '',
            ownerPhoneNum: '',
            dogLocation: [0,0],
            distanceLeft: 0.0
        };
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}