import {useState, useEffect} from "react";
import api from "../../api/api.jsx";
import '../../index/index1.css'

export default function ModifierRapport({visiteur}) {
  //  const[medecin,setMedecin]= useState({});
    const[date, setDate]= useState(); //Date de rapport recherché
    const[listVisible, setListVisible] =useState(false); //etat visible de la liste 
    const[listRapports, setListRapports] = useState([]); //etat qui va contenir la liste des rapports
    const[majRapportSuccess, setMajRapportSuccess] = useState(); //etat qui va vérifier si le rapport à bien été modifier 
    const[erreur, setErreur]= useState("");

    /**
     * Fonction appelé lorsque le visiteur va saisir la date du (ou des)
     * rapports à rechercher
     */
    console.log("page medecin");
    function chargerRapports(){
        if(date != undefined){
            /**
             * le regex ici permet de vérifier si ladate est au bon format
             */
            //setDate(true);
            const regex_yyyymmdd= /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
            if(regex_yyyymmdd.test(date)){
                rechercherRapports(visiteur.id, date).then((response)=>{
                    
                      console.log("Données reçu de l'API:", response.data);
                      if(response.data.length>0){
                        setListRapports(response.data);
                        setListVisible(true);
                        setErreur(""); // on efface les anciens messages d'erreur
                      }else{
                        setListRapports([]);
                        setListVisible(false);
                        setErreur("Aucun rapport à cette date");
                    }
                      
                })
            }else{
                setListRapports([]);
                setListVisible(false);
                setErreur("Aucun rapport e");
            }
        }  
    }
    /**
     * Appel à l'API:
     * URL : /rapports_a_date
     * Méthode: GET
     * paramètres : idVisiteur et date
     * @returns response - Variable au format JSON
     */

    async function rechercherRapports(idVisiteur, date){
        try{
            const response = await api.get('/rapports_a_date', {params: { idVisiteur, date }});
            return response;
        }catch(e){
            console.log("erreur reche medecin "+ e);
        }
    }
    useEffect(() => {
        if (date) {
          chargerRapports();
        }
      }, [date]);
      /**
       * Fonction appeler lorsque le visiteur va valider la modification du rapport
       */
      function modifierRapport(e){
        const { name , value} = e.target;
            setMedecin( prev => ({
              ...prev,
             [name]: value
        
             //  [ name ]: name === 'departement' ? parseInt(value) : value
            }) 
            )
        modifierRapportBase(rapport.id , motif , bilan).then((response)=>{
            
            setMajRapportSuccess("mise à jour effectué");
        })

      }
      /**
       * Appel à l'API 
       * URL  : /majRapports
       * Methode: PUT
       * paramètres : idRapport, motif et bilan
       * @returns response - Variable au format JSON
       */
      async function modifierRapportBase(params){
         const response= await api.put('/majRapports', {params: { idRapport, motif , bilan}})
         return response;
      }
    return(
        <>
        {!medecin.id && (
            <div>
                <p>ppppppppppppppp</p>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Rechercher un médecin</legend>
                    <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)}/>
                
                </fieldset>
            {erreur&&(
                <div id="bnerr">  
                    <p > {erreur}</p>
                </div>
            )

            }
            {listVisible &&(
                <table className="table">
   
                        <thead>
                            <tr >
                            <th scope="col">ID Rapport</th>
                            <th scope="col">MOTIF</th>
                            <th scope="col">BILAN</th>
                            <th scope="col">Medecin</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listRapports.map((rapport,index)=>(
                            <tr key ={index}  onClick={() => chargerRapports()} >
                            <td> {rapport.idRapport} </td> 
                            <td>{rapport.motif}</td>
                            <td>{rapport.bilan}</td>
                            <td>{rapport.nomMedecin} {rapport.prenomMedecin}</td>
                            </tr>
                        ) )}
                        </tbody>
                </table>
            )

            }
           </div>
        )}
         {medecin.id &&(
                <div>
                        <p> Modifier le rapport pour le medecin: {rapport.nomMedecin} {rapport.prenomMedecin} </p>
                    
                    <form onSubmit={modifierRapportBase}> 
                        <div>
                        <li>
                        <label name ="motif" type ="text" id="motif">Motif: </label><br/>
                        <input name ="motif" type="text" id="motif" value ={rapport.motif}   onChange={modifierRapport}style={{   border: '1px solid #919191',
                            borderRadius: '6px', width: '100%'}}/>
                        </li>
                        <li>
                        <label name ="bilan" type ="text" id="bilan">Bilan: </label><br/>
                        <textarea name ="bilan"  id="bilan" value ={rapport.bilan}  onChange={modifierRapport} style={{   border: '1px solid #919191',
                            borderRadius: '6px', width: '100%'}}> </textarea>
                        </li> 
                        </div>
                        <button type = "submit" style ={{width: 'auto', backgroundColor:'rgb(29 78 216)', color:'#fff'}}>Ajouter le rapport </button>
                     {
                        majRapportSuccess &&(
                            <div id="bmaj">
                                <p>{majRapportSuccess}</p>
                             </div>
                        )
                     }
                    </form>
                </div>
               )}
        </>
    )
}
/*
 <fieldset className="fieldset">
            <legend className="fieldset-legend">What is your name?</legend>
            <input type="text" className="input" placeholder="Type here" />
            <p className="label">Optional</p>
            </fieldset>
*/