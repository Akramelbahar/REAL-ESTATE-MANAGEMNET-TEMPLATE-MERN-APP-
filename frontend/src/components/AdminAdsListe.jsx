import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
function AdminAdsListe() {
    const { authToken } = useAuth();
    const [Offset,setOffset]=useState(0);
    const [Ads , setAds] = useState([]);
    const [count , setCount] = useState(0)
    const deleteAd = (_id) =>{
        axios.delete("https://backend-hgsc.onrender.com/api/admin/advertisment/"+_id , {
            headers : {
                token : authToken,
            }
        }).then(()=>{toast.success("L'Advertisment supprimé .");setCount(count+1)}
            
        ).catch(()=>{toast.error("Erreur lors de supression de l'advertisment .");setCount(count+1)})
    }

    useEffect(
        ()=>{
            setAds([])
            axios.get("https://backend-hgsc.onrender.com/api/admin/advertisments?offset="+Offset,
                {headers : {
                    token : authToken
                }}
            ).then(
                (response)=>{
                    setAds(response.data);
                }
            )
        },[Offset ,count ]
    )
  return (
    <div>
<div className="overflow-x-auto">
  <table  className="table table-xs">
    <thead>
      <tr className=''>
        <th></th>
        <th >Titre</th>
        <th>Address</th>
        <th>Description</th>
        <th>Createur</th>
        <th>Vues</th>
        {/*<th></th>*/}
        <th></th>
      </tr>
    </thead>

    <tbody>
    {
        Ads.map((ad,index)=>{
            return (
            <tr className=''>
                <th>{(index)+(Offset*20)+1}</th>
                <th >{ad.title}</th>
                <th>{ad.adresse}</th>
                <th>{ad.description}</th>
                <th>{ad.createdBy.username}</th>
                <th>{ad.seen}</th>
                 {/*<th><button class={"btn"}>Modifier</button></th>*/}
                <th><button className={"btn"} key={index} onClick={()=>{const truth = confirm("Est ce que vous etes sur de cette operation  ?"); if(truth)deleteAd(ad._id)}}>Supprimer</button></th>
            </tr>
            )
        })
    }
     
    </tbody>
   

    
    <tfoot>
    <tr className=''>
        <th></th>
        <th >Titre</th>
        <th>Address</th>
        <th>Description</th>
        <th>Createur</th>
        <th>Vues</th>
        <th>Button</th>
         {/*<th>Button</th>*/}
      </tr>
    </tfoot>
  </table>
  <div className="join grid grid-cols-2">
  {Offset ?<button className="join-item btn btn-outline" onClick={()=>setOffset(Offset-1)}>Previous page</button> : <button className="join-item btn btn-outline" disabled>Previous page</button>}
  <button className="join-item btn btn-outline " onClick={()=>setOffset(Offset+1)}>Next</button>
</div>
</div>
    <Toaster />
    </div>
  )
}

export default AdminAdsListe