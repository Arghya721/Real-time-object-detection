import './App.css';
import Video from './Components/video';
import { useSpeechSynthesis } from 'react-speech-kit';

import {useEffect, useState} from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";


function App() {
  const [video, setVideo] = useState(0);

  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();

  SpeechRecognition.startListening({ continuous: true , language:'en-IN' });
  
  const commands = [
    {
      command: ["Start", "Start the process"],
      callback: () => {
        speak({text : "Starting the process"});
        setVideo(1);
        SpeechRecognition.startListening({ continuous: true , language:'en-IN' });
      }
    },
    {
      command: ["Stop", "Stop the process"],
      callback: () => {
        speak({text : "Stopping the process"});
        setVideo(0);
        SpeechRecognition.startListening({ continuous: true , language:'en-IN' });
      }
    }
  ];

  const { transcript, resetTranscript , listening } = useSpeechRecognition({ commands });
  

  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }


  return (
    <div className="App">
      
      <button onClick={()=>{
        {video === 0 ? setVideo(1) : setVideo(0)}
      }}>
        {video === 1 ? "Stop Detection" :  "Start Detection"}
      </button>
      {video === 1 ? <Video /> : ""}

      <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
      
    </div>
  );
}

export default App;
