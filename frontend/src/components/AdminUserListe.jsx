import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
function AdminUserListe() {
    const { authToken } = useAuth();
    const [Offset,setOffset]=useState(0);
    const [Users ,setUsers] = useState([]);
    const [count , setCount] =useState(0)
    const deleteAd = (_id) =>{
        axios.delete("http://127.0.0.1:5000/api/admin/user/"+_id , {
            headers : {
                token : authToken,
            }
        }).then(()=>{toast.success("L'Utilisateurs supprimé .");setCount(count+1)}
            
        ).catch(()=>{toast.error("Erreur lors de supression de l'Utilisateurs .");setCount(count+1)})
    }
    useEffect(
        ()=>{
            setUsers([])
            axios.get("http://127.0.0.1:5000/api/admin/users?offset="+Offset,
                {headers : {
                    token : authToken
                }}
            ).then(
                (response)=>{
                    setUsers(response.data);
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
        <th>picture</th>
        <th >FirstName</th>
        <th>LastName</th>
        <th>username</th>
        <th>email</th>
        <th>password</th>
        
        <th>role</th>
        <th>Les Annonces</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
        {Users.map((e,index)=>{
            return (
                <tr className=''>
                <th><img width={"30px"} height={"30px"} src={e.profile_pic}/></th>
                <th >{e.FirstName}</th>
                <th>{e.LastName}</th>
                <th>{e.username}</th>
                <th>{e.email}</th>
                <th>{e.password}</th>
                
                <th>{e.role}</th>
                <th>{e.ads}</th>
                <th><button className={"btn"} key={index} onClick={()=>{const truth = confirm("Est ce que vous etes sur de cette operation  ?"); if(truth)deleteAd(e._id)}}>Supprimer</button></th>
              </tr>
            )
        })}     
    </tbody>
   

    
    <tfoot>
    <tr className=''>
    <th></th>
    
        <th >FirstName</th>
        <th>LastName</th>
        <th>username</th>
        <th>email</th>
        <th>tel</th>
        <th>role</th>
        <th>Les Annonces</th>
        <th></th>
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

export default AdminUserListe