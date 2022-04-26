import React from 'react';

export class Login extends React.Component {
    render() {
        return (
            <div>
                <h1 className="">Pet My Dog</h1>
                <div className="form">
                    <form>
                    <div className="input-container">
                            <label id="u-label"> Username </label>
                            <input type="text" id="u-frame"placeholder="UserName" name="uname" required />
                            {/* {renderErrorMessage("uname")} */}
                    </div>
                    <div className="input-container">
                        <label> Password </label>
                        <input type="password" placeholder="Password" name="pass" required />
                        {/* {renderErrorMessage("pass")} */}
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}