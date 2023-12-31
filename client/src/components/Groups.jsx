import logo from '../images/live-chat.png'
import { IconButton,Alert,Stack  } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { motion,AnimatePresence,} from "framer-motion"
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { refreshSidebarFun } from '../redux/refreshSideBarSlice.js';

function Groups() {
    const { currentUser } = useSelector((state) => state.userKey)
    const [groups, setGroups] = useState([]);
      const [alert, setAlert] = useState({ success: false, message: '' });
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('/api/chat/fetchGroups')
                setGroups(response.data)
                
            } catch (error) {
                console.log(error);
          }
        }
        fetchGroups();
    }, [])
const handleAddSelfToGroup = async (chatId) => {
  try {
   const response = await axios.put('/api/chat/addSelfToGroup', {
      chatId: chatId,
      userId: currentUser._id
   });
    setAlert({ success: response.data.success, message: response.data.message });
      dispatch(refreshSidebarFun())
  } catch (error) {
    console.error(error);
  }
}

    return (
      <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0 }}
             animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} transition={{ease:"anticipate",duration:"0.3"}}   className={`border flex flex-col flex-7`}>
          <div className='p-2 mt-3 mx-3 rounded-2xl bg-slate-50 dark:bg-slate-500 flex items-center shadow-lg  text-center'>
              <img src={logo} alt="Logo" className='w-10 h-10'/>
              <p className='text-lg font-bold ml-2 pl-2'>All Groups</p>
          </div>
          <div className='p-3 m-3 rounded-2xl bg-white dark:bg-slate-500 flex justify-between items-center shadow-xl'>
              <IconButton>
                  <SearchIcon/>
              </IconButton>
              <input type="text" placeholder='Search' className='border-none outline-none text-lg flex-grow ml-3 dark:bg-slate-500'/>
                </div>
            <Stack sx={{ width: '100%' }} spacing={2}>
                      {alert.message && <Alert severity={alert.success ? "success" : "error"}>{alert.message}</Alert>}
             </Stack>
                <div className='p-3 m-4 rounded-2xl flex flex-col space-y-4 overflow-y-auto no-scrollbar'>
             {groups.map((group, index) => (
                 <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }} className='flex items-center bg-white space-x-4 p-2 rounded-xl shadow-xl hover:bg-gray-200  dark:hover:bg-gray-700 cursor-pointer' onClick={() =>  {
                     handleAddSelfToGroup(group._id)
            }}>
              <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center'>
                <p>{group.chatName[0].toUpperCase()}</p>
              </div>
              <p>{group.chatName}</p>
            </motion.div>
          ))}
          </div>
            </motion.div>
        </AnimatePresence>
        
      
  )
}

export default Groups;
