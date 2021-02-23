import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import PrintApi from './api/api';
import UserContext from './auth/UserContext';

//Components
import Routes from './routes-nav/Routes';
import NavBar from './routes-nav/NavBar';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage('token');
  const [infoLoaded, setInfoLoaded] = useState(false);

  const [writerPlatformFollows, setWriterPlatformFollows] = useState();
  const [writerTagFollows, setWriterTagFollows] = useState();
  const [platformTagFollows, setPlatformTagFollows] = useState();
  const [platformWriterFollows, setPlatformWriterFollows] = useState();

  useEffect(() => {
    async function getCurrentUser() {
      if(token) {
        try {
          PrintApi.token = token;
          const { userId } = jwt.decode(token);
          let currUser = await PrintApi.getCurrentUser(userId);
          setCurrentUser(currUser);

          if(currUser.writerId !== null) {
            const wPFRes = await PrintApi.getWriterPlatformFollows(currUser.writerId);
            setWriterPlatformFollows(wPFRes);
            const wTFRes = await PrintApi.getWriterTagFollows(currUser.writerId);
            setWriterTagFollows(wTFRes);

            console.log(wPFRes);
            console.log(wTFRes);
          } else {
            const pTFRes = await PrintApi.getPlatformTagFollows(currUser.platformId);
            setPlatformTagFollows(pTFRes);
            const pWFRes = await PrintApi.getPlatformWriterFollows(currUser.platformId);
            setPlatformWriterFollows(pWFRes);
          }

        } catch (error) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    };
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function register(data) {
    try {
      let tokenResp = await PrintApi.register(data);
      setToken(tokenResp);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    };
  };

  async function login(data) {
    try {
      let tokenResp = await PrintApi.login(data);
      setToken(tokenResp);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  function logout() {
    setCurrentUser(null);
    setToken(null);
  };

  if(!infoLoaded) return <h1>Loading...</h1>

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{currentUser, setCurrentUser,
                  writerPlatformFollows, setWriterPlatformFollows,
                  platformWriterFollows, setPlatformWriterFollows,
                  writerTagFollows, setWriterTagFollows,
                  platformTagFollows, setPlatformTagFollows}}>
            <NavBar logout={logout}/>
            <Routes login={login} register={register}/>
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;