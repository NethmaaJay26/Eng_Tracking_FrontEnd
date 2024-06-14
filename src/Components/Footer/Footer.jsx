import React from 'react'
import './Footer.css'


export const Footer = () => {
  return (
    <div className="footer">
        
        <ul className='footer-links'>
            <li>Feature</li>
            <li>Terms and Privacy</li>
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
        <div className="logoname">
            <h1>Engineering</h1>
            <h1>ProTrack</h1>
        </div>
        <hr />
        
        <div className="footer-copyright">

            <p>Copyright @ 2024 - All rights reserved</p>
        </div>


    </div>
  )
}
export default Footer