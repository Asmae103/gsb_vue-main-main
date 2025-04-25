import { useState  } from "react";
import {useOutletContext} from "react-router-dom";
import Medecins from "../pages/accueil/Medecins";
import api from '../api/api.jsx';


export default function FicheMedecin(){
  const[medecins, setMedecins]= useOutletContext(); 
  const [affichage, setAffichage]= useState('Fiche'); //choix de l'affichage par default
 // const medecinsTrouves = await api.get('/medecins?nom='+valeursaisie); 
 /*if (!Array.isArray(medecins)) {
  return <p>Chargement des médecins...</p>;
}*/

/**
 * Composant Fiche Medecin, qui va prendre comme parametre le hook medecin 
 * et gerer l'affichage et les actions du formulaire (mise à jour des coordonées) 
 * @param {JSON} leMedecin
 * @returns Affichage de formulaire pré-rempli
 */

function Fiche({leMedecin}){
  const [medecin, setMedecin]= leMedecin;
  const [updateMedecinSuccess , setUpdateMedecinSuccess] = useState(); //check si laMAJ A REUSSI ou non
  /**
   * fonction qui se declenche lors de la soumission du formulaire,
   * fait appel à l'API avec les données saisies pour MAJ le medecin
   * dans la base de données 
   * @param {*} e
   */
  function updatemedecin(e) {
    try{

    }catch(e){

    }
  }
  /**
   * Appel à l'api mettre à jour le medecin dans la base
   * de données, via la méthode PUT
   * @param {JSON}params
   * @returns Promesse Axios
   */
  async function sendUpdateMedecin(params){

  }
  
  return(
    /*<h1> Fiche Formulaire</h1>*/
    <>
     
      <ul>
        <li>
          <label type ="text" id="nom">Nom: </label><br/>
          <input type="text" id="nom" value = {medecins.nom} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label type ="text" id="prenom">Prenom: </label><br/>
          <input type="text" id="prenom" value ={medecins.prenom} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label type ="text" id="adresse">Adresse: </label><br/>
          <input type="text" id="adresse" value ={medecins.adresse} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label type ="text" id="tel">Tel: </label><br/>
          <input type="text" id="tel" value ={medecins.tel} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label type ="text" id="specialitecomplementaire">specialitecomplementaire: </label><br/>
          <input type="text" id="specialitecomplementaire"  value ={medecins.specialitecomplementaire}  onChange={(e) =>
    setMedecins({
      ...medecins,
      specialitecomplementaire: e.target.value
    })
  } style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label type ="text" id="departement">departement: </label><br/>
          <input type="text" id="departement" value ={medecins.departement} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
      </ul><br/>
      <button style ={{width: 'auto', backgroundColor:'rgb(29 78 216)', color:'#fff'}}>Mettre à jour </button>
      </>
  )
}
//defaultValue ={medecins.specialitecomplementaire} readOnly


/**
* Composant Rapports Medecin, qui prend en props idMedecin ,
* et va récupérer les rapports concernant le medecin depuis l'API,
* et les afficher sous formr de tableau 
* @param {string} idMedecin
* @returns Tableau avec la liste des rapports du medecin en cours 
*/
function Rapports ({idMedecin}){
  const [rapportsMedecin, setRapportsMedecin] = useState([]);
  /**
   * Utilisation du hook useEffect : Appel à l'API via la methode GET 
   * DES LE CHARGEMENT /RAFRAICHISSEMENT du composent 
   * cette synchronisation via dependre de idMedecin
   * URL API: '/rapports/'+idMedecin'
   */
  useEffect(() =>{
    async function rapports(){
      
    }
    rapports();
  },[idMedecin])
  return(
      <h1>Fiche Rappports </h1>
  )
}
return(
  <>
  <div>
    Hello {medecins.nom} {medecins.prenom}
  </div>
  <div className = " flex min-h-full flex-col justify-left px-6 py-12 lg:px-8"> 
    <ul className ="flex border-b">
      <li className="-mb-px mr-l">
        <a className ="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
          href="#" onClick={()=> setAffichage('Fiche')}>
           Fiche médecin
        </a>
      </li>
      <li className="mr-1">
        <a className="bg-white inline-block py-2 px-4 text-blue-500 hover: text-blue-800 font-semibold"
           href="#" onClick={()=> setAffichage('Rapports')}> 
           Rapports médecin
           </a>

      </li>
    </ul>
    <br/> 
   
     
     {
      affichage =='Fiche'?
      <Fiche leMedecin = {[medecins, setMedecins]}/>
      :
      <Rapports idMedecin ={medecins.id}/>
     }


  </div>
  </>
);
}
