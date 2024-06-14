import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BannerHome.css'
import pointImage1 from '../../Assets/bell_icon.png' // Add your point images here
import pointImage2 from '../../Assets/bell_icon.png'
import pointImage3 from '../../Assets/bell_icon.png'
import pointImage4 from '../../Assets/bell_icon.png'


const Banner = () => {
  const navigate = useNavigate();

  const ClickTea = () => {
    navigate('/Trainings');
  }

  return (
    <div className='banner'>
      <h2>Fresh Arrivals Just for You</h2>
      <div className="points-container">
        <div className="point">
          <img src={pointImage1} alt="Point 1" />
          <h3>Title 1</h3>
          <p>Description for point 1</p>
        </div>
        <div className="point">
          <img src={pointImage2} alt="Point 2" />
          <h3>Title 2</h3>
          <p>Description for point 2</p>
        </div>
        <div className="point">
          <img src={pointImage3} alt="Point 3" />
          <h3>Title 3</h3>
          <p>Description for point 3</p>
        </div>
        <div className="point">
          <img src={pointImage4} alt="Point 4" />
          <h3>Title 4</h3>
          <p>Description for point 4</p>
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
