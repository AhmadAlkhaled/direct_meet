import './Home.css'
import { Header } from '../Header/Header';
import { useState , useEffect} from 'react';
import { MeetingPage } from '../Meeting_Page/Meeting_Page';
import { BrowserRouter , Route , Routes ,Link ,useNavigate } from 'react-router-dom';
import { uuid } from 'uuidv4'


const Home = ()=>{

  
    const [ aboutText,setAboutText ] = useState (false);
    const [ meetingId , setMeetingId  ] = useState ('');
    const [ join,setJoin ] = useState (true);
    const [ startMeeting,setStartMeeting ] = useState (false);
    const [ id , setID ] = useState (uuid());

    const navigate = useNavigate();
  
 
  

    return (
        <>
        
        <div className="home_main">
        
        <Header />

        <Routes>
            <Route path={`/Meeting${id}`} element={ <MeetingPage id={id} navigate={navigate} setStartMeeting={setStartMeeting} /> } ></Route>
        </Routes>
       
      

        {
            (startMeeting)?
''
            :
            <div className="home_second">

            <div className="home_form">
            {
                (aboutText) ?
                <>
                    <i class="fas fa-angle-left"
                    onClick={()=>{
                        setAboutText(false)
                    }}></i>
                    <p className="home_p_text">Hallo there how are you we are a team from GErmany and we work together in this project, we will be happy if you sponsor us with our project, and we Wish that you enjoy our Applecation.
                    </p>
                </>
                :
                <>
                    <h1>Direct Meet</h1>
                    <p className="home_p_text">Video Chat services allow people to have face-to-face conversations.<br/>
                    And often it is more efficient than talking by screen sharing and more.
                    </p>
                    <div className="home_inputs">
                        <input type="text" name="id" value={meetingId} placeholder="Meeting ID"
                        onChange={(e)=>{
                            setMeetingId(e.target.value);
                            if(e.target.value === '')
                             {
                                setJoin(true);
                             }else{
                                setJoin(false);
                             }

                        }}
                        />
                        {
                            (join)?
                            <button type="submit" name="start" 
                            onClick={()=>{ 
                                setStartMeeting(true)
                                navigate(`/Meeting${id}`);
                               
                            }}
                             >+ Start new meeting</button>
                            :<button type="submit" name="start"
                            onClick={ ()=>{ 
                                setID(meetingId)
                                
                                setTimeout (()=>{
                                    navigate(`/Meeting${meetingId}`);
                                },500)
                            }}
                           
                              >+ join</button>
                        }
                        
                        
                    </div>
                </>
            }
                <div className="home_line"></div>
                <br />
                <p className="home_p_footer"> Direct Meet&nbsp;<span className="more_about"
                onClick={()=>{
                    setAboutText(true)
                }}
                >More About</span> </p>

            </div>

        </div> 


        }
           
           

        </div>
        </>
    )
}

export { Home }