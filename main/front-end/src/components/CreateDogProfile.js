import React from 'react';
import Form from 'react-bootstrap/Form';

export class CreateDogProfile extends React.Component {
    render() {
        return (
            <div>
                <h1 className="">Your Dog's Profile</h1>
                <div className="form">
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Your Dog's Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Breed</Form.Label>
                                <Form.Control type="text" placeholder="Your Dog's Breed Here" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Age</Form.Label>
                                <Form.Control type="text" placeholder="Your Dog's Age Here" />
                            </Form.Group>

                        </Form>
                </div>
            </div>
        )
    }
}