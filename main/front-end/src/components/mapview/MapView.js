import React, {useState} from 'react';
import Map from '../map/Map';
import { useNavigate } from 'react-router';
import FindDogs from "../finddogs/FindDogs";


const MapView = () => {

    let navigate = useNavigate();

    const [activeComp, setActiveComp] = useState(<FindDogs />);

    return (
        <div>
            <Map />
            {activeComp}
        </div>
    )
}

export default MapView;