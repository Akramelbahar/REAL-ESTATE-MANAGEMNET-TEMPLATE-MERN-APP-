import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ToggleTheme from '../components/ToggleTheme';
import Carousel from '../components/Carousselle';
import axios from 'axios';
import { UserRole } from '../components/UserRole';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function EditAd() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const query = useQuery();
  const AdId = query.get("id");

  const [Title, setTitle] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Description, setDescription] = useState("");
  const [Prix, setPrix] = useState(0);
  const [Pcs, setPcs] = useState(0);
  const [Surface, setSurface] = useState(0);
  const [TypeBien, setTypeBien] = useState("");
  const [Diagnostics, setDiagnostics] = useState("");
  const [Equipements, setEquipements] = useState("");
  const [Pictures, setPictures] = useState([]);
  const [Html, setHtml] = useState(<Carousel items={[]} />);
  const [Post, setPost] = useState(false);
  const [Publish, setPublish] = useState("draft");

  // Validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get(`https://backend-hgsc.onrender.com/api/user/listing/${AdId}`, {
          headers: { token: authToken },
        });
        const adData = response.data.data;
        setTitle(adData.title);
        setAdresse(adData.adresse);
        setDescription(adData.description);
        setPrix(adData.price);
        setPcs(adData.pcs);
        setSurface(adData.surface);
        setTypeBien(adData.type);
        setDiagnostics(adData.diagnostic);
        setEquipements(adData.equipment);
        setPictures(adData.pictures || []);
      } catch (error) {
        console.error('There was an error fetching the advertisement:', error);
      }
    };

    if (AdId) fetchAdDetails();
  }, [authToken, AdId]);

  useEffect(() => {
    if (Post) {
      navigate("/dashboard");
    }
  }, [Post, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!Title) newErrors.Title = "Le titre est requis.";
    if (!Adresse) newErrors.Adresse = "L'adresse est requise.";
    if (!Description) newErrors.Description = "La description est requise.";
    if (Prix <= 0) newErrors.Prix = "Le prix doit être un nombre positif.";
    if (Pcs <= 0) newErrors.Pcs = "Le nombre de pièces doit être un nombre positif.";
    if (Surface <= 0) newErrors.Surface = "La surface doit être un nombre positif.";
    if (!TypeBien) newErrors.TypeBien = "Le type de bien est requis.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const publish = async () => {
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    try {
      const response = await axios.put('https://backend-hgsc.onrender.com/api/user/advertisment', {
        _id: AdId,
        title: Title,
        description: Description,
        price: Prix,
        surface: Surface,
        pcs: Pcs,
        type: TypeBien,
        adresse: Adresse,
        pictures: Pictures,
        diagnostic: Diagnostics,
        equipment: Equipements,
        Publish,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'token': authToken,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Votre annonce a été mise à jour.");
        setTimeout(() => {
          setPost(true);
        }, 150);
      } else {
        toast.error("Erreur en validation de vos infos.");
      }
    } catch (error) {
      toast.error("Erreur en validation de vos infos.");
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await UserRole(authToken);
        if (role === "user") {
          navigate("/UserError");
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [authToken, navigate]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://backend-hgsc.onrender.com/upload', formData);
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
          <h3 className='block text-xl text-bold font-bold'>Modifier votre annonce :</h3>
          <span className='block'>Grâce à ces informations, les acheteurs peuvent trouver votre annonce plus facilement</span>
        </div>
        <div className='md:w-3/5 w-full mx-auto'>
          <select required value={TypeBien} onChange={(e) => setTypeBien(e.target.value)} className="input p-3 my-3 block w-full input-bordered">
            <option disabled value="0">Type de bien</option>
            <option value="Appartement">Appartement</option>
            <option value="Maison">Maison</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.TypeBien && <p className="text-red-500">{errors.TypeBien}</p>}

          <input type="text" placeholder="Titre De L'Annonce" value={Title} className="input p-3 my-3 block w-full input-bordered" onChange={(e) => setTitle(e.target.value)} />
          {errors.Title && <p className="text-red-500">{errors.Title}</p>}

          <input type="text" placeholder="Adresse du bien" value={Adresse} className="input p-3 my-3 block w-full input-bordered" onChange={(e) => setAdresse(e.target.value)} />
          {errors.Adresse && <p className="text-red-500">{errors.Adresse}</p>}
        </div>

        <div className='flex flex-col content-center justify-center gap-2 w-full flex-wrap'>
          <textarea className="textarea textarea-bordered w-full mx-auto md:w-3/5" value={Description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
          {errors.Description && <p className="text-red-500">{errors.Description}</p>}
        </div>

        <div className='m-3 flex content-center gap-3 justify-center flex-wrap lg:flex-nowrap'>
          <div className='flex flex-col w-full md:w-1/6'>
            <input type="number" placeholder="Nombre de pièces" min={0} value={Pcs} onChange={(e) => setPcs(e.target.value)} className="input" />
            {errors.Pcs && <p className="text-red-500">{errors.Pcs}</p>}
          </div>
          <div className='flex flex-col w-full md:w-1/6'>
            <input type="number" placeholder="Surface" min={0} value={Surface} onChange={(e) => setSurface(e.target.value)} className="input" />
            {errors.Surface && <p className="text-red-500">{errors.Surface
