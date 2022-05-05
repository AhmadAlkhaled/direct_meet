import  { motion } from 'framer-motion';
import './chatt.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import fileDownload from 'js-file-download';
import 'emoji-picker-element';






const Chatt = (props) => { 

    const [onDragOver, setOnDragOver ] = useState (true);
    const [messages, setMessages] = useState ([]);
    const [userInfo, setUserInfo] = useState ('');
    const [emoji, setEmoji] = useState (false);
    const [ textType, setTextType ] = useState ('');
    
            const dragAndDropUpload = function(file) {
                const input = file.target;
                
                const reader = new FileReader();
                reader.onload = function(){
                const dataURL = reader.result;
                console.log(file.target.files[0]);
                const data = {
                    name: file.target.files[0].name,
                    type: file.target.files[0].type,
                    buffer: dataURL,
                }
                console.log(data.buffer);
                setMessages([...messages,data])

                };
                
                reader.readAsDataURL(input.files[0]);
            };

            const Download = (url, filename) => {
                axios.get(url, {
                  responseType: 'blob',
                })
                .then((res) => {
                  fileDownload(res.data, filename)
                })
              };


            useEffect(()=>{
                const user = JSON.parse(localStorage.getItem('user'));
                setUserInfo(user);
            },[])
            const date = new Date();
            
    return(
        <motion.div className="chatBox"
        animate={{x: (props.chat)? 0 : '700px'}}  >
            <div className="icoBox" >
            <i class="fa-solid fa-up-right-from-square"></i>
            <i class="fa-solid fa-xmark" onClick={()=>{ props.setChat(false) }} ></i>
            </div>
            <ul className="chat-list">

                {
                    
                    messages.map((e)=>{
                        return <li id="chat-li">

                            <div className="chat-profile-main">
                            <div className="chat-profile-pic"
                                style={{ backgroundImage:`url(${userInfo.img})`}
                                }>
                            </div>
                            <span className="chat-profile-name">{userInfo.username.toUpperCase()}</span>
                            <span className="chat-profile-time">{
                            `${date.getHours()} : ${date.getMinutes()}`
                            } Uhr</span>
                            </div>
                            {
                                (typeof(e) == 'string')?
                                    <p className="text-message-chat">
                                        {e}
                                    </p>
                                :
                                    <div className="file-lists">
                                    <div className="file-info" title={e.name} >
                                    {
                                        (e.name.length > 15 )?
                                        e.name.substring(0,20)+'...'
                                        :
                                        e.name
                                    } 
                                    <i class="fa-solid fa-cloud-arrow-down"
                                    onClick={()=>{
                                        Download(e.buffer, e.name);
                                    }} 
                                    ></i>
                                        </div>
                                    <embed className="main-file-lists" type={e.type} src={e.buffer}/>
                                    </div>
                            }
                        </li>
                    })
                }
            </ul>
            <div  className="chatForm" >
                <div className="up_imo_Box">
                    <i class="fa-regular fa-face-grin"
                    onClick={()=>{
                        (emoji) ? setEmoji(false) : setEmoji(true);
                    }}
                    ></i>
                    <i class="fa-solid fa-paperclip"
                    onClick={(e)=>{
                        e.target.children[0].click();
                    }}>
                        
                        <input type="file"
                            onChange={(e)=>{
                                dragAndDropUpload(e);
                                setTextType(e.target.value)

                            }}
                            onDrop={(e)=>{
                                dragAndDropUpload(e);
                            }}/> 
                    </i>
                </div>
                {
                    (emoji)?
                    <emoji-picker class="dark" 
                    onMouseOver={(e)=>{
                        e.target.addEventListener('emoji-click', event => {
                            setTextType(` ${textType} ${event.detail.unicode} `);
                        });
                    }}
                    ></emoji-picker>
                    :
                    null

                }
                
                {
                    (onDragOver)?
                    <textarea className="textarea" placeholder="Massage..." value={textType}
                    onKeyPress={(e)=>{
                        if(e.code === 'Enter')
                        {
                            e.preventDefault();
                            if(textType != '')
                            {
                                setMessages([...messages, textType])
                                setTextType('');
                                e.target.parentElement.parentElement.children[1].scrollTo(0,e.target.parentElement.parentElement.children[1].scrollHeight);
                                setEmoji(false); 
                            }

                        }
                    
                    }}
                    onChange={(e)=>{
                        setTextType(e.target.value)
                    }}
                    onDragOver={(e)=>{
                        setOnDragOver(false);
                    }}
                ></textarea>
                :
                <div className="onDragOver">
                    <input className="onDragOver-click" type="file"
                    onChange={(e)=>{
                        dragAndDropUpload(e);
                        setOnDragOver(true);
                    }}
                    onDrag={(e)=>{
                        setOnDragOver(true);
                    }}
                    onDrop={(e)=>{
                        dragAndDropUpload(e);
                        setOnDragOver(true);
                    }}
                    onDragLeave={(e)=>{
                        setOnDragOver(true);
                    }}
                    /> 
                      <p className="dragText" >Drag Your File Here...</p>
                </div>
                }
                <i class="fa-solid fa-paper-plane"
                onClick={(e)=>{
                    if(textType != '')
                    {
                        setMessages([...messages, textType])
                        setTextType('');
                        e.target.parentElement.parentElement.children[1].scrollTo(0,e.target.parentElement.parentElement.children[1].scrollHeight);
                        setEmoji(false); 
                    }
                }}
                ></i>
            </div>
        </motion.div>
    )
 }
 export { Chatt }








