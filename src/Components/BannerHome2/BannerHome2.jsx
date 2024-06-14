import React from 'react'
import './BannerHome2.css'
import pointImage1 from '../Assets/bell_icon.png'
import pointImage2 from '../Assets/bell_icon.png'
import pointImage3 from '../Assets/bell_icon.png'
import pointImage4 from '../Assets/bell_icon.png'
import pointImage5 from '../Assets/bell_icon.png'
import homebanner2 from '../Assets/homebanner2.png'



const Banner = () => {

  
  return (
    <div className='banner2'>
      <div className="banner-top">
        <h2>Exploring Our Platform</h2>
        <p>Training planning, recording and evaluation system for Engineers</p>
        <hr />
        <div className="banner2-points-container">
          <div className="point">
          <img src={pointImage1} alt="Point 1" />
          <p>Focused on delivering training modules aligned with five core competencies of IESL</p>
        </div>

        <div className="point">
          <img src={pointImage2} alt="Point 2" />
          <p>Visual Collaboration Platform on structured training programs</p>
        </div>

        <div className="point">
          <img src={pointImage3} alt="Point 3" />
          <p>Recruited graduate Engineers & experienced trainee engineers</p>
        </div>

        <div className="point">
          <img src={pointImage4} alt="Point 4" />
          <p>Expert Supervising Engineers </p>
        </div>

        <div className="point">
          <img src={pointImage5} alt="Point 5" />
          <p>Structured Training Programs </p>
        </div>

        <div className="point">
          <img src={pointImage5} alt="Point 5" />
          <p>Users with Technology Partners </p>
        </div>
        </div>
        
      </div>
      <div className="banner-bottom">
        <img src={homebanner2} alt="" />

      </div>
    </div>
  )
}
export default Banner