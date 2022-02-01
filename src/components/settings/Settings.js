import ReactSlider from 'react-slider';
import './slider.css'
import SettingsContext from "./SettingsContext";
import {useContext} from "react";
import BackButton from "../buttons/BackButton";


function Settings() {
  const info = useContext(SettingsContext);
  return(
    <div style={{textAlign:'left'}}>
      <label>work: {info.workingMinutes}:00</label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={info.workMinutes}
        onChange={newValue => info.setWorkingMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break: {info.breakMinutes}:00</label>
      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={info.breakMinutes}
        onChange={newValue => info.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div style={{textAlign:'center', marginTop:'25px'}}>
        <BackButton onClick={() => info.setShSettings(false)} />
      </div>

    </div>
  );
}

export default Settings;