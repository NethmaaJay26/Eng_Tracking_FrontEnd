import React from 'react';
import './CSS/Engprofile.css';

function Engprofile() {
    return (
        <div className="profile-update-container">
            <h1>Eng.Perera A.B.C</h1>
            <div className="profile-update-form">
                <h2>Update Profile </h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value="Perera A.B.C" />
                    </div>

                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" /> Newly Recruited Engineers
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked /> Experienced Engineers
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" value="Perera123@gmail.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">DOB</label>
                        <input type="text" id="dob" placeholder="mm/dd/yyyy" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value="********" />
                        <button className="edit-password-btn">Edit Password</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cv-attachment">CV attachment</label>
                        <input type="checkbox" id="cv-attachment" />
                    </div>

                    <div className="profile-pic">
                        <img src="profile-picture.png" alt="Profile" />
                        <button className="edit-pic-btn">Edit Pro.Picture</button>
                    </div>

                    <div className="form-footer">
                        <button type="button" className="next-step-btn">Next Step ►</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Engprofile;
