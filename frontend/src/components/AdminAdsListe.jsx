import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AdminAdsListe() {
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
    });

    const handleSortChange = (field) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (newFilters[field] === 1) {
                newFilters[field] = -1;  // Toggle to descending
            } else {
                newFilters[field] = 1;  // Toggle to ascending
            }
            Object.keys(newFilters).forEach((key) => {
                if (key !== field) newFilters[key] = '';  // Reset other fields
            });
            return newFilters;
        });
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
        });
    };

    return (
        <div>
            <div className="mb-4">
                <button className="btn btn-secondary" onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
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
                            <th onClick={() => handleSortChange('type')}>
                                Type {filters.type === 1 ? '▲' : filters.type === -1 ? '▼' : ''}
                            </th>
                            <th onClick={() => handleSortChange('createdAt')}>
                                Date De Publication {filters.createdAt === 1 ? '▲' : filters.createdAt === -1 ? '▼' : ''}
                            </th>
                            <th>Createur</th>
                            <th>Vues</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="11" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {!loading && ads.map((ad, index) => (
                            <tr key={ad._id}>
                                <th>{index + 1 + (offset * 20)}</th>
                                <th><a href={`/advertisement/${ad._id}`}>{ad.title}</a></th>
                                <th>{ad.adresse}</th>
                                <th>{ad.price}</th>
                                <th>{ad.surface}</th>
                                <th>{ad.type}</th>
                                <th>{new Date(ad.createdAt).toLocaleDateString()}</th>
                                <th>{ad.createdBy.username}</th>
                                <th>{ad.seen}</th>
                                <th>
                                    <button className="btn" onClick={() => toggleAdStatus(ad._id, ad.enabled)}>
                                        {ad.enabled ? 'Désactiver' : 'Activer'}
                                    </button>
                                </th>
                                <th>
                                    <button className="btn" onClick={() => { 
                                        if (confirm("Est-ce que vous êtes sûr de cette opération ?")) deleteAd(ad._id);
                                    }}>
                                        Supprimer
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Titre</th>
                            <th>Addresse</th>
                            <th>Prix</th>
                            <th>Surface</th>
                            <th>Type</th>
                            <th>Date De Publication</th>
                            <th>Createur</th>
                            <th>Vues</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <div className="join grid grid-cols-2">
                    {offset ? (
                        <button className="join-item btn btn-outline" onClick={() => setOffset(offset - 1)}>
                            Page Precedente 
                        </button>
                    ) : (
                        <button className="join-item btn btn-outline" disabled>
                            Page Precedente
                        </button>
                    )}
                    <button className="join-item btn btn-outline" onClick={() => setOffset(offset + 1)}>
                        Page Suivante
                    </button>
                </div>
            </div>
            
            <Toaster />
        </div>
    );
}

export default AdminAdsListe;
