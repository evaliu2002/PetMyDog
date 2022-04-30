import React from 'react';
import Form from 'react-bootstrap/Form';

export class CreateDogProfile extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="">Your Dog's Profile</h1>
                    <div className="form">
                        <Form>
                            <img className="circular-profile" src="https://images.unsplash.com/photo-1553322378-eb94e5966b0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="profile sample
                      "/>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Name</Form.Label>
                                <Form.Control type="textarea" placeholder="Your Dog's Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Breed</Form.Label>
                                <Form.Control type="text`" placeholder="Your Dog's Breed Here" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dog's Age</Form.Label>
                                <Form.Control type="text" placeholder="Your Dog's Age Here" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}