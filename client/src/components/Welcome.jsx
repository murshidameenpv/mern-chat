import React from 'react'
import logo from '../images/live-chat.png'
import{useSelector} from 'react-redux'
function Welcome() {
  const { currentUser } = useSelector((state) => state.userKey)
  return (
      <div className='flex flex-7 flex-col items-center justify-center gap-1 h-full'>
          <img src={logo} alt="Logo" className='mb-'/>
      <p className='text-center font-light text-gray-500'>Hii {currentUser.name} 	&#9829;</p>
          <p className='text-center font-semibold text-gray-500'>View and text directly to people in the chat rooms present</p>
      </div>
  )
}

export default Welcome
