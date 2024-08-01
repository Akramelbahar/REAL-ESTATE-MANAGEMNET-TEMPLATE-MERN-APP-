import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useHref, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ToggleTheme from '../components/ToggleTheme';
import Carousel from '../components/Carousselle';
import axios from 'axios';
import { UserRole } from '../components/UserRole';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
function EditAd() {
    const query =useQuery() ; 
    const AdId = query.get("id") ; 
   
    const [Title, setTitle] = useState("");
    const [Adresse, setAdresse] = useState("");
    const [Description, setDescription] = useState("");
    const [Prix, setPrix] = useState(0);
    const [Pcs, setPcs] = useState(0);
    const [Surface, setSurface] = useState(0);
    const [TypeBien, setTypeBien] = useState(0);
    const [Diagnostics, setDiagnostics] = useState("");
    const [Equipements, setEquipements] = useState("");
    const [Pictures, setPictures] = useState([]);
    const [Html, setHtml] = useState(<Carousel items={[]} />);
    const [Post, setPost] = useState(false);


    const navigate = useNavigate();
    const { authToken } = useAuth();
  
    useEffect(() => {
      if (!authToken) {
        navigate("/login");
      }
    }, [authToken, navigate]);
  

   
    useEffect(() => {
            axios.get(`https://backend-hgsc.onrender.com/api/user/advertisment/${AdId}`, {
            headers: {
                token: authToken
            }
            })
            .then(response => {
                setTitle(response.data.data.title)
                setAdresse(response.data.data.adresse)
                setDescription(response.data.data.description)
                setPrix(response.data.data.price)
                setPcs(response.data.data.pcs)
                setSurface(response.data.data.surface)
                setTypeBien(response.data.data.type)
                setDiagnostics(response.data.data.diagnostic)
                setEquipements(response.data.data.equipment)
                setPictures(response.data.data.pictures ? response.data.data.pictures : []) 
                console.log(Title)
                console.log(response.data.data)
            })
            .catch(error => {
            console.error('There was an error fetching the advertisement:', error);
            });
        }, [authToken, AdId]);

    useEffect(() => {
      if (Post) {
        navigate("/dashboard");
      }
    }, [Post, navigate]);
  
    const publish = async () => {
      try {
        const response = await axios.put('https://backend-hgsc.onrender.com/api/user/advertisment/', {
          _id : AdId ,
          title: Title,
          description: Description,
          price: Prix,
          surface: Surface,
          pcs: Pcs,
          type: TypeBien,
          adresse: Adresse,
          pictures: Pictures,
          diagnostic: Diagnostics,
          equipment: Equipements
        }, {
          headers: {
            'Content-Type': 'application/json',
            'token': authToken,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
  
          setTimeout(() => {
            setPost(true);
          }, 10);
        } else {
          toast.success("Erreur en validation de vos info");
         
        }
      } catch (error) {
        toast.error("Erreur en validation de vos info");
        
      }
    };
  
    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          const role = await UserRole(authToken);
          console.log(role)
          if (role === "user") {
            
            navigate("/UserError");
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };
  
      fetchUserRole();
    }, [authToken, navigate]);
    console.log(TypeBien);
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post('http://localhost:5000/upload', formData);
        const fileUrl = response.data.url;
        setPictures((prevPictures) => [...prevPictures, fileUrl]);
        e.target.value = null;
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    };
  
    const removePicture = () => {
      const hash = window.location.hash.substring(1);
      const itemIndex = hash.startsWith("item") ? parseInt(hash.substring(4)) : -1;
  
      if (itemIndex >= 0 && itemIndex < Pictures.length) {
        setPictures((prevPictures) => prevPictures.filter((_, index) => index !== itemIndex));
      }
    };
  
    useEffect(() => {
      setHtml(<Carousel items={Pictures} />);
    }, [Pictures]);

    
  return (
    <>
      <ToggleTheme />
      <Navbar btnLogin={"none"} btnSignup={"none"} />
      <div className='relative xl:mx-12 xl:my-4 lg:mx-8 lg:my-4 md:mx-6 md:my-3 sm:mx-8 sm:my-2 my-2 mx-4 min-h-screen rounded-md shadow-xl ring p-4 bg-base-300'>
       
        <div role="alert" className="alert m-3 space-y-2 block">
          <h3 className='block text-xl dark:text-white text-bold font-bold'>Modifier Votre Advertisement : </h3>
          <span className='block'>Grâce à ces informations les acheteurs peuvent trouver votre annonce plus facilement</span>
        </div>
        <div className='md:w-3/5 w-full mx-auto'>
          <input type="text" placeholder="Titre De L'Annonce" value={Title} className="input p-3 my-3 block w-full input-bordered" onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Adresse du bien" value={Adresse} className="input p-3 my-3 block w-full input-bordered" onChange={(e) => setAdresse(e.target.value)} />
        </div>
        <div className='flex content-center justify-center items-center gap-2 w-full flex-wrap'>
          <textarea className="textarea textarea-bordered w-full mx-auto md:w-3/5" value={Description}  onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
          <input type="number" placeholder="Prix" value={Prix} onChange={(e) => setPrix(e.target.value)} className="input ml-auto input-bordered mx-auto w-2/5 md:w-1/5" />
        </div>
        <div className='m-3 flex content-center gap-3 justify-center flex-wrap lg:flex-nowrap'>
          <input type="number" placeholder="Nombre de pièces" value={Pcs} onChange={(e) => setPcs(e.target.value)} className="input w-full md:w-1/6" />
          <input type="number" placeholder="Surface" value={Surface} onChange={(e) => setSurface(e.target.value)} className="input w-full md:w-1/6" />
          
            {TypeBien == "Appartement" || TypeBien == "Maison" ? <select defaultValue={TypeBien} onChange={(e) => setTypeBien(e.target.value)} className="select select-bordered w-4/6 md:w-2/6">
            <option disabled value="0">Type de bien</option>
            <option value="Appartement">Appartement</option>
            <option value="Maison">Maison</option>
            <option value="Autre">Autre</option>
          </select> : 
          <input type="text" value={TypeBien} placeholder="Entrer le type du bien" className="input    w-4/6 md:w-2/6 input-bordered" onChange={(e) => setTypeBien(e.target.value)} />}
           
          
        </div>
        <div className='flex content-center justify-center md:flex-nowrap flex-wrap'>
          <textarea className="textarea textarea-ghost my-3 md:w-2/6 w-5/6" value={Diagnostics} onChange={(e) => setDiagnostics(e.target.value)} placeholder="Diagnostics"></textarea>
          <textarea className="textarea textarea-ghost my-3 md:w-2/6 w-5/6" value={Equipements} onChange={(e) => setEquipements(e.target.value)} placeholder="Équipements"></textarea>
        </div>
        <div className="flex w-full flex-col lg:flex-row items-center flex-wrap my-4">
          <div className={"card bg-base-100 rounded-box flex flex-grow place-items-center h-96 justify-center w-3/4 relative" + (Pictures.length === 0 ? " after:content-[attr(after)] lg:after:content-[attr(aftermd)] " : "")} after="Inserer une image du dessous" aftermd="Inserer une image du droite">
            <span className='block absolute top-10 right-10 text-3xl hover:text-4xl hover:bg-base-300 p-2 ease-in duration-100 hover:rounded-full hover:p-4' onClick={removePicture}>❌</span>
            {Html}
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="card bg-base-100 rounded-box grid h-20 flex-grow place-items-center">
            <button className="btn btn-active btn-ghost ring-2" onClick={() => document.getElementById("file-upload").click()}>Ajouter une photo</button>
            <input accept="image/*" type="file" id="file-upload" className='hidden' onChange={handleFileChange}></input>
          </div>
        </div>
        <button className="btn md:w-1/4 mx-3 btn-accent w-4/10 block ms-auto" onClick={publish}>Publier l'annonce</button>
      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default EditAd