import { useNavigate, useLocation, Outlet, useOutletContext } from 'react-router-dom'
//import reactLogo from '../assets/react.svg'
import { useState, useEffect } from 'react';
import './Medecins.css';
import Accueil from './Accueil.jsx';
import api from '../../api/api.jsx';
import FicheMedecin from '../../composant/fichemedecin.jsx';
//import FicheMedecin 

function Medecins() {
   const { state } = useLocation();
   //const [medecin, setMedecin] = useState(state ? state.user : null);
   const [medecins, setMedecins] = useState({});
   const navigate = useNavigate(); //pour utiliser la navigation du routeur
   const [listeVisible, setListeVisible] = useState(false); // Etat visibilité de la liste
   const [nomMedecin, setNomMedecin] = useState(''); //Etat champ de saisie
   // const .{nom , prenom } = medecin;
   const [listeMedecins, setListeMedecins] = useState([]); //liste qui va contenir les medecins trouvés
   const [version, setVersion] = useState(0); //etat qui permet de forcer le rafraichissement du contenu

   /* function charger(e) {
     const valeursaisie = e.target.value;
     setNomMedecin(valeursaisie);
     if (medecin?.nom === valeursaisie) {
        return medecin.nom + medecin.prenom;
     }*/
   /*
       if(nomMedecin != null){
           if(medecin.nom== nomMedecin){
              return medecin.nom + medecin.prenom;
            }*/
   function charger(e) {
      const valeursaisie = e.target.value;   // Récupérer la saisie de l'utilisateur
      setNomMedecin(valeursaisie);
      searchMedecin(valeursaisie).then((response) => {
         console.log("Données reçues de l'API :", response.data);
         setListeMedecins(response.data);
         // setMedecins(response.data || []);( // ✅ On s'assure que c'est toujours un tableau
         setListeVisible(true);
      })
     

   }

   async function searchMedecin(valeursaisie) {
      try {
         console.log("Recherche en cours pour :", valeursaisie);
         const response = await api.get('/medecins?nom=' + valeursaisie); //// Appel à l'API pour récupérer les médecins
         /* const medecinsTrouves = await api.get('/medecins?nom='+valeursaisie,{
             params: {
                nomMedecin: lenomMedecin
            }
          }); //// Appel à l'API pour récupérer les médecins*/
         return response;

      }
      catch (error) {
         console.err("Erreur");
      }
   }
   /**
  * Fonction qui va se declencher lorsqu'un medecin est selectionné dans la liste
  * @param {JSON} leMedecin // utilisée dans les commentaires JSDoc pour documenter une fonction JavaScript
  */


   function selectMedecin(leMedecin) {
      console.log(leMedecin.nom);
      setMedecins(leMedecin);
      setNomMedecin(leMedecin.nom + leMedecin.prenom);
      if (medecins) { // ou medecin ===true  ; === compare les valeurs et les types
         setListeVisible(false);
      }

      setVersion(version + 1)
      navigate('' + leMedecin.id)
      return leMedecin;
   }


   /*useEffect(()=> { charger();
     setVersion((prev) => prev + 1); // Force le rafraîchissement  prev représente la valeur actuelle de version, et on retourne prev + 1 pour l’incrémenter.
   }, [nomMedecin]); // Déclenche le useEffect lorsque nomMedecin change);
   
   
   
   
   }
      /**
       * Appel à l'API /medecins, avec comme paramètre 'nom'
       * retour en fonction de la saisie de l'utilisateur
       * @returns
       */



   async function RechercherRapports() {





   }
   return (
      <>

         <div style={{
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
            <input type="text" value={nomMedecin} onChange={charger} style={{
               width: '96%',
               padding: '4px 20px',
               margin: '8px 10px',
               display: 'inline-block',
               border: '1px solid #ccc',
               borderRadius: '4px',
               boxSizing: 'border-box'
            }}
            />
            {listeVisible && (
               <ul style={{
                  margin: '10px 50px',
                  width: '50%', color: '#fff'
               }}>
                  {listeMedecins.map((medecin) => (
                     <li key={medecin.id}
                        onClick={() => selectMedecin(medecin)} >
                        {medecin.nom} {medecin.prenom}
                     </li>
                  ))}
               </ul>
            )}
         </div>

         <br />

         <Outlet context={[medecins, setMedecins]} key={version} />
      </>
   )




}


export default Medecins;


//        <input  type ="text"  value={(nomMedecin)}  onChange= {charger} />
/*<ul>
{listeVisible && listeMedecins.map(medecin =>
<li key={medecin.id}
  onClick = { () => selectMedecin(medecin) } >
  { medecin.nom } {medecin.prenom}
</li>
)}
</ul>*/

