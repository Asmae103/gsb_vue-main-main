import { useState } from "react";

/**
 * Composant Fiche Medecin, qui va prendre comme parametre le hook medecin 
 * et gerer l'affichage et les actions du formulaire (mise à jour des coordonées) 
 * @param {JSON} leMedecin
 * @returns Affichage de formulaire pré-rempli
 */

function Fiche(){
   
    return(
        <h1> Fiche Formulaire</h1>
    )
    
}
/**
 * Composant Rapports Medecin, qui prend en props idMedecin ,
 * et va récupérer les rapports concernant le medecin depuis l'API,
 * et les afficher sous formr de tableau 
 * @param {string} idMedecin
 * @returns Tableau avec la liste des rapports du medecin en cours 
 */
function Rapports ({idMedecin}){
    return(
        <h1>Fiche Rappports </h1>
    )
}
export default Fiche();