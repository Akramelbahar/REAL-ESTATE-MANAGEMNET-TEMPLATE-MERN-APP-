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
    const [Pagination, setPagination] = useState(0);
    const [PageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        const fetchPageCount = async () => {
            try {
                const response = await axios.get("https://backend-hgsc.onrender.com/api/listing/pageCount");
                setPageNumber(response.data.countPages);
            } catch (error) {
                setPageNumber(-1);
            }
        };

        fetchPageCount();
    }, []);

    useEffect(() => {
        const fetchAds = async () => {
            setFeaturedAds([]);
            try {
                const response = await axios.get(`https://backend-hgsc.onrender.com/api/listing?offset=${Pagination * 16}`);
                const ads = response.data;

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
                console.error('Error fetching ads:', error);
            }
        };

        fetchAds();
    }, [Pagination]);

    const { authToken } = useAuth();

   const renderPaginationButtons = () => {
    let buttons = [];
    const maxBlocks = 6; // Maximum number of blocks (including "Previous" and "Next")
    const startPage = Math.max(0, Pagination - Math.floor(maxBlocks / 2));
    const endPage = Math.min(PageNumber - 1, startPage + maxBlocks - 1);

    if (Pagination > 0) {
        buttons.push(
            <button key="prev" className="join-item btn" onClick={() => setPagination(Pagination - 1)}>«</button>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
        buttons.push(
            <button key={i} className={`join-item btn ${i === Pagination ? 'btn-active' : ''}`} onClick={() => setPagination(i)}>
                {i + 1}
            </button>
        );
    }

    if (Pagination < PageNumber - 1) {
        buttons.push(
            <button key="next" className="join-item btn" onClick={() => setPagination(Pagination + 1)}>»</button>
        );
    }

    return buttons;
};


    return (
        <>
            {authToken ? <Navbar btnLogin="none" btnSignup="none" /> : <Navbar MonCompte="display" btnLogin="none" btnSignup="none" btnLogout="none" />}
            <div className='md:m-6 bg-base-300 md:p-3 rounded ring'>
                <SearchBar />
                <div className='flex flex-col items-center'>
                    <Ads ads={featuredAds} name="Annonces Vedettes" />
                    <div className="join my-2">
                        {PageNumber > 0 ? renderPaginationButtons() : <></>}
                    </div>
                </div>
                <WebsiteInformation />
            </div>
            <Footer />
        </>
    );
}

export default Home;
