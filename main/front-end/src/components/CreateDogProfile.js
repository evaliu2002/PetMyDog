import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import {BsArrowLeftSquare} from "react-icons/bs";

/**
 * A form that let the user input the dog's info
 * and send a post request to add a new dog to the database
 * @returns {JSX.Element}
 * @constructor
 */
function CreateDogProfile () {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState("");
    const [submitClicked, setSC] = useState(false);

    const CREATE_DOG_PROFILE = process.env.REACT_APP_BASE_URL + "/newDog";


    const onSubmit = () => {
        setSC(true)
        //send the new dog's information to the back-end
        let dogObject = { name, age, breed, gender};
        fetch(CREATE_DOG_PROFILE, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dogObject)
        })
            .then(checkStatus)
            .then(() => {console.log("Name: " + name + "Age: "+ age + "Breed: " +
                breed + "Gender: " + gender  );})
            .catch(() => {console.log("Dog's info not updated")} )

        //navigate back to the owner's profile once a new is created.
        navigate("/owner-profile")
    }

    const back = () => {
        navigate("/owner-profile")
    }


    /**
     * Get back-end response
     * @param response
     * @returns {Promise<never>|*}
     */
    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };

    // A form that receive the dog info inputs
        return (
            <div>
                <div className="container">
                    <BsArrowLeftSquare  color="white" style={{margin: "20px"}} onClick={back}/>
                    <Form.Group className="font-link">Your Dog's Profile</Form.Group>


                    <div className="form">
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className="dogText">Dog's Name</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Your Dog's Name"
                                                  value={name}
                                                  onChange={e => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Age</Form.Label>
                                    <Form.Control type="number"
                                                  placeholder="Your Dog's Age Here"
                                                  value={age}
                                                  onChange={e => setAge(e.target.value) }/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Breed</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Your Dog's Breed Here"
                                                  value={breed}
                                                  onChange={e => setBreed(e.target.value) }/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Dog's Gender</Form.Label>
                                    <Form.Control type="text" p
                                                  placeholder="Your Dog's Gender Here"
                                                  value={gender}
                                                  onChange={e => setGender(e.target.value) }
                                    />
                                </Form.Group>

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