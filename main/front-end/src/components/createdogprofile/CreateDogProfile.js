import React from 'react';
import Form from 'react-bootstrap/Form';
import UploadImage from "../uploadandisplayimage/UploadImage";

export class CreateDogProfile extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="">Your Dog's Profile</h1>
                    <UploadImage/>
                    <div className="form">
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your Dog's Name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Breed</Form.Label>
                                    <Form.Control type="text" placeholder="Your Dog's Breed Here" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Age</Form.Label>
                                    <Form.Control type="text" placeholder="Your Dog's Age Here" />
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
}