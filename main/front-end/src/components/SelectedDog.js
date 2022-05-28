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

    const dogRequests = () => {
        navigate("/map-view/dog-requests")
    }

    const REQ_MEET_URL = process.env.REACT_APP_BASE_URL + "/requestMeetup";

    /**
     * Sending meetup request to the back end
     */
    const navUser = () => {
        fetch(REQ_MEET_URL, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "receiver": dogObj.ownerID })
        })
            .then(() => {console.log("Sent meetup request")})
            .catch(() => {console.log("Send meetup request failed")})
        navigate("/map-view/dog-requests")
    }

    useEffect(() => {
        console.log(dogObj);
    })

    return (
        <div>
            <BsArrowLeftSquare onClick={back}/>
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
        </div>
    );
}

export default SelectedDog;