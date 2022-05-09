import React from 'react';
import {Container, Form} from 'react-bootstrap';
import UploadImage from "../uploadandisplayimage/UploadImage";
import { BsArrowLeftSquare } from "react-icons/bs";
import {useNavigate} from "react-router";

 function ViewDogProfile({name, age, breed, gender, bio, photolink}) {
    const navigate = useNavigate();


        return (
            <Container>
                <Form.Group className='font-link'>Your Dog's Profile</Form.Group>

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

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Gender</Form.Label>
                                <Form.Control readOnly type="text" value = {gender} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Biography</Form.Label>
                                <Form.Control readOnly type="text" value = {bio} />
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
    gender: "Male",
    bio: "Kiki is a good boy",
    photolink: "https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png"
}

export default ViewDogProfile;