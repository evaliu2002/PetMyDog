import React, {useEffect, useState} from 'react';
import {Container, Form} from 'react-bootstrap';

import {useNavigate} from "react-router";

 const ViewDogProfile = ({dogProfile}) => {



     const checkStatus = (response) => {
         if (response.status >= 200 && response.status < 300 || response.status === 0) {
             return response;
         } else {
             return Promise.reject(new Error(response.status + ": " + response.statusText));
         }
     };


     return (
            <Container>
                <Form.Group className='font-link'>Your Dog's Profile</Form.Group>

                <Form.Group>
                        <Form>
                            <img className="circular-profile" src= "https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png" alt="profile sample"/>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Name</Form.Label>
                                <Form.Control
                                    readOnly type="text" value={dogProfile.name}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Age</Form.Label>
                                <Form.Control readOnly type="text" value = {dogProfile.age} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Breed</Form.Label>
                                <Form.Control readOnly type="text" value = {dogProfile.breed} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Gender</Form.Label>
                                <Form.Control readOnly type="text" value = {dogProfile.gender} />
                            </Form.Group>

                            {/*<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
                            {/*    <Form.Label>Dog's Biography</Form.Label>*/}
                            {/*    <Form.Control readOnly type="text" value = {bio} />*/}
                            {/*</Form.Group>*/}

                        </Form>

                    </Form.Group>
           </Container>
        )

}

export default ViewDogProfile;