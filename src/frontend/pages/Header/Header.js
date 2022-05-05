
import './Header.css'
import logo from '../../images/Logo.png';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit_Profile } from "../Edit-Profile/Edit-Profile"
import { useNavigate } from 'react-router-dom';


const Header = ()=> {

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [userInfo,setUserInfo] = useState('');
    const [ imgFile , setImgFile ] = useState ('');
    const [ imgSrc ,setImgSrc ] = useState ('');
    const [ ShadowColor , setShadowColor ]= useState ('blue');
    const [profilePic,setProfilePic] = useState(false);
    const [uploadFile,setUploadFile] = useState('');


    const navigate = useNavigate();

    useEffect(()=>{
        
    },[uploadFile])

    useEffect(()=>{
      const user = JSON.parse( localStorage.getItem('user'));
      console.log(user);
      if(user == 'null')
    {
        setUserInfo('');
    }else{
        setUserInfo(user);
    }},[])

    
    const imgUpload = () => {

        const x = document.querySelector('.upload_pic');
        if(x != null  )
        {
            x.addEventListener('change',(e)=>{
                const openFile = function(file) {
                    const input = file.target;
                    
                    const reader = new FileReader();
                    reader.onload = function(){
                    const dataURL = reader.result;
                    setImgSrc(dataURL)
                    
                    
                    const data = {confirmEmail:userInfo.email ,  buffer:dataURL, originalname:x.files[0].name , mimetype:x.files[0].type  }
                    };
                    reader.readAsDataURL(input.files[0]);
              };
              openFile(e)

            })

        }
     
    }




    return (
        <>
        <div className="Header_main"
        // style={{ boxShadow: ` 0px 0px 30px 3px ${ShadowColor} `}}
        >
            
                <div className="logo">
                    <img src={logo}></img>
                </div>
                <div className="user_profile"
                style={{ backgroundImage:`url(${imgSrc})`}}
                    onClick={()=> {
                        (open)? setOpen(false): setOpen(true);
                        }}> 
                        {
                            ( imgSrc == null || imgSrc == '' )?
                              (userInfo != '' && userInfo != 'null' )?userInfo.username.charAt(0).toUpperCase()
                            :''  
                            :
                            ''
                        }
                       
                            </div>
        </div>

        <motion.div className="profile_window"
            initial={{x:0}}
            animate={{x:(open)? '-450px' : 0}}
            transition={{duration:1}} 
        >
                
            {
                (edit) ?
                <Edit_Profile userInfo={userInfo} setEdit={setEdit}/>
                :
                <>
                <h2>Profile</h2> 
                <div className="user_profile_box">

                    <div className="user_profile_big"
                    style={{ backgroundImage:`url(${imgSrc})`}}
                    onMouseOver={(e)=>{
                        setProfilePic(true);
                        imgUpload()
                    }}
                    onMouseLeave={()=>{
                        setProfilePic(false);
                    }}
                    >
                        {
                            ( imgSrc == null || imgSrc == '' )?
                              (userInfo != '' && userInfo != 'null' )?userInfo.username.charAt(0).toUpperCase()
                            :''  
                            :
                            ''
                        }
                        
                    {
                        (profilePic) ?
                        <>
                        
                        
                        <input type='file' title=''  name="testImage" accept=".jpg, .jpeg, .png" multiple className="upload_pic"
                        
                        />
                                
                              
                        
                        <div className="user_profile_two">
                            <i class="fas fa-camera"></i>
                            Change <br/> Profile <br/> Picture
                        </div>
                       
                        
                        </>
                        :
                        null
                    }
                    </div>
                    
                </div>

                <div className="user_profile_info_box">
                    <p className="user_profile_name">
                        { (userInfo != '' && userInfo != 'null')? userInfo.username :'' }
                        </p>
                    <p className="user_profile_email">
                        { (userInfo != '' && userInfo != 'null')? userInfo.email : '' }
                        </p>
                    <button class="btn-edit_profile"
                    onClick={()=>{
                        setEdit(true)
                    }}
                    >Edit profile</button>
                    <button class="btn-settings">Setting</button>
                </div>

                <div className="profile_line"></div>

                <h3 onClick={()=>{  }} >Logout</h3>
          </>

            }
            
            

        </motion.div>
        </>
        
    )
}

export { Header }