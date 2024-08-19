import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AdminAdsListe() {
    const postTypes = ["achat", "vente", "location", "Autre"];
    const [postCounter, setPostCounter] = useState(0);
    const { authToken } = useAuth();
    const [offset, setOffset] = useState(0);
    const [ads, setAds] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        title: '',
        enabled: '',
        price: '',
        surface: '',
        type: '',
        adresse: '',
        createdBy: '',
        createdAt: '',
        seen: '',
    });
    const [pageCount, setPageCount] = useState(0); 
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        axios.get("https://backend-hgsc.onrender.com/api/listing/pageCount")
            .then((response) => {
                const countPages = response.data.countPages;
                setPageCount(countPages);
                const array = [];
                for (let i = 1; i <= countPages; i++) {
                    array.push(i);
                }
                setPageNumbers(array);
            })
            .catch((error) => {
                console.log("Error in getting pages");
                setPageCount(-1);
            });
    }, []);

    const handleSortChange = (field) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            newFilters[field] = newFilters[field] === 1 ? -1 : 1;
            Object.keys(newFilters).forEach((key) => {
                if (key !== field) newFilters[key] = ''; 
            });
            return newFilters;
        });
    };

    const handleTypeChange = () => {
        setPostCounter((prevCounter) => (prevCounter + 1) % postTypes.length);
        setFilters((prevFilters) => ({
            ...prevFilters,
            type: postTypes[(postCounter + 1) % postTypes.length],
        }));
    };

    const deleteAd = async (_id) => {
        try {
            await axios.delete(`https://backend-hgsc.onrender.com/api/admin/advertisment/${_id}`, {
                headers: { token: authToken }
            });
            toast.success("L'Advertisment supprimé.");
            setCount(count + 1);
        } catch {
            toast.error("Erreur lors de suppression de l'advertisment.");
        }
    };

    const toggleAdStatus = async (_id, enabled) => {
        try {
            await axios.post(`https://backend-hgsc.onrender.com/api/admin/activateAd/${_id}`, 
            { enabled: (!enabled).toString() }, {
                headers: { token: authToken }
            });
            toast.success(`L'Advertisment a été ${enabled ? 'désactivé' : 'activé'}.`);
            window.location.reload();
        } catch {
            toast.error("Erreur lors de la mise à jour de l'advertisment.");
        }
    };

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            setAds([]);
            try {
                const response = await axios.get(`https://backend-hgsc.onrender.com/api/admin/advertisments`, {
                    headers: { token: authToken },
                    params: {
                        offset,
                        ...filters,
                    },
                });
                setAds(response.data);
            } catch (error) {
                toast.error("Erreur lors de la récupération des advertisments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [offset, count, filters]);

    const clearFilters = () => {
        setFilters({
            title: '',
            enabled: '',
            price: '',
            surface: '',
            type: '',
            adresse: '',
            createdBy: '',
            createdAt: '',
            seen: '',
        });
    };

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <button className="btn btn-outline btn-error" onClick={clearFilters}>
                    Supprimer Les Filtres
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th onClick={() => handleSortChange('title')}>
                                Titre {filters.title === 1 ? '▲' : filters.title === -1 ? '▼' : ''}
                            </th>
                            <th onClick={() => handleSortChange('adresse')}>
                                Addresse {filters.adresse === 1 ? '▲' : filters.adresse === -1 ? '▼' : ''}
                            </th>
                            <th onClick={() => handleSortChange('price')}>
                                Prix {filters.price === 1 ? '▲' : filters.price === -1 ? '▼' : ''}
                            </th>
                            <th onClick={() => handleSortChange('surface')}>
                                Surface {filters.surface === 1 ? '▲' : filters.surface === -1 ? '▼' : ''}
                            </th>
                            <th onClick={handleTypeChange}>
                                Type {postTypes[postCounter]}
                            </th>
                            <th onClick={() => handleSortChange('createdAt')}>
                                Date De Publication {filters.createdAt === 1 ? '▲' : filters.createdAt === -1 ? '▼' : ''}
                            </th>
                            <th onClick={() => handleSortChange('createdBy')}>Createur {filters.createdBy === 1 ? '▲' : filters.createdBy === -1 ? '▼' : ''}</th>
                            <th onClick={() => handleSortChange('seen')}>Vues {filters.seen === 1 ? '▲' : filters.seen === -1 ? '▼' : ''}</th>
                            <th onClick={() => handleSortChange('enabled')}>Status {filters.enabled === 1 ? '▲' : filters.enabled === -1 ? '▼' : ''}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="11" className="text-center">
                                    Chargement ...
                                </td>
                            </tr>
                        ) : (
                            ads.map((ad, index) => (
                                <tr key={ad._id}>
                                    <td>{index + 1 + (offset * 16)}</td>
                                    <td><a href={`/advertisement/${ad._id}`}>{ad.title}</a></td>
                                    <td>{ad.adresse}</td>
                                    <td>{ad.price}</td>
                                    <td>{ad.surface}</td>
                                    <td>{ad.type}</td>
                                    <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
                                    <td>{ad.createdBy.username}</td>
                                    <td>{ad.seen}</td>
                                    <td>
                                        <button className="btn" onClick={() => toggleAdStatus(ad._id, ad.enabled)}>
                                            {ad.enabled ? 'Désactiver' : 'Activer'}
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline btn-danger" onClick={() => {
                                            if (confirm("Est-ce que vous êtes sûr de cette opération ?")) deleteAd(ad._id);
                                        }}>
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Titre</th>
                            <th>Addresse</th>
                            <th>Prix</th>
                            <th>Surface</th>
                            <th>Type</th>
                            <th>Date De Publication</th>
                            <th>Createur</th>
                            <th>Vues</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
                
                {pageCount === -1 ? (
                    <div className="flex justify-between mt-4">
                        <button
                            className="btn btn-outline"
                            onClick={() => setOffset((prev) => Math.max(prev - 1, 0))}
                            disabled={offset === 0}
                        >
                            Page Précédente
                        </button>
                        <button className="btn btn-outline" onClick={() => setOffset((prev) => prev + 1)}>
                            Page Suivante
                        </button>
                    </div>
                ) : (
                    <div className="join">
                        {offset > 1 && (
                            <>
                                <button className="join-item btn" onClick={() => setOffset(0)}>1</button>
                                {offset > 2 && <button className="join-item btn btn-disabled">...</button>}
                            </>
                        )}
                        {pageNumbers.slice(Math.max(offset - 1, 0), Math.min(offset + 2, pageCount)).map((number) => (
                            <button key={number} className={`join-item btn ${offset + 1 === number ? 'btn-active' : ''}`} onClick={() => setOffset(number - 1)}>
                                {number}
                            </button>
                        ))}
                        {offset < pageCount - 3 && (
                            <>
                                {offset < pageCount - 4 && <button className="join-item btn btn-disabled">...</button>}
                                <button className="join-item btn" onClick={() => setOffset(pageCount - 1)}>{pageCount}</button>
                            </>
                        )}
                    </div>
                )}
                
            </div>

            <Toaster />
        </div>
    );
}

export default AdminAdsListe;
