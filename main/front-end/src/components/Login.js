import React from 'react';

export class Login extends React.Component {
    render() {
        const inputBoxStyle = { border: '2px', 
                                borderColor: '#E5737D',

                              }
        return (
            <div>
                <h1 className="">Pet My Dog</h1>
                <div className="form">
                    <form>
                    <div className="input-container">
                        <label> Username </label>
                        <input style={ inputBoxStyle } type="text" placeholder="UserName" name="uname" required />
                    </div>
                    <div className="input-container">
                        <label> Password </label>
                        <input type="password" placeholder="Password" name="pass" required />
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                        <input type="submit" />
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}