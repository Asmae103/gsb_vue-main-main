import { useState , useEffect} from 'react'
import { useNavigate, useLocation, useOutletContext, Link, Outlet} from 'react-router-dom'
import AjouterRapport from '../../composant/Rappoort/AjouterRapport.jsx'
import AjouterRapport2 from '../../composant/Rappoort/AjouterRapport2.jsx'
import ModifierRapport from '../../composant/Rappoort/ModifierRapport.jsx';


import reactLogo from "../../assets/react.svg";
import viteLogo from '/vite.svg'
import "./Rapports.css";
import Navbar from "../../composant/Navbar.jsx"; 

function Rapports() {
     const location = useLocation();
    // const [visiteur , setVisiteur]= useState(state ? state.user : null);
    const [dataVisiteur, setDataVisiteur] = useOutletContext();
    const [affichage, setAffichage] = useState('AjouterRapport2');
    console.log("vis", dataVisiteur);

    
    useEffect(() => {
        if (location.pathname.includes('/ajouter2')) {
          setAffichage('AjouterRapport2');
        } else if (location.pathname.includes('/modifier')) {
          setAffichage('ModifierRapport');
        }
      }, [location]);
    
    return (
        <>
            
            <div className = " flex min-h-full flex-col justify-left px-6 py-12 lg:px-8"> 
                <ul className ="flex border-b">
                <li className="-mb-px mr-l">
                <Link 
                    to='/Accueil/Rapports/${medecin.id}/ajouter2' // Utilisation de Link pour la navigation
                    className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                >
                    Ajouter un rapport
                </Link>
                </li>
                <li className="mr-1">
                <Link 
                    to={'/Accueil/Rapports/${medecin.id}/modifier' }// Utilisation de Link pour la navigation
                    className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                >
                    Modifier un rapport
                </Link>
                </li>
                </ul>
                <br/> 

            </div>
            {
                affichage =='AjouterRapport2'?
                <AjouterRapport2 visiteur={dataVisiteur} />
                :
                <ModifierRapport visiteur={dataVisiteur}/>
                }
            
            </>
            
    )


//<Outlet context={[dataVisiteur, setVisiteur]}/>
}
export default Rapports;
/* <p> {visiteur}</p>

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

*/

/* 
                {
                affichage =='AjouterRapport'?
                <AjouterRapport />
                :
                <ModifierRapport />
                }*/