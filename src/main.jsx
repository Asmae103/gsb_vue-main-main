import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Accueil from './pages/accueil/Accueil.jsx'
import Medecins from './pages/accueil/Medecins.jsx'
import Rapports from './pages/accueil/Rapports.jsx'
import App from './index/index.jsx'
import './index.css'
import FicheMedecin from './composant/fichemedecin.jsx'
import AjouterRapport from './composant/Rappoort/AjouterRapport.jsx'
import AjouterRapport2 from './composant/Rappoort/AjouterRapport2.jsx'
import ModifierRapport from './composant/Rappoort/ModifierRapport.jsx'
/*
const NotFound = () =>{
  return <h1> Page non trouvable</h1>
};
*/
const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
 
  { 
    path:'/Accueil',
    element: <Accueil />,
    children: [
      {
        path: 'Medecins',
        element: <Medecins />,
        children:[
          {
            path: ':id',
            element: <FicheMedecin />
          },
        ]
      },
      {
        path: 'Rapports',
        element: <Rapports />,
        children:[
         /* {
            path: ':id/ajouter',
            element: <AjouterRapport />
          },*/
          {
            path: ':id/ajouter2',
            element: <AjouterRapport2 />
          },
          {
            path: ':id/modifier',
            element: <ModifierRapport />
          },
        ]
      },

     ]
    },
  /*{
    path: '*', // Cette route attrape toutes les autres routes non définies
    element: <NotFound />
}*/

]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router = {router}/>
  </StrictMode>,
)
