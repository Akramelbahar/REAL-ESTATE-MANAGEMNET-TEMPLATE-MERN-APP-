import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ToggleTheme from '../components/ToggleTheme';
import axios from 'axios';
import { UserRole } from '../components/UserRole';
import UserDashboard from '../components/UserDashboard';
import AgentDashboard from '../components/AgentDashboard';

function Dashboard() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [role, setRole] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await UserRole(authToken);
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          setRole(userRole);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [authToken, navigate]);

  useEffect(() => {
    if (role === "user" || role === "agent") {
      axios.get('https://backend-hgsc.onrender.com/api/user/conversation', { headers: { token: authToken } })
        .then(response => setConversations(response.data))
        .catch(error => console.error('Error fetching conversations:', error));
    }
  }, [authToken, role]);

  return (
    <>
      <ToggleTheme />
      <Navbar btnLogin={"none"} isDashboard={true} btnSignup={"none"} />
      <div className='container flex md:my-4 flex-row w-full content-center justify-between flex-nowrap overflow-hidden h-[80vh]'>
        <div className='w-full mt-3 mb-1 md:mx-2 bg-base-200 rounded overflow-y-scroll md:w-3/4'>
          {role === "user" ? (
            <UserDashboard auth={authToken} />
          ) : role === "agent" ? (
            <>
              <AgentDashboard auth={authToken} />
              <UserDashboard auth={authToken} />
            </>
          ) : null}
        </div>
        <div className='hidden md:block p-1 md:w-1/4'>
          <div className='my-2 w-full'>
            <div className='block font-bold text-xl mx-auto w-fit my-1'>CHAT :</div>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
          </div>
          <div className='w-full p-3 h-[80vh] overflow-y-scroll'>
            {conversations.map((conversation) => (
              conversation.otherParticipant ? <ConversationCard
                key={conversation._id}
                profilePic={conversation.otherParticipant.profile_pic}
                name={conversation.otherParticipant.username}
                id={conversation.otherParticipant._id}
                lastMessage={conversation.lastMessage && conversation.lastMessage.messageBody
                  ? (conversation.lastMessage.senderId === authToken
                    ? "You: " + conversation.lastMessage.messageBody
                    : "New: " + conversation.lastMessage.messageBody)
                  : "No Message Found"}
                time={conversation.lastMessage ? conversation.lastMessage.createdAt : ""}
              /> :<></>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function ConversationCard({ profilePic, name, id, lastMessage, time }) {
  return (
    <a href={"/chat/" + id}>
      <div className="card card-side bg-base-100 shadow-md p-4 my-2 hover:bg-inherit hover:ring-1 cursor-pointer">
        <figure className="avatar">
          <div className="w-12 h-12 rounded-xl border-primary border-2">
            <img src={profilePic} alt="Profile" />
          </div>
        </figure>
        <div className="card-body p-2">
          <h2 className="card-title text-lg">{name}</h2>
          <p className="text-gray-600 text-sm">{lastMessage}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    </a>
  );
}

export default Dashboard;
