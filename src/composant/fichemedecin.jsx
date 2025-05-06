import { useState, useEffect, Component} from "react";
import {useOutletContext, useNavigate,useParams} from "react-router-dom";
import Medecins from "../pages/accueil/Medecins";
import api from '../api/api.jsx';

export default function FicheMedecin(){
  const { id } = useParams();
  const[medecins, setMedecins]= useOutletContext(); 
  const [affichage, setAffichage]= useState('Fiche'); //choix de l'affichage par default
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

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
    const { name , value} = e.target;
    setMedecin( prev => ({
      ...prev,
     [name]: value

     //  [ name ]: name === 'departement' ? parseInt(value) : value
    })
      
    )
  }
  /**
   * Appel à l'api mettre à jour le medecin dans la base
   * de données, via la méthode PUT
   * @param {JSON}params
   * @returns Promesse Axios
   */
 /// async function sendUpdateMedecin(params){
  async function sendUpdateMedecin(e){

    e.preventDefault();
    try{
     // const response = await api.put(`/medecins/${params.id}`, params);
     console.log(id);
     //const response = await api.put(`/medecins/`+id);
     const response = await api.put(`/majMedecin`, medecin); //modifier le formulaire 

     setMessage("Mise à jour réussie");
     console.log("FicheMedecin > medecins:", medecins); // dans FicheMedecin
    console.log("Fiche > medecin:", medecin);  
      return response;
    }catch(e){
      console.log("Erreur pour la mise à jour ", e) ;
    }
    

  }
  
  return(
    /*<h1> Fiche Formulaire</h1>*/
    <>
     <form  onSubmit={sendUpdateMedecin}>
      <ul>
        {message && (
          <div id= "bmaj">
            <p>{message}</p>
          </div>
        )}
        <li>
          <label type ="text" name ="nom"id="nom">Nom: </label><br/>
          <input type="text" name="nom" defaultValue={medecin.nom} onChange={updatemedecin} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}} />
         
        </li>
        <li>
          <label name ="prenom" type ="text" id="prenom">Prenom: </label><br/>
          <input name ="prenom" type="text" id="prenom" defaultValue ={medecin.prenom} onChange ={ updatemedecin} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label name ="adresse" type ="text" id="adresse">Adresse: </label><br/>
          <input name ="adresse" type="text" id="adresse" defaultValue ={medecin.adresse} onChange ={ updatemedecin} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label  name ="tel" type ="text" id="tel">Tel: </label><br/>
          <input  name ="tel" type="text" id="tel" defaultValue ={medecin.tel} onChange ={ updatemedecin}style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label name ="specialitecomplementaire" type ="text" id="specialitecomplementaire">specialitecomplementaire: </label><br/>
          <input name ="specialitecomplementaire" type="text" id="specialite"  value ={medecin.specialitecomplementaire|| ''} onChange ={ updatemedecin} style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
        <li>
          <label  name ="departement" type ="text" id="departement">departement: </label><br/>
          <input name ="departement" type="number" id="departement" defaultValue={medecin.departement} onChange ={ updatemedecin}
           style={{   border: '1px solid #919191',
            borderRadius: '6px', width: '100%'}}/>
        </li>
      </ul><br/>
      <button type = "submit" style ={{width: 'auto', backgroundColor:'rgb(29 78 216)', color:'#fff'}}>Mettre à jour </button>
      </form>
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
  const lisItems= rapportsMedecin.map((rapport)=>
    <li>{rapport}</li>
);
  /**
   * Utilisation du hook useEffect : Appel à l'API via la methode GET 
   * DES LE CHARGEMENT /RAFRAICHISSEMENT du composent 
   * cette synchronisation via dependre de idMedecin
   * URL API: '/rapports/'+idMedecin'
   */
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() =>{
    setIsLoading(true);
    async function rapports(){
      try{
        const response = await api.get('/rapports/'+idMedecin);
        setRapportsMedecin(response.data);
        console.log("Rapports",response.data);
      }catch (error) {
        console.error("Erreur lors du chargement des rapports", error);
      } finally {
        setIsLoading(false);  // Fin du chargement
      }
     
    }
    rapports();
  },[idMedecin])
  return(
   //   <h1>Fiche Rappports </h1>

// Affichage conditionnel : si les données sont en cours de chargement, afficher un message
// Sinon, afficher la table contenant la liste des rapports du médecin
   isLoading ? (
    <p>Chargement des rapports</p>
  ) : (
   <table className="table">
   
          <thead>
            <tr >
              <th scope="col">DATE</th>
              <th scope="col">MOTIF</th>
              <th scope="col">BILAN</th>
              <th scope="col">VISITEUR</th>
            </tr>
          </thead>
          <tbody>
          {rapportsMedecin.map((rapport,index)=>(
            <tr key ={index}>
              <td> {new Date(rapport.date).toLocaleDateString()} </td> {/*convertir un objet Date en une chaîne de caractères*/}
              <td>{rapport.motif}</td>
              <td>{rapport.bilan}</td>
              <td>{rapport.nom} {rapport.prenom}</td>
            </tr>
    ) )}
   </tbody>
 </table>
)
  );
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

/* <input type="text" name ="nom" id="nom" defaultValue = {medecin.nom} onChange ={ updatemedecin} style={{   border: '1px solid #919191',
borderRadius: '6px', width: '100%'}}/>*/


//