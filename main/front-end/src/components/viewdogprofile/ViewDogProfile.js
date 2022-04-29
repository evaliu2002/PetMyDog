import React from 'react';
import {Container, Form} from 'react-bootstrap';



 function ViewDogProfile({name, age, breed, photolink}) {

        return (
            <Container>
                    <h1>Your Dog's Profile</h1>
                    <Form.Group>
                        <Form>
                            <img className="circular-profile" src= {photolink} alt="profile sample"/>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Name</Form.Label>
                                <Form.Control
                                    readOnly type="text" value={name}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Age</Form.Label>
                                <Form.Control readOnly type="text" value = {age} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Breed</Form.Label>
                                <Form.Control readOnly type="text" value = {breed} />
                            </Form.Group>

                        </Form>

                    </Form.Group>
           </Container>

        )

}

ViewDogProfile.defaultProps = {
     name: "Kiki",
    age: "3",
    breed: "Husky",
    photolink: "https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png"
}

export default ViewDogProfile;