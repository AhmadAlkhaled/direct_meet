import './Home.css'
import { Header } from '../Header/Header';
import { useState , useEffect} from 'react';
import { MeetingPage } from '../Meeting_Page/Meeting_Page';
import { BrowserRouter , Route , Routes ,Link ,useNavigate } from 'react-router-dom';
import { uuid } from 'uuidv4';








const Home = ()=>{

    const [ aboutText,setAboutText ] = useState (false);
    const [ meetingId , setMeetingId  ] = useState ('');
    const [ join,setJoin ] = useState (true);
    const [ startMeeting,setStartMeeting ] = useState (false);
    const [ href,setHref ] = useState ('');
   
    const navigate = useNavigate();

    return (
        <>
        <div className="home_main">
        <Header />
        <MeetingPage/>
        </div>
        </>
    )
}

export { Home }