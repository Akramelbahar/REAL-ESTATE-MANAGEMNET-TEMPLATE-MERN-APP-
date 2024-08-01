import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Ads from './Ads'; 
import UserDashboard from './UserDashboard';

function AgentDashboard({ auth }) {
  const [AdsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://backend-hgsc.onrender.com/api/user/advertisment", {
      headers: { token: auth }
    }).then(response => {
      setAdsData(response.data.ads.map(element => ({
        image: element.pictures && element.pictures.length > 0 ? element.pictures[0] : 'default-image-url',
        title: element.title,
        price: element.price,
        location: element.adresse,
        rooms: element.pcs,
        seen : element.seen.length, 
        id : element._id 
      })));
      setLoading(false);
    }).catch(error => {
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
    });
  }, [auth]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Ads name={"Vos Annonces  : "} token={auth} edit="true" ads={AdsData} />
      
    </div>
  );
}

export default AgentDashboard;
