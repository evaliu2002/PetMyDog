import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import UploadImage from "../uploadandisplayimage/UploadImage";
import { useNavigate } from 'react-router';
import { BsArrowLeftSquare } from "react-icons/bs";

function CreateDogProfile () {
    // const navigate = useNavigate();
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [breed, setBreed] = useState();
    const [gender, setGender] = useState();
    const [piclink, setpicLink] = useState();



    const onSubmit = () => {

        console.log(name);
        // console.log(age);
        // console.log(breed);
        // console.log(gender);

        // navigate("/owner-profile")
    }



        return (
            <div>
                <div className="container">

                    <Form.Group className='font-link'>Your Dog's Profile</Form.Group>

                    <UploadImage/>

                    <div className="form">
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Name</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Your Dog's Name"
                                                  value={name}
                                                  onChange={e => setName(e.target.value)}
                                    />
                                </Form.Group>

                                {/*<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
                                {/*    <Form.Label>Dog's Age</Form.Label>*/}
                                {/*    <Form.Control type="number"*/}
                                {/*                  placeholder="Your Dog's Age Here"*/}
                                {/*                  value={age}*/}
                                {/*                  onChange={e => setAge(e.target.value) }/>*/}
                                {/*</Form.Group>*/}

                                {/*<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
                                {/*    <Form.Label>Dog's Breed</Form.Label>*/}
                                {/*    <Form.Control type="text"*/}
                                {/*                  placeholder="Your Dog's Breed Here"*/}
                                {/*                  value={breed}*/}
                                {/*                  onChange={e => setBreed(e.target.value) }/>*/}
                                {/*</Form.Group>*/}

                                {/*<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
                                {/*    <Form.Label>Dog's Gender</Form.Label>*/}
                                {/*    <Form.Control type="text" p*/}
                                {/*                  laceholder="Your Dog's Gender Here"*/}
                                {/*                  value={gender}*/}
                                {/*                  onChange={e => setGender(e.target.value) }*/}
                                {/*    />*/}
                                {/*</Form.Group>*/}

                                <button className="create-button" onClick={onSubmit}>
                                    Create Profile
                                </button>
                            </Form>
                    </div>
                </div>
            </div>
        )
}

export default CreateDogProfile;