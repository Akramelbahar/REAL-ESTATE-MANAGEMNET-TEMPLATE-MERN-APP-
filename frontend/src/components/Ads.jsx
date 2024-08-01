import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ads({ ads, name, edit, token }) {
  const featuredAds = ads || [];
  const navigate = useNavigate();

  if (featuredAds.length === 0) return <></>;
  console.log(ads)
  return (
    <div className={`container mx-auto p-4 ${name.includes("Resultat") ? "bg-gray-900" : ""}`}>
      <div className="ring shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${name.includes("Resultat") ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
          {featuredAds.map((ad, index) => (
            <AdCard key={index} token={token} ad={ad} edit={edit} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AdCard({ ad, edit, token }) {
  const [RemoveState, setRemoveState] = useState(0);
  const [OnDeleteValidation, setOnDeleteValidation] = useState("");

  const remove = () => {
    setRemoveState(1);
  };

  const handleDelete = () => {
    console.log(ad);
    axios.delete(`https://backend-hgsc.onrender.com/api/user/advertisment/${ad.id}`, {
      headers: {
        token: token
      }
    }).then(
      (response) => {
        console.log(response.data);
        window.location.reload(); // Refresh the page after successful deletion
      }
    ).catch((error) => {
      console.log("Error during deleting this", error);
    });
    setRemoveState(0);
  };

  useEffect(() => {
    console.log("abc");
  }, [OnDeleteValidation]);

  return (
    <div className="card ring w-full bg-base-100 shadow-md">
      <a href={"advertisement/"+ad.id}><figure><img src={ad.image} alt={ad.title} className="w-full h-48 object-cover" /></figure></a>
      <div className="card-body">
      <a href={"advertisement/"+ad.id}>
        <h3 className="card-title text-lg font-bold">{ad.title}</h3>
        <p className="">
          {parseInt(ad.price) !== 0 ? (
            <span className="font-bold">{parseInt(ad.price)} MAD</span>
          ) : (
            ""
          )}
        </p>
        <p className="">{ad.location}</p>
        <p className="">{ad.rooms} pièces</p>
        <p className="">{ad.seen ? ad.seen.toString() + " Vues" : ""}</p>
        </a>
        <div className={edit === "true" ? 'flex gap-2' : "hidden"}>
          
          <a href={`/ad/edit?id=${ad.id}`}><button className={"btn btn-success"}>Edit</button></a>
          <button className={"btn btn-warning"} onClick={remove}>Remove</button>
        </div>
        {RemoveState === 1 ? (
          <>
            <input
              type="text"
              onChange={(e) => setOnDeleteValidation(e.target.value)}
              placeholder="Tapez ici"
              className="input input-bordered w-full max-w-xs"
            />
            <button
              className="btn btn-active btn-error"
              onClick={OnDeleteValidation === "valider" ? handleDelete : null}
              disabled={OnDeleteValidation !== "valider"}
            >
              {OnDeleteValidation === "valider" ? "Valider la suppression" : 'Ecrire "valider" Pour continuer'}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Ads;
