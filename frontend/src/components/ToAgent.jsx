import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserRole } from './UserRole';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ToAgent() {
  const { authToken } = useAuth();
  const [role, setRole] = useState('');
  const [state, setState] = useState(false);
  const [message, setMessage] = useState("");
  const [css, setCss] = useState("hidden");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await UserRole(authToken);
        setRole(userRole);
        setState(userRole === "agent");
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [authToken]);

  useEffect(() => {
    const updateRole = async () => {
      try {
        const response = await axios.put('http://127.0.0.1:5000/api/user/role', {
          newRole: state ? "agent" : "user"
        }, {
          headers: {
            "token": authToken
          }
        });

        if (response.status === 200) {
          setMessage("Operation completed successfully");
          setCss("tooltip tooltip-open tooltip-bottom tooltip-success");
          setTimeout(() => {
            setCss("");
          }, 3000);
        } else {
          setMessage(response.data.message || "An error occurred");
          setCss("tooltip tooltip-open tooltip-bottom tooltip-error");
          setTimeout(() => {
            setCss("");
            setState(!state);
          }, 3000);
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "An error occurred");
        setCss("tooltip tooltip-open tooltip-bottom tooltip-error");
        setTimeout(() => {
          setCss("");
          setState(!state);
        }, 3000);
      }
    };

    updateRole();
  }, [state, authToken]);

  return (
    <div className={"form-control flex " + css} data-tip={message}>
      <label className="label  cursor-pointer flex flex-col gap-3">
        <span className="label-text">{state ? "agent" : "user"}</span>
        <input type="checkbox" checked={state} onChange={() => setState(!state)} className="toggle" />
      </label>

    </div>
  );
}

export default ToAgent;
