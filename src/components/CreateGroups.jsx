import React, { useContext } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
import { DarkModeContext } from './DarkModeContext';

function CreateGroups() {
    const {darkMode,setDarkMode} = useContext(DarkModeContext)
  return (
      <div className={`flex flex-7 flex-col border justify-center ${darkMode ? 'dark':""}`}>
          <div className='p-1 m-3 rounded-xl bg-white flex dark:bg-slate-500 justify-between shadow-lg'>
              <div className='flex items-center mx-2 w-full'>
                 <input type="text" placeholder='Enter Group Name' className='border-none outline-none text-lg flex-grow m-3 dark:bg-slate-500'/>
                 <IconButton>
                  <DoneIcon/>
                  </IconButton>
              </div>
          </div>
      </div>
  )
}

export default CreateGroups