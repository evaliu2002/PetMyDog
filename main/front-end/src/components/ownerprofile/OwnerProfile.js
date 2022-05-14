import React, { useState } from 'react';
import { BsArrowLeftSquare } from "react-icons/bs";
import './OwnerProfile.css';
import { useNavigate } from 'react-router';
import {Card,Button,Container} from "react-bootstrap";


const OwnerProfile = () => {
    const [ownerName, setOwnerName] = useState("Bob");
    const [dogProfiles, setDogProfiles] = useState([]);

    let navigate = useNavigate();

    const createDogProfile = () => {
        navigate("/create-dog-profile")
    }

    const findDogs = () => {
        navigate("/map-view/dog-requests")
    }

    return (
        <div className="owner-profile">
            <h2 className="font-link"> Bob's Profile </h2>

            <button className="add-more"  onClick={createDogProfile}>add more</button>

            <Container fluid>
                <div className= "row justify-content-md-center" >
                    <Card style={{ width: '18rem', margin: '20px'}}>
                        <Card.Img variant="top" src="https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png" />
                        <Card.Body>
                            <Card.Title>Kiki</Card.Title>
                            <Card.Text>
                                <p>Age: 3   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender: Male  </p>
                                <p>Breed: Husky</p>
                                <p>Biography: Kiki is a good boy</p>
                            </Card.Text>
                            <Button variant="primary" onClick={findDogs}>Go For A Walk</Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem', margin: '20px'}}>
                        <Card.Img variant="top" src="https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png" />
                        <Card.Body>
                            <Card.Title>Kiki</Card.Title>
                            <Card.Text>
                                <p>Age: 3   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender: Male  </p>
                                <p>Breed: Husky</p>
                                <p>Biography: Kiki is a good boy</p>
                            </Card.Text>
                            <Button variant="primary" onClick={findDogs}>Go For A Walk</Button>
                        </Card.Body>
                    </Card>


                    <Card style={{ width: '18rem', margin: '20px'}}>
                        <Card.Img variant="top" src="https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png" />
                        <Card.Body>
                            <Card.Title>Kiki</Card.Title>
                            <Card.Text>
                                <p>Age: 3   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender: Male  </p>
                                <p>Breed: Husky</p>
                                <p>Biography: Kiki is a good boy</p>
                            </Card.Text>
                            <Button variant="primary" onClick={findDogs}>Go For A Walk</Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem', margin: '20px'}}>
                        <Card.Img variant="top" src="https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png" />
                        <Card.Body>
                            <Card.Title>Kiki</Card.Title>
                            <Card.Text>
                                <p>Age: 3   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender: Male  </p>
                                <p>Breed: Husky</p>
                                <p>Biography: Kiki is a good boy</p>
                            </Card.Text>
                            <Button variant="primary" onClick={findDogs}>Go For A Walk</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Container>

        </div>
    );
}

export default OwnerProfile;