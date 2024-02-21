import './Landing.css'
import {useNavigate} from 'react-router-dom'

export const LandingPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/home')
  }

  return (
    <div className="landingBody">
      <button className='landingButton' 
      onClick={onClick}
      >
        Welcome to Country App
      </button>
    </div>
  )
}
