import {useState} from "react";
import { Outlet } from 'react-router-dom';
//import Rapports from "../pages/accueil/Rapports";
//import api from "../api/api.jsx";
import api from "../../api/api.jsx";
import Medecins from '../../pages/accueil/Medecins.jsx'

export default function AjouterRapport ({visiteur}){
    const[medecin,setMedecin]= useState({}); // Etat qui contient les données du medecin selectionné
    const [addRapportSucess, setRapportSuccess] = useState();


    function medecinSelectionner(medecinS){
        console.log("Médecin sélectionné :", medecinS);
         setMedecin(medecinS);
    }
    
    /**
     * Fonction qui va traiter la soumission du formulaire:
     * il va récupérer les champs saisies, et faire appel à l'API avec ces données 
     * afin d'ajouter le rapport dans la base de  données
     * @param {any} e
     */
    function ajouteRapport(e){
        const valeurSaisie = e.target.value;   // Récupérer la saisie de l'utilisateur
        setMedecin(valeurSaisie);
        searchMedecin(valeursaisie).then((response) => {
            console.log("Données reçues de l'API :", response.data);
         //   setListeMedecins(response.data);
            // setMedecins(response.data || []);( //  On s'assure que c'est toujours un tableau
          //  setListeVisible(true);
         })

        async function searchMedecinR(valeurSaisie){
            try{
                console.log("la valeur saisie"+ valeurSaisie);
                const response = await api.get('/rapport?nom'+ valeurSaisiie);
                return response;
            }catch(error){
                console.err("Erreur"+ error);
            }
            
        }
    }
    /**
     * Appel à l'API pour ajouter le nouveau rapport dans la base de donées 
     * via la méthode PUT 
     * @param {JSON} params
     * @returns Promesse Axios
     */
    async function ajouterRapportBase(params){
        
    }
    return(
        <>

      <Medecins onSelect={medecinSelectionner}/> {// onSelect se produit après la sélection de texte dans un élément
}     <Medecins
  onSelect={item => {
    setMedecinTrouvee(item);
    if (choix === "Ajouter") {
      navigateTo(`/accueil/rapports/${item.id}/id/ajouter`);
    } else if (choix === "Modifier") {
      navigateTo(`/accueil/rapports/${item.id}/id/modifier`);
    }
  }}
/>
       {medecin.id &&(
        <div>
                <p> Ajouter un rapport pour le medecin: {medecin.nom} {medecin.prenom} </p>
            
            <form> 
                <div>
                <li>
                <label type ="text" name ="nom"id="nom"> Date de visite </label><br/>
                <input type="date" name="date"  style={{   border: '1px solid #919191',
                    borderRadius: '6px', width: '100%'}} />
                
                </li>
                <li>
                <label name ="motif" type ="text" id="prenom">Motif </label><br/>
                <input name ="motif" type="text" id="prenom" style={{   border: '1px solid #919191',
                    borderRadius: '6px', width: '100%'}}/>
                </li>
                </div>
            </form>
        </div>
       )}
       <Outlet />
         </>

    );
}   
/*     <div style={{
                margin: '10px 50px',
                width: '50%',
                backgroundColor: '#4bb7de',
                display: 'inline-block',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'


            }}>
                <label> <b>Recherche un medecin</b></label>
                <br />
                <input type="text" value={medecin.nom} onChange={ajouterRapportBase} style={{
                width: '96%',
                padding: '4px 20px',
                margin: '8px 10px',
                display: 'inline-block',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'
                }}
                />
            </div>
            */