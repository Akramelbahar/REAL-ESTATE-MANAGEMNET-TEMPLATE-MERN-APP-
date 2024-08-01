import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Ads from './Ads';

function SearchBar() {
  const [Titre, setTitre] = useState("");
  const [Location, setLocation] = useState("");
  const [TypeBien, setTypeBien] = useState("appartement");
  const [MinPrix, setMinPrix] = useState(0);
  const [MaxPrix, setMaxPrix] = useState(0);
  const [MinSurface, setMinSurface] = useState(0);
  const [MaxSurface, setMaxSurface] = useState(0);
  const [Pcs, setPcs] = useState(0);
  const [featuredAds, setFeaturedAds] = useState([]);
  useEffect(()=>{
    if(TypeBien == "autre") setTypeBien("")
    
  },[TypeBien])
  useEffect(()=>{
    if(MaxPrix == 0)setMaxPrix("")
    
  },[MaxPrix])
  useEffect(()=>{
    if(MaxSurface == 0)setMaxSurface("")
  },[MaxSurface])
  
   



const fetchAds = async () => {
    
      const params = {
        Titre,
        Location,
        TypeBien,
        MinPrix,
        MaxPrix,
        MinSurface,
        MaxSurface,
        Pcs
      };
      
      
      const queryString = Object.keys(params)
        .filter(key => params[key])
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
  
      try {
        const res = await axios.get(`https://backend-hgsc.onrender.com/api/advertisment/search?${queryString}`);
        const ads = res.data;
  
        const formattedAds = ads.map(element => ({
          image: element.pictures[0],
          title: element.title,
          price: element.price,
          location: element.adresse,
          rooms: element.pcs,
          id : element._id
          
      }));
      setFeaturedAds(formattedAds);
      } catch (error) {
        console.error("Error fetching ads", error);
      }
    };

    useEffect(()=>{console.log("")} , [featuredAds])


  return (
    <div className="ring-1 bg-base-100 rounded container mx-auto p-4">
      <div className="shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Recherche de biens immobiliers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          <div>
            <label className="block text-sm md:text-base">Titre</label>
            <input
              type="text"
              className="input input-bordered w-full"
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Filtrer par titre "
            />
          </div>
          <div>
            <label className="block text-sm md:text-base">Type de bien</label>
            {TypeBien === "appartement" || TypeBien === "maison" || TypeBien === "terrain" ? (
                <select defaultChecked={TypeBien} onChange={(e)=>setTypeBien(e.target.value)} className="select select-bordered w-full">
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="terrain">Terrain</option>
                  <option value="autre">Autre</option>
                </select>
              ) : (
                <div>
                  
                  <input type="text" className="input input-bordered w-full" onChange={(e)=>setTypeBien(e.target.value)} placeholder="Entrer Le Type du Bien" />
                </div>
              )}
          </div>
          <div>
            <label className="block text-sm md:text-base">Localisation</label>
            <input
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Ville, code postal"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base">Prix minimum</label>
            <input
              type="number"
              onChange={(e) => setMinPrix(e.target.value)}
              className="input input-bordered w-full"
              placeholder="MAD"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base">Prix maximum</label>
            <input
              type="number"
              onChange={(e) => setMaxPrix(e.target.value)}
              className="input input-bordered w-full"
              placeholder="MAD"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base">Surface minimum (m²)</label>
            <input
              type="number"
              onChange={(e) => setMinSurface(e.target.value)}
              className="input input-bordered w-full"
              placeholder="m²"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base">Surface maximum (m²)</label>
            <input
              type="number"
              onChange={(e) => setMaxSurface(e.target.value)}
              className="input input-bordered w-full"
              placeholder="m²"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base">Nombre de pièces</label>
            <input
              type="number"
              onChange={(e) => setPcs(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-full">
            <button className="btn btn-primary w-full" onClick={fetchAds}>
              Rechercher
            </button>
          </div>
        </div>
      </div>
      <Ads  name="Resultat de votre recherche:" ads={featuredAds}/>
    </div>
  );
}

export default SearchBar;
