import React, { useState } from 'react';
import { BsFillTelephoneFill, BsFillPinMapFill, BsArrowUpCircleFill } from "react-icons/bs";

const NavOwner = (prop) => {
    return (
        <div>
            <h3> { prop.thatUser.username } is coming to you</h3>

            <h5> Visitor's contact: </h5> <br />

            <BsFillTelephoneFill />
            <h4> { prop.thatUser.phone } </h4>
            <h4> { prop.thatUser.email } </h4>

            <BsFillPinMapFill />
            <p>
                Location: You will see a Pin on map and path to that Pin when the visitor's location is available.
                It is possible for the visitor's location to be unavailable. If you do not want to wait until it becomes
                available, go back to request list and cancel this meet up.
            </p>

        </div>
    );
}

export default NavOwner;