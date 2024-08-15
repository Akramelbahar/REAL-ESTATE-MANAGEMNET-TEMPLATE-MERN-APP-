import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Footer from '../components/Footer';
import toast, { Toaster } from 'react-hot-toast';
const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${days} days, ${hours} hours, ${minutes} minutes, and ${remainingSeconds} seconds ago`;
};

function AdDetails() {
  const { id } = useParams();
  const [userId , setUserId] = useState();
  const { authToken } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorPicture, setCreatorPicture] = useState("");
  const [creatorUsername, setCreatorUsername] = useState("");
  const [price, setPrice] = useState("");
  const [surface, setSurface] = useState("");
  const [pcs, setPcs] = useState("");
  const [typeBien, setTypeBien] = useState("");
  const [adresse, setAdresse] = useState("");
  const [pictures, setPictures] = useState([]);
  const [diagnostic, setDiagnostic] = useState("");
  const [equipment, setEquipment] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [tel, setTel] = useState("");
  const [addFav, setAddFav] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://backend-hgsc.onrender.com/api/listing/${id}` , {headers : {
      token : authToken
    }})
      .then((response) => {
        const ad = response.data.data;
        setUserId(ad.createdBy._id)
        setTitle(ad.title);
        setDescription(ad.description);
        setPrice(ad.price);
        setSurface(ad.surface);
        setPcs(ad.pcs);
        setTypeBien(ad.type);
        setAdresse(ad.adresse);
        setPictures(ad.pictures);
        setDiagnostic(ad.diagnostic);
        setEquipment(ad.equipment);
        setCreatedAt(ad.createdAt);
        setCreatorName(ad.createdBy.FirstName + " " + ad.createdBy.LastName);
        setCreatorPicture(ad.createdBy.profile_pic);
        setCreatorUsername(ad.createdBy.username);
        setTel(ad.createdBy.tel);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, [id]);

  const timeSinceAdCreated = createdAt ? timeSince(createdAt) : "";
  
  const sendMessage = () => {
    if (!authToken) navigate("/login");
    else {
        navigate("/chat/"+userId);
    }
  };

  const addToFav = async () => {
    if (!authToken) {
      navigate("/login");
    } else {
      try {
        const response = await axios.get(`https://backend-hgsc.onrender.com/api/user/advertisment/favorite/${id}`, {
          headers: {
            token:authToken
          }
        });
        setAddFav(true);
        toast.success("Ajouté a vos favoris")
      } catch (error) {
        console.error("Error adding to favorites:", error);
        toast.error("Error adding to favorites");
      }
    }
  };

  return (
    <>
      <Navbar
        btnSignup="none"
        btnLogin="none"
        MonCompte="display"
        btnLogout={authToken ? "" : "none"}
        profile={authToken ? "" : "none"}
      />
      <div className='bg-base-300 h-[80vh] lg:mx-[15vh] my-5 rounded overflow-x-auto'>
        <p className='mx-3 my-4 sm:mx-[10vh] block lg:my-6 font-semibold text-gray-500'>Crée il y'a : {timeSinceAdCreated}</p>
        <Caroussel items={pictures} />
        <div className='p-3 flex flex-col items-center lg:flex-row-reverse gap-5 lg:gap-3'>
          <div className='mt-2 w-fit bg-base-100 px-12 rounded shadow border border-white lg:border-0 py-4 lg:m-0 lg:w-1/4 overflow-y-auto lg:bg-inherit'>
            <img src={creatorPicture} alt={`${creatorName}'s profile`} className='w-12 h-12 rounded-full mr-4' />
            <div>
              <h2 className='text-xl font-bold'>Createur:</h2>
              <p className='text-lg font-semibold'>{creatorName}</p>
              <p className='text-sm text-gray-400 font-semibold'>{tel}</p>
              <p className='text-sm text-gray-600'>@{creatorUsername}</p>
              <button className="btn block btn-info my-4 w-fit mx-auto"  onClick={sendMessage}>Envoyez Message au vendeur</button>
              <button className="btn block btn-warning my-4 mx-auto w-fit" disabled={addFav} onClick={addToFav}>Ajouter Au Favoris</button>
            </div>
          </div>
          <div className='w-fit md:w-10/12 lg:w-3/4'>
            <h1 className='text-2xl underline font-extrabold overflow-auto'>{title}</h1>
            <p className='text-xl font-extrabold overflow-auto ml-5 m-4'>Adresse: {adresse}</p>
            <h3 className='text-xl font-extrabold overflow-auto ml-5 m-4'>Description :</h3>
            <p className='text-lg w-11/12 my-4 rounded mx-auto bg-base-200 shadow-xl p-2'>{description}</p>
            <p className='text-xl font-extrabold overflow-auto ml-5 m-4'>Prix: {price}</p>
            <p className='text-xl font-extrabold overflow-auto ml-5 m-4'>Surface: {surface}</p>
            <p className='text-xl font-extrabold overflow-auto ml-5 m-4'>Pcs: {pcs}</p>
            <p className='text-xl font-extrabold overflow-auto ml-5 m-4'>Type: {typeBien}</p>
            <p className='text-xl font-extrabold overflow-auto ml-5 m-4'>Diagnostic: {diagnostic}</p>
            <p className='text-xl font-extrabold overflow-auto ml-5 m-4'>Equipment: {equipment}</p>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster/>
    </>
  );
}

function Caroussel({ items }) {
  return (
    <div className="carousel p-2 m-2md:m-12 w-fit rounded h-[50vh]">
      {items.map((e, index) => (
        <div
          id={"slide" + (1 + index).toString()}
          className="carousel-item relative w-full"
          key={index}
        >
          <img src={e} className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={"#slide" + (index === 0 ? items.length : index)}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={"#slide" + (index === items.length - 1 ? 1 : index + 2)}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
      
    </div>
  );
}

export default AdDetails;
