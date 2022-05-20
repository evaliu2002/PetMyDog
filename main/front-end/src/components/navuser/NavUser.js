import React, { useState } from 'react';
import { BsFillTelephoneFill, BsFillPinMapFill, BsArrowUpCircleFill } from "react-icons/bs";

const NavUser = (prop) => {

    return (
        <div>
            <h3> You are heading to { prop.thatUser.username }</h3>

            <h5> { prop.thatUser.username } </h5> <br />
            <p> Dog Owner contact: </p>

            <BsFillTelephoneFill />
            <h4> { prop.thatUser.phone } </h4>
            <h4> { prop.thatUser.email } </h4>

            <BsFillPinMapFill />
            <p>
                Location: You will see a Pin on map and path to that Pin when the owner's location is available.
                It is possible for the owner's location to be unavailable. If you do not want to wait until it becomes
                available, go back to request list and cancel this meet up.
            </p>
        </div>
    );
}

export default NavUser;