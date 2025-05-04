import {useState} from "react";

export default function ModifierRapport({visiteur}) {
    const[date, setDate]= useState(); //Date de rapport recherché
    const[lsitVisible, setListVisible] =useState(false); //etat visible de la liste 
    const[listRapports, setListRapports] = useState([]); //etat qui va contenir la liste des rapports
    const[majRapportSuccess, setMajRapportSuccess] = useState(); //etat qui va vérifier si le rapport à bien été modifier 
    
    /**
     * Fonction appelé lorsque le visiteur va saisir la date du (ou des)
     * rapports à rechercher
     */
    
    function chargerRapports(){
        if(date != undefined){
            /**
             * le regex ici permet de vérifier si ladate est au bon format
             */
            //const regex_yyyymmdd=
        }
    }
}