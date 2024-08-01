import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
function Stats({ seenCount, adsCount, usersCount, seenChangeRate, adsChangeRate, usersChangeRate }) {
    return (
        <div className="stats shadow w-full stats-vertical md:stats-horizontal my-3">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                </div>
                <div className="stat-desc">Total des Visites:</div>
                <div className="stat-value text-primary">{seenCount}</div>
                <div className="stat-desc">Visites</div>
                <div className="stat-change text-secondary">
                    {seenChangeRate >= 0 ? '⬆️' : '⬇️'} {Math.abs(seenChangeRate).toFixed(2)}%
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <div className="stat-desc break-words ">Total des Annonces :</div>
                <div className="stat-value text-primary">{adsCount}</div>
                <div className="stat-desc">Annonces créer</div>
                <div className="stat-change text-secondary">
                    {adsChangeRate >= 0 ? '⬆️' : '⬇️'} {Math.abs(adsChangeRate).toFixed(2)}%
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                        </div>
                    </div>
                </div>
                <div className="stat-title">Total des utilisateurs</div>
                <div className="stat-value">{usersCount}</div>
                <div className="stat-desc ">utilisateurs créer</div>
                <div className="stat-change text-secondary">
                    {usersChangeRate >= 0 ? '⬆️' : '⬇️'} {Math.abs(usersChangeRate).toFixed(2)}%
                </div>
            </div>
        </div>
    )
}

function AdminStats({token}) {
    const { authToken } = useAuth();
    const [Daily , setDaily] = useState("");
    const [Three,setThree] = useState("");
    const [Weekly,setWeekly] = useState("");
    const [Monthly , setMonthly] = useState("")
    const [Yearly , setYearly] = useState("")
    useEffect(
        ()=>{
            axios.get("https://backend-hgsc.onrender.com/api/admin/stats/today" , {
                headers : {
                    token :authToken
                }
            }).then((response)=>{
                setDaily(response.data)
            })

            axios.get("https://backend-hgsc.onrender.com/api/admin/stats/last-3-days" , {
                headers : {
                    token :authToken
                }
            }).then((response)=>{
                setThree(response.data)
            })

            axios.get("https://backend-hgsc.onrender.com/api/admin/stats/last-7-days" , {
                headers : {
                    token :authToken
                }
            }).then((response)=>{
                setWeekly(response.data)
            })


            axios.get("https://backend-hgsc.onrender.com/api/admin/stats/last-30-days" , {
                headers : {
                    token :authToken
                }
            }).then((response)=>{
                setMonthly(response.data)
            })
            
            axios.get("https://backend-hgsc.onrender.com/api/admin/stats/last-365-days" , {
                headers : {
                    token :authToken
                }
            }).then((response)=>{
                setYearly(response.data)
            })
            
        },
        []
    )
    return (
        <div>
            <div>
                <h3 className='font-bold'>Stastiques d'Aujourd'hui :</h3>
                <Stats seenCount={Daily.seenCount} usersCount={Daily.usersCount} adsCount={Daily.adsCount} seenChangeRate={Daily.seenChangeRate} usersChangeRate={Daily.usersChangeRate} adsChangeRate={Daily.adsChangeRate} />
                <h3 className='font-bold'>Stastiques du dernier 3 jours :</h3>
                <Stats seenCount={Three.seenCount} usersCount={Three.usersCount} adsCount={Three.adsCount} seenChangeRate={Three.seenChangeRate} usersChangeRate={Three.usersChangeRate} adsChangeRate={Three.adsChangeRate} />
                <h3 className='font-bold'>Stastiques du derniers 7 jours :</h3>
                <Stats seenCount={Weekly.seenCount} usersCount={Weekly.usersCount} adsCount={Weekly.adsCount} seenChangeRate={Weekly.seenChangeRate} usersChangeRate={Weekly.usersChangeRate} adsChangeRate={Weekly.adsChangeRate} />
                <h3 className='font-bold'>Stastiques du derniers 30 jours :</h3>
                <Stats seenCount={Monthly.seenCount} usersCount={Monthly.usersCount} adsCount={Monthly.adsCount} seenChangeRate={Monthly.seenChangeRate} usersChangeRate={Monthly.usersChangeRate} adsChangeRate={Monthly.adsChangeRate} />
                <h3 className='font-bold'>Stastiques du derniers 365 jours:</h3>
                <Stats seenCount={Yearly.seenCount} usersCount={Yearly.usersCount} adsCount={Yearly.adsCount} seenChangeRate={Yearly.seenChangeRate} usersChangeRate={Yearly.usersChangeRate} adsChangeRate={Yearly.adsChangeRate} />
            </div>
          
        </div>
    )
}

export default AdminStats
