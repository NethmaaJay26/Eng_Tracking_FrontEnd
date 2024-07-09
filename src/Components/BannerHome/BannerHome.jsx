import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BannerHome.css'


const Banner = () => {
  const navigate = useNavigate();

  const ClickThis = () => {
    navigate('/Trainings');
  }

  return(
    <div>
      <div>
        <button>admin login</button>
      </div>


      <div>
        <button>trainee engineer login</button>
      </div>

      <div>
        <button>charted engineer</button>
      </div>
      



    </div>
  )
}

export default Banner
