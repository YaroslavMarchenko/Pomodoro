import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./buttons/PlayButton";
import PauseButton from "./buttons/PauseButton";
import SettingsButton from "./buttons/SettingsButton";
import {useContext, useState, useEffect, useRef} from "react";
import SettingsContext from "./settings/SettingsContext";

function Timer() {
  const info = useContext(SettingsContext);

  const [paused, setPaused] = useState(true);
  const [mode, setMode] = useState('working');
  const [secLeft, setSecLeft] = useState(0);

  const secLeftRef = useRef(secLeft);
  const pausedRef = useRef(paused);
  const modeRef = useRef(mode);

  function tick() {
    secLeftRef.current--;
    setSecLeft(secLeftRef.current);
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeRef.current === 'working' ? 'break' : 'working';
      const nextSeconds = (nextMode === 'working' ? info.workingMinutes : info.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecLeft(nextSeconds);
      secLeftRef.current = nextSeconds;
    }

    secLeftRef.current = info.workingMinutes * 60;
    setSecLeft(secLeftRef.current);

    const interval = setInterval(() => {
      if (pausedRef.current) {
        return;
      }
      if (secLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    },1000);

    return () => clearInterval(interval);
  }, [info]);

  const totalSeconds = mode === 'working'
    ? info.workMinutes * 60
    : info.breakMinutes * 60;
  const percentage = Math.round(secLeft / totalSeconds * 100);

  const minutes = Math.floor(secLeft / 60);
  let seconds = secLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ':' + seconds}
        styles={buildStyles({
        textColor:'#fff',
        pathColor:mode === 'working' ? '#B11B1B' : '#1BA61A',
        tailColor:'#CDCFCD',
      })} />
      <div style={{marginTop:'25px'}}>
        {paused
          ? <PlayButton onClick={() => { setPaused(false); pausedRef.current = false; }} />
          : <PauseButton onClick={() => { setPaused(true); pausedRef.current = true; }} />}
      </div>
      <div style={{marginTop:'25px'}}>
        <SettingsButton onClick={() => info.setShSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;