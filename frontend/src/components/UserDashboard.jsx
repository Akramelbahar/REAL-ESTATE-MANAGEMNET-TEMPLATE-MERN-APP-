import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Ads from './Ads';

function UserDashboard({ auth }) {
  const [Fav, setFav] = useState([]);
  const [Seen, setSeen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/user/userfavseen", {
      headers: { "token": auth }
    })
    .then((response) => {
      setFav(response.data.favorite.map(element => ({
        image: element.pictures[0],
        id : element._id ,
        title: element.title,
        price: element.price,
        location: element.adresse,
        rooms: element.pcs,
      })));
      setSeen(response.data.seen.map(element => ({
        image: element.pictures[0],
        id : element._id ,
        title: element.title,
        price: element.price,
        location: element.adresse,
        rooms: element.pcs,
      })));
      setLoading(false);
    })
    .catch((error) => {
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
    });
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Ads name="Vos Favoris : " ads={Fav} />
      <Ads name="Recemment Consultés :" ads={Seen} />
    </div>
  );
}

export default UserDashboard;
