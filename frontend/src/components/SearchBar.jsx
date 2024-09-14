import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Ads from './Ads';

function SearchBar() {
  const [Titre, setTitre] = useState("");
  const [Location, setLocation] = useState("");
  const [LeTypeBien, setTypeBien] = useState("Tout");
  const [MinPrix, setMinPrix] = useState("");
  const [MaxPrix, setMaxPrix] = useState("");
  const [MinSurface, setMinSurface] = useState("");
  const [MaxSurface, setMaxSurface] = useState("");
  const [Pcs, setPcs] = useState("");
  const [featuredAds, setFeaturedAds] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (LeTypeBien === "autre") setTypeBien("");
  }, [LeTypeBien]);

  const fetchAds = useCallback(async () => {
    const params = {
      Titre,
      Location,
      TypeBien: LeTypeBien === "Tout" ? "" : LeTypeBien,
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
      const res = await axios.get(`https://backend-hgsc.onrender.com/api/listing/search?${queryString}`);
      const ads = res.data;

      const formattedAds = ads.map(element => ({
        image: element.pictures[0],
        title: element.title,
        price: element.price,
        location: element.adresse,
        rooms: element.pcs,
        id: element._id
      }));

      setFeaturedAds(formattedAds);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  }, [Titre, Location, LeTypeBien, MinPrix, MaxPrix, MinSurface, MaxSurface, Pcs]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="ring-1 bg-base-100 rounded container mx-auto p-4">
      <div className="shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Recherche de biens immobiliers</h2>
        <div className="mb-4">
          <button className="btn btn-accent w-full" onClick={toggleFormVisibility}>
            {isFormVisible ? "Réduire le filtre" : "Rechercher"}
          </button>
        </div>
        {isFormVisible && (
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
              <select
                value={LeTypeBien}
                onChange={(e) => setTypeBien(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="Tout">Tout</option>
                <option value="achat">Achat</option>
                <option value="vente">Vente</option>
                <option value="location">Location</option>
                <option value="autre">Autre</option>
              </select>
              {LeTypeBien === "autre" && (
                <input
                  type="text"
                  className="input input-bordered w-full mt-2"
                  onChange={(e) => setTypeBien(e.target.value)}
                  placeholder="Entrer Le Type du Bien"
                />
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
                onChange={(e) => setMinPrix(e.target.value || "")}
                className="input input-bordered w-full"
                placeholder="MAD"
              />
            </div>
            <div>
              <label className="block text-sm md:text-base">Prix maximum</label>
              <input
                type="number"
                onChange={(e) => setMaxPrix(e.target.value || "")}
                className="input input-bordered w-full"
                placeholder="MAD"
              />
            </div>
            <div>
              <label className="block text-sm md:text-base">Surface minimum (m²)</label>
              <input
                type="number"
                onChange={(e) => setMinSurface(e.target.value || "")}
                className="input input-bordered w-full"
                placeholder="m²"
              />
            </div>
            <div>
              <label className="block text-sm md:text-base">Surface maximum (m²)</label>
              <input
                type="number"
                onChange={(e) => setMaxSurface(e.target.value || "")}
                className="input input-bordered w-full"
                placeholder="m²"
              />
            </div>
            <div>
              <label className="block text-sm md:text-base">Nombre de pièces</label>
              <input
                type="number"
                onChange={(e) => setPcs(e.target.value || "")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="col-span-full">
              <button className="btn btn-accent w-full" onClick={fetchAds}>
                Rechercher
              </button>
            </div>
          </div>
        )}
      </div>
      <Ads name="Résultat de votre recherche:" ads={featuredAds} />
    </div>
  );
}

export default SearchBar;
