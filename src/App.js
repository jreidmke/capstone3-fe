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
  const [queries, setQueries] = useState();
  const [appMsgs, setAppMsgs] = useState();


  

  useEffect(() => {
    async function getCurrentUser() {
      if(token) {
        try {
          PrintApi.token = token;
          const { userId } = jwt.decode(token);
          let currentUser = await PrintApi.getCurrentUser(userId);
          setCurrentUser(currentUser);
          if(currentUser.writerId !== null) {
            const wPFRes = await PrintApi.getWriterPlatformFollows(currentUser.writerId);
            setWriterPlatformFollows(wPFRes);
            const wTFRes = await PrintApi.getWriterTagFollows(currentUser.writerId);
            setWriterTagFollows(wTFRes);
            const queryRes = await PrintApi.getQueriesByWriterId(currentUser.writerId);
            setQueries(queryRes);
            const appMsgRes = await PrintApi.getApplicationMessagesByWriterId(currentUser.writerId);
            setAppMsgs(appMsgRes);
          } else {
            const pTFRes = await PrintApi.getPlatformTagFollows(currentUser.platformId);
            setPlatformTagFollows(pTFRes);
            const pWFRes = await PrintApi.getPlatformWriterFollows(currentUser.platformId);
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
                  platformTagFollows, setPlatformTagFollows,
                  queries, setQueries,
                  appMsgs, setAppMsgs}}>
            <NavBar logout={logout}/>
            <Routes login={login} register={register} logout={logout}/>
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;