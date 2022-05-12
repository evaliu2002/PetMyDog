import React, { useState } from 'react';
import { BsArrowLeftSquare } from "react-icons/bs";
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
        navigate("/find-dogs")
    }

    return (
        <div className='ownerProfile'>
            <h1 style={{size: '40px', align: 'center'}}> Bob's Profile</h1>
            <Button variant="primary" onClick={createDogProfile}>Add More</Button>

            <Container fluid>
                <div className= "row justify-content-center" >
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