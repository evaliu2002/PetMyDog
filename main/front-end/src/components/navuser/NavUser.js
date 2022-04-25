import React from 'react';
import { BsFillTelephoneFill, BsFillPinMapFill, BsArrowUpCircleFill } from "react-icons/bs";

export class NavUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userLocation: {longitude: 0, latitude: 0},
            ownerName: '',
            ownerDogName: '',
            ownerPhoneNum: '',
            dogLocation: {longitude: 0, latitude: 0},
            distanceLeft: 0,
        };
    }

    render() {
        return (
            <div>
                {/* map */}
                <h3> { this.state.userName } is heading to { this.state.ownerDogName }</h3>

                <h5> { this.state.ownerName } </h5> <br />
                <p> Dog Owner </p>

                <BsFillTelephoneFill />
                <h4> { this.state.ownerPhoneNum } </h4>

                <BsFillPinMapFill />
                <p> Location of { this.state.ownerDogName }: 
                { this.state.dogLocation.longitude }, { this.state.dogLocation.latitude }</p>

                <BsArrowUpCircleFill />
                <p> Distance Left: { this.state.distanceLeft } </p> 

                <button>Cancel the Meeting</button>
            </div>
        );
    }
}