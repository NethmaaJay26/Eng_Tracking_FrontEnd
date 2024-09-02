import React, { useState, useEffect } from 'react';
import './CSS/Engprofile.css';


function Engprofile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: '',
        password: '',
        dob: '',
    });

    const [newPassword, setNewPassword] = useState('');
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    




    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const name = localStorage.getItem('name');
        const address = localStorage.getItem('address');
        // Ensure default values
        setUserData({
          name: name || '',
          email: email || '',
          address: address || '',
          password: password || '', // Assuming password is handled securely and not stored
          dob: '', // Retrieve DOB if available
        });
      }, []);
      

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };


    //handle password change

    const handlePasswordChange = async () => {
        if (!newPassword) {
            alert('Please enter a new password.');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            // Update the password in the backend
            const response = await fetch(`http://localhost:4000/api/engineers/updatePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ password: newPassword }),
            })

            if (response.ok) {
                console.log('Password updated successfully');
                setUserData((prevState) => ({
                    ...prevState,
                    password: newPassword,
                }));
                setIsEditingPassword(false);
                setNewPassword('');
            } else {
                throw new Error('Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };



    return (
        <div className="profile-update-container">
            <h1>{userData.name}</h1>
            <div className="profile-update-form">
                <h2>Update Profile</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={userData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={isEditingPassword ? newPassword : userData.password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={!isEditingPassword}
                        />
                          <button
                            type="button"
                            className="edit-password-btn"
                            onClick={() => setIsEditingPassword(!isEditingPassword)}
                        >
                            {isEditingPassword ? 'Cancel' : 'Edit Password'}
                        </button>
                        {isEditingPassword && (
                            <button
                                type="button"
                                className="save-password-btn"
                                onClick={handlePasswordChange}
                            >
                                Save Password
                            </button>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">DOB</label>
                        <input
                            type="text"
                            id="dob"
                            placeholder="mm/dd/yyyy"
                            value={userData.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="next-step-btn">Next Step ►</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Engprofile;
