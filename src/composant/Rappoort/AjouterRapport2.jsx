import {useState} from "react";
import { Outlet , useNavigate, useLocation} from 'react-router-dom';
import api from "../../api/api.jsx";
import '../../index/index1.css'

export default function AjouterRapport2 ({visiteur}){
    console.log("visiteur",visiteur);
    const[medecin,setMedecin]= useState({}); // Etat qui contient les données du medecin selectionné
    const [addRapportSucess, setRapportSuccess] = useState();
    const [rapport, setRapport]= useState([]); // tableau des rapport
   

    const { state } = useLocation();
    const navigate = useNavigate(); //pour utiliser la navigation du routeur
    const [nomMedecin, setNomMedecin] = useState(''); //Etat champ de saisie
    const [listeMedecins, setListeMedecins] = useState([]); //liste qui va contenir les medecins trouvés
    const [listeVisible, setListeVisible] = useState(false); // Etat visibilité de la liste
    const [version, setVersion] = useState(0); //etat qui permet de forcer le rafraichissement du contenu


    function charger(e) {
        const valeursaisie = e.target.value;   // Récupérer la saisie de l'utilisateur
        setNomMedecin(valeursaisie);
        searchMedecin(valeursaisie).then((response) => {
           console.log("Données reçues de l'API :", response.data);
           setListeMedecins(response.data);
           setListeVisible(true);
        })
     }
     async function searchMedecin(valeursaisie) {
           try {
              console.log("Recherche en cours pour :", valeursaisie);
              const response = await api.get('/medecins?nom=' + valeursaisie); //// Appel à l'API pour récupérer les médecins
            
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
            setMedecin(leMedecin);
            setNomMedecin(leMedecin.nom +" " + leMedecin.prenom);
            if (medecin) { // ou medecin ===true  ; === compare les valeurs et les types
                setListeVisible(false);
            }

            setVersion(version + 1)
            navigate(`/Accueil/Rapports/${leMedecin.id}/ajouter2`);
                
            //  onSelect(leMedecin);
            return leMedecin;
        }
         /**
         * Fonction qui va traiter la soumission du formulaire:
         * il va récupérer les champs saisies, et faire appel à l'API avec ces données 
         * afin d'ajouter le rapport dans la base de  données
         * @param {any} e
         */
    
      
        
        function ajouteRapport(e){
            e.preventDefault(); // Pour empêcher le rechargement de la page
         //tansmettre les données a la base donnée
           const params ={
            idMedecin: medecin.id,
            idVisiteur: visiteur.id,
            date: rapport.date,
            motif: rapport.motif,
            bilan: rapport.bilan
           };
         //  setRapport(prevRapports => [...prevRapports, params]);//conserver les rapports précédents dans l'état et ajouter un nouveau rapport au tableau

           ajouterRapportBase(params)
              .then((response)=>{
                if(response?.status===200){
                    setRapportSuccess("Maj effectué");
                }else{
                    console.log("Erreur lors de l'ajout d'un rapport")
                }
              })
              setFormData({
                date: "",
                motif: "",
                bilan: ""
            });
           }
        
    
    /**
     * Appel à l'API pour ajouter le nouveau rapport dans la base de donées 
     * via la méthode PUT 
     * @param {JSON} params
     * @returns Promesse Axios
     */
    async function ajouterRapportBase(params){
        try{
            const response = await api.put('/ajouterRapport', params);
            return response;
        }catch(error){
            console.log("Erreur lors de l'envoie d'un rapport" + error);
        }
       
    }

        return(
            <>
             {!medecin.id && (
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
             )}
            {medecin.id &&(
                <div>
                        <p> Ajouter un rapport pour le medecin: {medecin.nom} {medecin.prenom} </p>
                    
                    <form onSubmit={ajouteRapport}> 
                        <div>
                        <li>
                        <label type ="text" name ="date"id="date"> Date de visite: </label><br/>
                        <input type="date" name="date"  value ={rapport.date} onChange={(e) => setRapport({ ...rapport, [e.target.name]: e.target.value })} style={{   border: '1px solid #919191',
                            borderRadius: '6px', width: '100%'}} />
                        
                        </li>
                        <li>
                        <label name ="motif" type ="text" id="motif">Motif: </label><br/>
                        <input name ="motif" type="text" id="motif" value ={rapport.motif}   onChange={(e) => setRapport({ ...rapport, [e.target.name]: e.target.value })}style={{   border: '1px solid #919191',
                            borderRadius: '6px', width: '100%'}}/>
                        </li>
                        <li>
                        <label name ="bilan" type ="text" id="bilan">Bilan: </label><br/>
                        <textarea name ="bilan"  id="bilan" value ={rapport.bilan}  onChange={(e) => setRapport({ ...rapport, [e.target.name]: e.target.value })} style={{   border: '1px solid #919191',
                            borderRadius: '6px', width: '100%'}}> </textarea>
                        </li> 
                        </div>
                        <button type = "submit" style ={{width: 'auto', backgroundColor:'rgb(29 78 216)', color:'#fff'}}>Ajouter le rapport </button>
                     {
                        addRapportSucess &&(
                            <div id="bmaj">
                                <p>{addRapportSucess}</p>
                             </div>
                        )
                     }
                    </form>
                </div>
               )}
            
            </>
        );
}
