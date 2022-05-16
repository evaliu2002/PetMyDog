import React, { useEffect } from 'react';
import { BsArrowLeftSquare, BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import {Card,Button} from "react-bootstrap";

const SelectedDog = ({dogObj}) => {
    // useNavigate for event handling to other web pages
    let navigate = useNavigate();
    const back = () => {
        navigate(-1)
    }
    const ownerProfile = () => {
        navigate("/owner-profile")
    }

    const REQ_MEET_URL = "http://petmydog.fun/requestMeetup";

    /**
     * Sending meetup request to the back end
     */
    const navUser = () => {
        fetch(REQ_MEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: { receiver: dogObj.ownerID }
        })
            .then(() => {console.log("Sent meetup request")})
            .catch(() => {console.log("Send meetup request failed")})
        navigate("/nav-user")
    }

    useEffect(() => {
        console.log(dogObj);
    })

    return (
        <div>
            <BsArrowLeftSquare onClick={back}/>

            <BsFillPersonFill onClick={ownerProfile}/>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png" />
                <Card.Body>
                    <Card.Title> {dogObj.name}</Card.Title>
                    <Card.Text>
                        <p>Age: { dogObj.age }</p>
                        <p>Breed: { dogObj.breed }</p>
                    </Card.Text>
                    <Button variant="primary" onClick={navUser}>Go to Dog</Button>
                </Card.Body>
            </Card>
            {/*<h3>{ dogObj.name }</h3>*/}



            {/*<h5>About { dogObj.name }</h5>*/}
            {/*<p>Age: { dogObj.age }</p>*/}
            {/*<p>Breed: { dogObj.breed }</p>*/}

            {/* <img></img> */}

            {/*<button onClick={navUser}>Go to Dog</button>*/}
        </div>
    );
}

export default SelectedDog;