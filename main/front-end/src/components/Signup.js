import React from 'react';

export class Signup extends React.Component {
    render() {
        return (
            <div className="form">
            <form>
              <div className="input-container">
                <label> Name </label>
                <input type="text" placeholder="Enter your name" name="name" required />
              </div>
              <div className="input-container">
                <label> Email </label>
                <input type="text" placeholder="Enter your email" name="email" required />
              </div>
              <div className="input-container">
                <label> Password </label>
                <input type="text" placeholder="Enter your password" name="pass" required />
              </div>
              <div className="input-container">
                <label> Verify Password </label>
                <input type="password" placeholder="Re-enter your password" name="pass" required />
              </div>
              <div className="button-container">
                <input type="submit" />
              </div>
            </form>
          </div>
        )
    }
}