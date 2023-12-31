import React, { useEffect, useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';
import ConversationItem from './ConversationItem';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { signOut } from '../redux/userSlice';
import axios from 'axios';

export default function Sidebar() {
    const [conversations, setConversations] = useState([])
    const refreshSideBar = useSelector((state) => state.sideBarKey);
    const currentTheme = useSelector((state) => state.themeKey);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('/api/chat/getChats')
                setConversations(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchChats()
    },[refreshSideBar])

  return (
      <div className={`border flex flex-col flex-3  rounded-tl-3xl rounded-bl-3xl ${currentTheme ? 'dark' : ''}`}>
          <div className='p-1 m-4 rounded-2xl bg-slate-50 dark:bg-slate-500 flex justify-between shadow-lg'>
              <div>
              <IconButton onClick={()=>{navigate('welcome')}}>
              <AccountCircleIcon/>
              </IconButton>   
              </div>
              
              <div>
              <IconButton onClick={()=>{navigate('users')}}>
              <PersonAddIcon/>
              </IconButton>
              <IconButton  onClick={()=>{navigate('groups')}}>
              <GroupAddIcon/>
              </IconButton>
              <IconButton  onClick={()=>{navigate('create-group')}}>
              <AddCircleIcon/>
              </IconButton>
                  <IconButton onClick={()=>dispatch(toggleTheme())}>
{/* when called, will call setDarkMode with the opposite of the current darkMode value */}
                      {currentTheme && <WbSunnyIcon/>}
                      {!currentTheme && <DarkModeIcon/>}
                  </IconButton>  
                  <IconButton onClick={() => { dispatch(signOut()); navigate('/')}}>
                      <ExitToAppIcon/>
              </IconButton>    
              </div>
              
          </div>
         
          <div className='p-3 mx-4 rounded-2xl bg-white dark:bg-slate-500 flex items-center shadow-lg'>
              <IconButton>
                 <SearchIcon/>
              </IconButton>
             <input type="text" placeholder='Search' className='outline-none border-none text-lg ml-3 dark:bg-slate-500'/>
         
          </div>
          <div className='p-3 m-4 rounded-2xl bg-white dark:bg-slate-500 flex-1 shadow-lg overflow-y-auto no-scrollbar'>
              {conversations.map((conversation,index) => {
                   return <ConversationItem conversation={conversation} key={index}/>
              })}
          </div>
      </div>
  )
}
