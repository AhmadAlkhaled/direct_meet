import './test_Media.css';
import { useState , useRef } from 'react';

const Test = (props) => { 
    const [ mic , setMic ] = useState(false);
    const [  stream, setStream ] = useState(false);

    const audio = useRef();
    const video = useRef();

    const first = async(second) => { 
        try {
            
            const stream = await  navigator.mediaDevices.getUserMedia({ video:{ width:'100%'} });
            video.current.srcObject = stream ;
           } catch(error) {
            setStream(true);
           }
     }
     first()

    if(mic)
    {
        navigator.mediaDevices.getUserMedia({ audio:true })
        .then((stream)=>{ 
            audio.current.srcObject = stream ;
        });
    }else{
       setTimeout(() => {
        const x =  document.getElementById('audio')
        x.pause();
       }, 100);
    }
    
    return(
        <div className='Test_Media' >
            {/* <h2 > Test your Media </h2> */}
            <button className='MeetingButton' onClick={()=>{
              const x = video.current.srcObject.getTracks();
              x.forEach(((track)=>{
                if(track.kind ==  'video')
                {
                    track.stop();
                }
              }))
              
                props.setTestPage(false) 
                }} > Meeting </button>
            <div className='MediaBox' > 
           
            {
                (stream)?
               <p className='w' > Can't reach the Camera </p>
                : <video  className='video' ref={video}   autoPlay ></video>

            }
            {
                (mic)?
                <i className="fa-solid fa-microphone" onClick={()=>{  setMic(false) }} ></i>
                :
                <i className="fa-solid fa-microphone-slash" style={{ backgroundColor:'#f15454'}} onClick={()=>{ setMic(true)  }} ></i>
            }
            <audio  id='audio' ref={audio} autoPlay  ></audio>
            </div>
        </div>
    )

 }
 export{ Test }