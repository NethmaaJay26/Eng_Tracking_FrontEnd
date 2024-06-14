import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BannerHome.css'
import pointImage1 from '../Assets/bell_icon.png'
import pointImage2 from '../Assets/bell_icon.png'
import pointImage3 from '../Assets/bell_icon.png'
import pointImage4 from '../Assets/bell_icon.png'

const Banner = () => {
  const navigate = useNavigate();

  const ClickTea = () => {
    navigate('/Trainings');
  }

  return (
    <div className='banner'>
      <div className="points-container">
        <div className="point">
          <img src={pointImage1} alt="Point 1" />
          <h3>Practical and Technical
          engineering knowledge</h3>
          <p>Our advanced spyware detection engine can identify if a device contains spyware or bugging software.</p>
        </div>
        <div className="point">
          <img src={pointImage2} alt="Point 2" />
          <h3>Managerial Involvement </h3>
          <p>Our advanced spyware detection engine can identify if a device contains spyware or bugging software.</p>
        </div>
        <div className="point">
          <img src={pointImage3} alt="Point 3" />
          <h3>Interpersonal skills</h3>
          <p>Our advanced spyware detection engine can identify if a device contains spyware or bugging software.</p>
        </div>
        <div className="point">
          <img src={pointImage4} alt="Point 4" />
          <h3>Professional conduct</h3>
          <p>Our advanced spyware detection engine can identify if a device contains spyware or bugging software.</p>
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={ClickTea}>Explore New Products</button>
        <button onClick={() => navigate('/another-page')}>Another Button</button>
      </div>
    </div>
  )
}

export default Banner
