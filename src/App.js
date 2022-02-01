import './App.css';
import Timer from "./components/Timer";
import Settings from "./components/settings/Settings";
import {useState} from "react";
import SettingsContext from "./components/settings/SettingsContext";

function App() {

  const [shSettings, setShSettings] = useState(false);
  const [workingMinutes, setWorkingMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <div className='app'>
      <SettingsContext.Provider value={{
        shSettings,
        setShSettings,
        workingMinutes,
        breakMinutes,
        setWorkingMinutes,
        setBreakMinutes,
      }}>
        {shSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
