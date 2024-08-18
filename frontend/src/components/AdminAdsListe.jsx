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
    
    const deleteAd = async (_id) => {
        try {
            await axios.delete(`https://backend-hgsc.onrender.com/api/admin/advertisment/${_id}`, {
                headers: { token: authToken }
            });
            toast.success("L'Advertisment supprimé.");
            setCount(count + 1);
        } catch {
            toast.error("Erreur lors de supression de l'advertisment.");
        }
    };

    const toggleAdStatus = async (_id, enabled) => {
        try {
            await axios.post(`https://backend-hgsc.onrender.com/api/admin/activateAd/${_id}`, 
            { enabled: (!enabled).toString() }, {
                headers: { token: authToken }
            });
            toast.success(`L'Advertisment a été ${enabled ? 'désactivé' : 'activé'}.`);
            setCount(count + 1);
        } catch {
            toast.error("Erreur lors de la mise à jour de l'advertisment.");
        }
    };

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            setAds([])
            try {
                const response = await axios.get(`https://backend-hgsc.onrender.com/api/admin/advertisments?offset=${offset}`, {
                    headers: { token: authToken }
                });
                setAds(response.data);
            } catch (error) {
                toast.error("Erreur lors de la récupération des advertisments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [offset, count]);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Titre</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th>Surface</th>
                            <th>Type</th>
                            <th>Date De Publication</th>
                            <th>Createur</th>
                            <th>Vues</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {loading && <div className="loading">Loading...</div>}
                        {ads.map((ad, index) => (
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
                            <th>Address</th>
                            <th>Price</th>
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
                            Previous page
                        </button>
                    ) : (
                        <button className="join-item btn btn-outline" disabled>
                            Previous page
                        </button>
                    )}
                    <button className="join-item btn btn-outline" onClick={() => setOffset(offset + 1)}>
                        Next
                    </button>
                </div>
            </div>
            
            <Toaster />
        </div>
    );
}

export default AdminAdsListe;
