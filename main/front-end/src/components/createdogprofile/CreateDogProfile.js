import React from 'react';
import Form from 'react-bootstrap/Form';
import UploadImage from "../uploadandisplayimage/UploadImage";

function CreateDogProfile () {

        return (
            <div>
                <div className="container">

                    <Form.Group className='font-link'>Your Dog's Profile</Form.Group>

                    <UploadImage/>

                    <div className="form">
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your Dog's Name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Age</Form.Label>
                                    <Form.Control type="text" placeholder="Your Dog's Age Here" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Breed</Form.Label>
                                    <Form.Control type="text" placeholder="Your Dog's Breed Here" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Gender</Form.Label>
                                    <Form.Control type="text" placeholder="Your Dog's Gender Here" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Bio</Form.Label>
                                    <Form.Control type="text" placeholder="Your Dog's Bio Here" />
                                </Form.Group>
                                <button className="create-button">
                                    Create Profile
                                </button>
                            </Form>
                    </div>
                </div>
            </div>
        )
}

export default CreateDogProfile;