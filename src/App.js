import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import PrintApi from './api/api';
import UserContext from './auth/UserContext';
import Routes from './routes-nav/Routes';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage('token');
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    async function getCurrentUser() {
      if(token) {
        try {
          PrintApi.token = token;
          const { id } = jwt.decode(token);
          let currUser = await PrintApi.getCurrentUser(id);
          setCurrentUser(currUser);
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

  if(!infoLoaded) return <h1>Loading...</h1>

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{currentUser, setCurrentUser}}>
            <h1>Welcome</h1>
            {/* Navbar */}
            <Routes login={login} register={register}/>
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
