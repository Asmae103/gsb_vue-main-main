import { useState } from 'react'
import { useNavigate, useLocation, useOutletContext} from 'react-router-dom'
//import reactLogo from '../assets/react.svg'
import reactLogo from "../../assets/react.svg";
import viteLogo from '/vite.svg'
//import '../composant/accueil/Rapports.css'
import "./Rapports.css";
import Navbar from "../../composant/Navbar.jsx"; 
//import Navbar from '../composant/Navbar.jsx'
function Rapports(){
    const { state } = useLocation();
    const [visiteur , setVisiteur]= useState(state ? state.user : null);
    const {dataVisiteur, setDataVisiteur} = useOutletContext(visiteur);
  
    return (
     <>
     <p>pages des rapports {visiteur}</p>
     <ul>
       <li>0 : { dataVisiteur.id }</li> 
        <li>1: {dataVisiteur.nom}</li>
        <li>2: {dataVisiteur.prenom}</li>
        <li>3: {dataVisiteur.adresse}</li>
        <li>4: {dataVisiteur.cp}</li>
        <li>5: {dataVisiteur.ville}</li>
        <li>id : { dataVisiteur.id }</li> 
        <li>nom: {dataVisiteur.nom}</li>
        <li>prenom: {dataVisiteur.prenom}</li>
        <li>adresse: {dataVisiteur.adresse}</li>
        <li>cp: {dataVisiteur.cp}</li>
        <li>ville: {dataVisiteur.ville}</li>
    </ul>

     </>
    )



}
export default Rapports;
/* <p> {visiteur}</p>



*/