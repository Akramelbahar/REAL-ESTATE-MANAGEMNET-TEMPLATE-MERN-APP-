import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../components/Footer';
import ToggleTheme from '../components/ToggleTheme';
import SearchBar from '../components/SearchBar';
import Ads from '../components/Ads';
import axios from 'axios';
import WebsiteInformation from '../components/WebsiteInformation';

function Home() {
    const [featuredAds, setFeaturedAds] = useState([]);
    const [Pagination , setPagination] = useState(0);
    useEffect(() => {
        const fetchAds = async () => {
            try {
                let formattedAds = [] ; 
                const response = await axios.get("https://backend-hgsc.onrender.com/api/advertisment?offset="+(Pagination*16).toString());
                const ads = response.data;

                 formattedAds = ads.map(element => ({
                    image: element.pictures[0],
                    title: element.title,
                    price: element.price,
                    location: element.adresse,
                    rooms: element.pcs,
                    id : element._id
                }));
                setFeaturedAds(formattedAds);
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        };

        fetchAds();
    }, [Pagination]);

    const { authToken } = useAuth();

    return (
        <>
            {authToken ? <Navbar btnLogin="none" btnSignup="none" /> : <Navbar btnLogout="none" />}
            <div className=' md:m-6 bg-base-300 md:p-3 rounded ring'>
                <SearchBar  />
                <div className='flex flex-col items-center '>
                <Ads ads={featuredAds} name="Annonces Vedettes" />
                <div className="join ">
                  {Pagination == 0 ? "" : <button className="join-item btn" onClick={()=>setPagination(Pagination - 1)}>«</button>}
                  <button className="join-item btn">Page {Pagination }</button>
                  <button className="join-item btn" onClick={()=>setPagination(Pagination + 1)}>»</button>
                </div></div>
                <WebsiteInformation />
            </div>
            <Footer />
        </>
    );
}

export default Home;
