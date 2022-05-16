import React, { useState, useEffect } from 'react';
import { BsArrowLeftSquare } from "react-icons/bs";
import './OwnerProfile.css';
import { useNavigate } from 'react-router';
import {Card,Button,Container} from "react-bootstrap";



const OwnerProfile = () => {
    const [ownerName, setOwnerName] = useState("Bob");
    const [dogProfiles, setDogProfiles] = useState([]);
    // const [selectedDog, setSelectedDog] = useState();

    const GET_USER_PROFILE_URL = "http://localhost:4567/getMyProfile";
    let displayDogs= [];
    let navigate = useNavigate();

    const createDogProfile = () => {
        navigate("/create-dog-profile")
    }

    const findDogs = () => {
        navigate("/map-view/dog-requests")
    }

    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };


    const updateOwnerProfile = () => {
        fetch(GET_USER_PROFILE_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async(response) =>{
                let userObj = await response.json();
                console.log(userObj);
                let userDog = userObj.dogs;
                console.log(userObj);
                setDogProfiles(userDog);
                console.log("Dogs displayed: " + JSON.stringify(userDog));
                let userName = userObj.username;
                setOwnerName(userName);
            })
    }

    useEffect( updateOwnerProfile,[]);

    return (
        <div className="owner-profile">
            <h2 className="font-link"> {ownerName}'s Profile </h2>

            <button className="add-more"  onClick={createDogProfile}>add more</button>

            <Container fluid>
                <div className= "row justify-content-md" >

                    {dogProfiles.map(dog => <div id={JSON.stringify(dog)} key={JSON.stringify(dog)}  >

                        <Card style={{width: '18rem', margin: '20px'}}>
                        <Card.Img variant="top" src= "https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png"  />
                        <Card.Body>
                        <Card.Title> {dog.name}</Card.Title>
                        <Card.Text>
                        <p>Age: {dog.age}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender: {dog.gender}  </p>
                        <p>Breed: {dog.breed}</p>
                    {/*<p>Biography: dog.bio </p>*/}
                        </Card.Text>
                        <Button variant="primary" onClick={findDogs}>Go For A Walk</Button>
                        </Card.Body>
                        </Card>

                    </div>)}
                </div>
            </Container>

        </div>
    );
}

export default OwnerProfile;