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
        seen: '',
    });

    const handleSortChange = (field) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: prevFilters[field] === 1 ? -1 : 1,
            offset: 0,  // Reset offset when changing sorting
        }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setOffset(0);  // Reset to the first page on filter change
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
        setOffset(0);  // Reset offset on clear filters
    };

    return (
        <div>
            <div className="mb-4 flex space-x-4">
                <input
                    type="text"
                    placeholder="Titre"
                    name="title"
                    value={filters.title}
                    onChange={handleFilterChange}
                    className="input input-bordered"
                />
                <input
                    type="text"
                    placeholder="Addresse"
                    name="adresse"
                    value={filters.adresse}
                    onChange={handleFilterChange}
                    className="input input-bordered"
                />
                <input
                    type="number"
                    placeholder="Prix"
                    name="price"
                    value={filters.price}
                    onChange={handleFilterChange}
                    className="input input-bordered"
                />
                <input
                    type="number"
                    placeholder="Surface"
                    name="surface"
                    value={filters.surface}
                    onChange={handleFilterChange}
                    className="input input-bordered"
                />
                <input
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="input input-bordered"
                />
                <input
                    type="text"
                    placeholder="Createur"
                    name="createdBy"
                    value={filters.createdBy}
                    onChange={handleFilterChange}
                    className="input input-bordered"
                />
                <input
                    type="number"
                    placeholder="Vues"
                    name="seen"
                    value={filters.seen}
                    onChange={handleFilterChange}
                    className="input input-bordered"
                />
                <button className="btn btn-outline btn-error" onClick={clearFilters}>Supprimer Les Filtres</button>
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
                            <th onClick={() => handleSortChange('createdBy')}>
                                Createur {filters.createdBy === 1 ? '▲' : filters.createdBy === -1 ? '▼' : ''}
                            </th>
                            <th onClick={() => handleSortChange('seen')}>
                                Vues {filters.seen === 1 ? '▲' : filters.seen === -1 ? '▼' : ''}
                            </th>
                            <th onClick={() => handleSortChange('enabled')}>
                                Status {filters.enabled === 1 ? '▲' : filters.enabled === -1 ? '▼' : ''}
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="11" className="text-center">
                                    Chargement ...
                                </td>
                            </tr>
                        )}
                        {!loading && ads.length === 0 && (
                            <tr>
                                <td colSpan="11" className="text-center">
                                    Aucun resultat trouve.
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
                            <th>Createur</th
