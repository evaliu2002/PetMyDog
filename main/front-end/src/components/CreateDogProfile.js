import React from 'react';

export class CreateDogProfile extends React.Component {
    render() {
        return (
            <div>
                <h1 className="">Your Dog's Profile</h1>
                <div className="form">
                    <form>
                        <div className="input-container">
                            <label> Dog's Name </label>
                            <input type="text" placeholder="Enter Your Dog's Name" name="name" required />
                        </div>
                        <div className="input-container">
                            <label> Dog's Breed </label>
                            <input type="text" placeholder="Enter Your Dog's Breed" name="breed" required />
                        </div>
                        <div className="input-container">
                            <label> Dog's Age </label>
                            <input type="text" placeholder="Enter Your Dog's Age" name="age" required />
                        </div>
                        <div className="button-container">
                            <button>
                                Create Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}