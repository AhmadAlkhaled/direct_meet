import './Meeting_page.css';
import { useState, useEffect, useRef } from 'react';
import  { motion } from 'framer-motion';
import { Chatt } from '../chattPage/chattPage';
import Peer from "peerjs";

import { io } from "socket.io-client";



const socket = io();
const peer = new Peer();



const MeetingPage = (props) => {

    const [ camera , setCamera ] = useState(false);
    const [ mic , setMic ] = useState(false);
    const [ screen , setScreen ] = useState(false);
    const [ footer , setFooter ] = useState(false);
    const [ videoBox , setvideoBox ] = useState('');
    const [ pup , setPup ] = useState(false);
    const [ wind , setWind ] = useState('');
    const [ windH , setwindH ] = useState('');
    const [ chat , setChat ] = useState(false);
    const [ meetingLink , setMeetingLink ] = useState(true);
    const [ streamBoxWidth , setStreamBoxWidth ] = useState('100%');
    const [ videoBoxWidth , setSvideoBoxWidth ] = useState('50%');
    const [ userInfo, setUserInfo ] = useState ('');
    const [ loginOn ,setLoginOn ] = useState(false);
    const [ id ,setId ] = useState ('')
    const [ room ,setRoom ] = useState ('');
    const [ users ,setUsers] = useState ([]);
    const [ usersList ,setUsersList ] = useState (false);
    const [ massagesLingth ,setMassagesLingth ] = useState (0);

    
    const videoRef = useRef ();
    const screenRef = useRef ();    
    const audioRef = useRef ();
    const peers = {}

  
 
    const tok = localStorage.getItem('token')
    
    useEffect(()=>{
      if(tok == 'null')
      {
        setLoginOn(false);
      }
      else{
        setLoginOn(true);
      }
    
    },[tok])

   

    useEffect(()=>{
       setTimeout (()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        setUserInfo(user);
        },1500)
        const roomid = document.location.href.substring(29,1000)

        peer.on('open', id => {
            console.log(id);
            socket.emit('join-room', roomid, id,userInfo.username)
           
        });

      
        socket.on('user-disconnected', (userId,username) => {
            console.log('user-disconnected '+ username);
           const x = users.map(user => {
                if(user != {userId:userId,username:username} )
                {
                    return user
                }
            })
            console.log(x);
        })

    },[]);

  
    const  screenOn = ()=>{
      
        navigator.mediaDevices.getDisplayMedia ({ video:true,audio:true })
        .then((stream)=>{ 
            setScreen(true);
            screenRef.current.srcObject = stream;
            const x1 = document.querySelector('.home_main');
            if( x1.clientWidth < 600  )
            {
                setStreamBoxWidth('100%');
                setSvideoBoxWidth('50%');
    
            }else {
                setStreamBoxWidth('20%');
                setSvideoBoxWidth('100%');
            }
            const x = document.querySelector('.videoBox');
            setvideoBox((x.clientWidth)/100*71.5)
        });
       
    }

    const  screenStop = ()=>{
        setScreen(false);
        const tracks = screenRef.current.srcObject.getTracks();
        tracks.forEach((track) =>{
            if(track.kind === 'audio')
            {
                track.stop();
            }
            if(track.kind === 'video')
            {
                track.stop();

            }
           setStreamBoxWidth('100%');
           const x1 = document.querySelector('.home_main');
            if(x1.clientWidth < 600)
            {
                setSvideoBoxWidth('100%');
            }else{
                setSvideoBoxWidth('50%');
            }
        });
    }
    const cameraOn = () => { 
        navigator.mediaDevices.getUserMedia({ video:{ width:'100%'} })
        .then((stream)=>{ setCamera(true); videoRef.current.srcObject = stream });
    }
    const  videoStop = ()=>{
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) =>{
            if(track.kind === 'video')
            {
                track.stop();
            }});
    }
    const audioOn = () => { 
        setMic(true);
        navigator.mediaDevices.getUserMedia({ audio:true })
        .then((stream)=>{ audioRef.current.srcObject = stream});
    }
   
    const  audioStop = ()=>{
        const tracks = audioRef.current.srcObject.getTracks();
        tracks.forEach((track) =>{
            if(track.kind === 'audio')
            {
                track.stop();
            }});
    }
    window.addEventListener("resize", ()=>{
        const x = document.querySelector('.videoBox');
        setvideoBox((x.clientWidth)/100*71.5);
        setWind(x.clientWidth);
        const x1 = document.querySelector('.home_main')
        setwindH(x1.clientHeight);

        if( x1.clientWidth < 600  )
        {
            setStreamBoxWidth('100%');
            
            if(screen)
            {
                setSvideoBoxWidth('50%');
            }else{
                setStreamBoxWidth('100%');
                setSvideoBoxWidth('100%');
            }

        }else {
            
            if(screen)
            {
                setStreamBoxWidth('20%');
                setSvideoBoxWidth('100%');
            }else{
                setStreamBoxWidth('100%');
                setSvideoBoxWidth('50%');
            }
        }
        setvideoBox((x.clientWidth)/100*71.5)

    });
    useEffect(()=>{
        const x = document.querySelector('.videoBox')
        setvideoBox((x.clientWidth)/100*71.5)
    })
  
    useEffect(()=>{
        const x1 = document.querySelector('.home_main')
        setwindH(x1.clientHeight);
      
        if(x1.clientWidth < 600)
        {
            setSvideoBoxWidth('100%');
        }else{
            setSvideoBoxWidth('50%');
        }
    },[screen])

    return (
        <div className="meeting_page" 
            onClick={ ()=>{
                if(screen || x1.clientWidth < 600 )
                {
                    (footer)?
                    setFooter(false)
                    :setFooter(true);
                }
           
            }}
            onMouseMove={(e)=>{ 
                if(screen)
                {
                    if(  e.clientY > windH-100  )
                    {
                        setFooter(true);
                    }
                    if(  e.clientY < windH-290  )
                    {
                        setFooter(false);
                    }

                }else{
                    setFooter(true);
                }
               
            }}>
             
             {
                 (usersList)?
                 <div className="UsersList" >
                     <ul>
                         {
                             users.map((user)=>{
                                 return (
                                     <li>{user.username}</li>
                                 )
                             })
                         }
                     </ul>
                 </div>
                 :''
             }
                 
           
           {
               (meetingLink)?
               <div className="meetingLink" > 
               <i class="fa-solid fa-xmark" title='exit' onClick={()=>{ setMeetingLink(false) }} ></i>
               <i class="fa-regular fa-clone" title='copy link' ></i>
               <p> Meeting Link </p>
               http://localhost:3000/Meeting
               
               </div>
               :''
           }
               
                {
                    (screen)?
                    <div className="screenBox" >
                    <video className='videoScreen' ref={screenRef} autoPlay ></video>
                    </div>
                    :null
                }
            

            <div className="streamBox" style={{ width: streamBoxWidth }} >

                <div className="videoBox" style={{width:videoBoxWidth }} >
                    {
                        (camera)?
                        <video className='video' ref={videoRef} autoPlay ></video>
                        :
                        <div className="videoStopBox" style={{height:videoBox}} ><div className="videoStopBoxA"
                        style={{ backgroundImage:`url(${userInfo.img}`}} 
                        >
                            {
                                (userInfo.img) ?
                                null
                                :
                                (userInfo != '' && userInfo != 'null') ? 
                                userInfo.username.charAt(0).toUpperCase():null
                            }
                            </div></div>
                    }
                    <audio ref={audioRef} autoPlay  ></audio>
                    <div className="videoUserName"> 
                    {
                        (userInfo.username != null)?

                        userInfo.username.toUpperCase()
                        :
                        null
                    }   
                    {
                        (mic)?null:<i className="fa-solid fa-microphone-slash" ></i> 
                    }
                    </div>
                </div>
         
            </div>

           <Chatt chat={chat} setChat={setChat} id={id} massagesLingth={massagesLingth} room={room} setMassagesLingth={setMassagesLingth}  />
       
            <motion.div className="footer"
                animate={{y: (footer)?0 : '73px' }}
                transition={{ duration:0.5 }}
             
            >

                {
                    (camera)?
                    <i className="fa-solid fa-video" onClick={()=>{ videoStop(); setCamera(false) }}  ></i>
                    :
                    <i className="fa-solid fa-video-slash" style={{ backgroundColor:'#f15454'}} onClick={()=>{ cameraOn();  }} ></i>
                }
                
                {
                    (mic)?
                    <i className="fa-solid fa-microphone" onClick={()=>{ audioStop(); setMic(false) }} ></i>
                    :
                    <i className="fa-solid fa-microphone-slash" style={{ backgroundColor:'#f15454'}} onClick={()=>{ audioOn(); }} ></i>
                }
                {
                    (screen)?
                    <i class="fa-solid fa-xmark" title='stop screen sharing' onClick={()=>{screenStop()}}></i>
                    :<i className="fa-solid fa-display" title='screen sharing' onClick={()=>{ screenOn()}}></i>

                }
                
                <i className="fa-solid fa-ellipsis-vertical"
                    onClick={()=>{
                       (pup)?
                       setPup(false)
                       :
                       setPup(true);
                    }}
                ></i>
              
                {
                    (pup)?
                    <div className="pup" 
                        onMouseOut={()=>{
                            if(screen)
                            {
                                setFooter(false);
                            }
                        }}
                        onMouseMove={()=>{
                            if(screen)
                            {
                                setFooter(true);
                            }
                        }}
                    >
                         <i class="fa-solid fa-link" onClick={()=>{ 
                             (meetingLink)?setMeetingLink(false)
                             :setMeetingLink(true)
                              
                             }} > <snap>Meeting Link </snap></i>
                          <i class="fa-solid fa-users" onClick={()=>{
                              (usersList)? setUsersList(false):setUsersList(true)
                              
                          }}> <snap>User List</snap>  </i>
                          <i class="fa-solid fa-person-booth"><snap>Rooms</snap></i>
                          <i class="fa-solid fa-person-shelter"> <snap>Create Rooms</snap>  </i>
                          <i class="fa-solid fa-arrow-right-from-bracket"
                          onClick={()=>{
                               window.open('http://localhost:3000/',{target:'_self'})
                                
                          }}
                          > <snap>Close Meeting  </snap> </i>
                        
                    </div>
                    :null
                }
                <i className="fa-solid fa-comment-dots" 
                onClick={()=>{
                    (chat)?
                    setChat(false):
                    setChat(true);
                }} 
                ></i>
                {
                    (massagesLingth >= 1)?
                    (chat)?
                    setMassagesLingth(0)
                    :
                    <p className='massagesNum' >{massagesLingth}</p>
                    :''
                }
                
                
            </motion.div>
           
        </div>
    )
}

export { MeetingPage , peer , socket}