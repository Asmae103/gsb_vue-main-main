import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './index1.css'
import api from '../api/api.jsx';
//import Connexion from '../composant/connecter'



function App() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [login, SetLogin] = useState('');
  const [password, SetPassword] = useState('');
  const [erMessage, setErMessage] = useState('');
  /*var myForm = document.getElementById("myForm");
  formData = new FormData(myForm);*/

  async function getVisiteur(leLogin, leMdp) {
    try {
      const response =await api.get('/connexion', {
        params: {
          login: leLogin,
          mdp: leMdp
        }
      });
  
      return response;
    } catch (error) {
      console.log("Erreur connexion API "+error)
    }
  }

  function connexion(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget); //

    if (login && password) {
      // console.log(response.data);
      //  console.log("Connexion reussie");
        //getVisiteur(login, password)
        //console.log(form.get("password"))
        getVisiteur(form.get("login"), form.get("password")).then((response) => {
          //console.log(response);
          if (response.data != null) {
            console.log("Connexion reussie", response.data);
              navigate("/Accueil",{
                  state: response.data
                })
          } else {
           setError(true);
            setErMessage("Login ou Password est incorrect");
          }
        });

    } else {
      setError(false);
      setErMessage("Veuillez remplir tous les champs."); 
    }  

  }
//    {(error === true) ? <window.alert title="Impossible de se connecter !" /> : null}
  return (
    <>
      <form id="myForm" name="myForm" onSubmit={connexion}>
        <img src="src/index/a.png" />
        {erMessage && ( 
        <div id="bnerr">  
           <p > {erMessage}</p>
        </div>
        )}
        <div>
      
          <h2>Identifiez-vous </h2>
          <div>
            <label for="myinput" >Login:</label>
            <li>
              <input id="myinput"name="login" type="text" value={login} onChange={(e) => SetLogin(e.target.value)} />
            </li>
          </div>
          <div>
            <label for="myinput1" >Password:</label>
            <li>
              <input id="myinput1" name= "password" type="password" value={password} onChange={(e) => SetPassword(e.target.value)} />
            </li>
          </div>

          <button id="btn" type="Submit"
            onSubmit={connexion}
          >
            Sign in
          </button>
         
        </div>
      </form>

    </>
  )
}

export default App
/* <button id="btn" type="Submit" 
        onClick={() => 
          navigate("/getVisiteur",{
            params: {
            login ,
            password 
          }
        })
        }
          >
          Sign in 
        </button>*/


/*  <button id="btn" type="Submit"
  onClick={(e) => {
    connexion(e);
  }}
    >
    Sign in 
  </button>*/