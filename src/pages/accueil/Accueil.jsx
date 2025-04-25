import { useState , useEffect } from 'react'
import { useLocation,  Outlet } from 'react-router-dom'

import './Accueil.css'
import Navbar from '../../composant/Navbar.jsx'
import Medecins from './Medecins.jsx'
/*import MyContext from '../../composant/MyContext';

import Rapports from './Rapports.jsx'*/

function Accueil() {
   const { state } = useLocation(); 
   const [dataVisiteur, setDataVisiteur]= useState(state);
   const { nom, prenom } = dataVisiteur;
 // const [count, setCount] = useState(0)
  //const  navigate = useNavigate();

  //const [error, setError]= useState();

 // const { nom, prenom } = location.state || {};  // Accéder ànom et prenom
 // const {nom, prenom } = location.state || {};
//console.log(login);
//{nom} {prenom}
   
   /* if(location.state){
      setDataVisiteur(location.state);
    }
   */

  useEffect(()=>{
    console.log("states : ", state);
    setDataVisiteur(state)
  },[]);

  return (
    <>
    <Navbar />
    <p> Bonjour, {nom} {prenom}  </p>
    
    <Outlet context={{dataVisiteur, setDataVisiteur}}/>
 
       </>
  )

}
export default Accueil

/* <nav>
       <p>{setDataVisiteur}</p> 
<p> Bonjour, {nom} {prenom} </p>
    <MyContext.Provider value ={{nom,prenom} } >
       
    </MyContext.Provider>
<Rapports />

        <div class="main_pages">
        <img id="idgsb" src="src/index/a.png" />
            <a href="#">Dashboard</a>
            <a href="#">Acceuil</a>
            <a href="#">Projet</a>
            <a href="#">Calendar</a>
        </div>
    </nav>
     {children}
   <MyContext.Provider value ={{nom,prenom} } >
          <Medecins />
    </MyContext.Provider>



     <MyContextProvider>
        <Medecins />
    </MyContextProvider>
    */