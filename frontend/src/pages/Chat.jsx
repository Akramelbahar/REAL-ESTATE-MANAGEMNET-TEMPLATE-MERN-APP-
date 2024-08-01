import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function Chat() {
   
    const scrollableElementRef = useRef(null);
    const bottomRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [senderName, setSenderName] = useState("");
    
    const [senderPicture, setSenderPicture] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [searchUsername , setSearchUsername] = useState("");
    const [receiverPicture, setReceiverPicture] = useState("");
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/user/conversation', {
            headers: { token: authToken }
        })
        .then(response => setConversations(response.data))
        .catch(error => console.error(error));

        if (id) {
            axios.get(`http://127.0.0.1:5000/api/message/${id}`, {
                headers: { token: authToken }
            })
            .then(response => {
                setMessages(response.data.messages || []);
                const participants = response.data.participants || [];
                participants.forEach(element => {
                    if (element._id !== id) {
                        setReceiverName(element.username);
                        setReceiverPicture(element.profile_pic);
                    } else {
                        setSenderName(element.username);
                        setSenderPicture(element.profile_pic);
                    }
                });
            })
            .catch(error => console.error(error));
        }
    }, [id, authToken]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (id) {
                axios.get(`http://127.0.0.1:5000/api/message/${id}`, {
                    headers: { token: authToken }
                })
                .then(response => {
                    setMessages(response.data.messages || []);
                })
                .catch(error => console.error(error));
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [id, authToken]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://127.0.0.1:5000/api/message/send/${id}`, 
            { message: text }, 
            { headers: { token: authToken } });
            setText("");
        } catch (error) {
            console.error(error);
        }
    }
    const search = async (searchUsername) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/user/searchUsername", {
                username: searchUsername
            }, {
                headers: { token: authToken }
            });
            
            if (response.status == 200){}
        } catch (error) {
            console.error("An error occurred while searching for users:");
        }
    };

    return (
        <div>
            <Navbar btnLogin={"none"} isChat={true} btnSignup={"none"} />
            <div className='w-full my-2 h-[85vh] md:flex'>
                <div className='h-[50%] w-full md:h-auto md:w-1/4 p-2 md:p-0 md:mx-2 bg-neutral md:bg-base-200 rounded'>
                    <div className='h-[15%] flex justify-center items-center'>
                        <input type="text" onChange={(e)=>search(e.target.value)} placeholder="Type here" className="input h-[60%] input-bordered w-[95%] mx-auto block" />
                    </div>
                    <div className='h-[85%] overflow-auto'>
                         { searchUsername ?<ConversationCard profilePic={searchUsername.profile_pic} name={searchUsername.username} id={searchUsername._id} key={searchUsername._id}></ConversationCard>: <></>}
                    
                        {conversations.map(conversation => (
                            conversation.otherParticipant? <ConversationCard 
                                key={conversation._id}
                                profilePic={conversation.otherParticipant.profile_pic}
                                name={conversation.otherParticipant.username}
                                id={conversation.otherParticipant._id}
                                lastMessage={conversation.lastMessage && conversation.lastMessage.messageBody 
                                    ? (conversation.lastMessage.senderId !== id 
                                        ? "Received: " + conversation.lastMessage.messageBody 
                                        : "Sent: " + conversation.lastMessage.messageBody)
                                    : "No messages"} 
                            /> : <></>
                        ))}

                        </div>
                </div>
                
                <div className='w-full md:w-3/4 h-[50%] md:h-auto md:mx-2 p-2  bg-base-300 rounded'>
                <div className='hidden md:block'>{id?<ConversationCard  
                        id={id}
                        profilePic={senderPicture}
                        name={senderName}
                    />:""}</div>
                    <div ref={scrollableElementRef} className={id?'h-[70%] overflow-auto' : "h-[90%]"}>
                        {messages.length > 0 ? messages.map((message, index) => (
                            message.senderId === id ? 
                            <ChatBubbleReceiver
                                key={index}
                                picture={ senderPicture}
                                message={message.messageBody}
                                id={senderName}
                            /> : 
                            <ChatBubbleSender
                                key={index}
                                picture={receiverPicture}
                                message={message.messageBody}
                                id={receiverName}
                            />
                        )) : (
                            <div className="text-center pt-20 font-bold text-xl text-gray-500">No messages yet.</div>
                        )}
                        <div ref={bottomRef} /> 
                    </div>
                    <form onSubmit={sendMessage}>
                        <div className='my-2 h-[10%] flex justify-between'>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                value={text}
                                onChange={(e) => setText(e.target.value)} 
                                className="input input-bordered w-[90%]" 
                            />
                            <button type="submit" className="btn btn-accent w-[8%] mx-auto">➤</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function ChatBubbleReceiver({ message, picture, id }) {
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt={id} src={picture} />
                </div>
            </div>
            <div className="chat-bubble">{message}</div>
        </div>
    );
}

function ChatBubbleSender({ message, picture, id }) {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt={id} src={picture} />
                </div>
            </div>
            <div className="chat-bubble">{message}</div>
        </div>
    );
}

function ConversationCard({ profilePic, name, id, lastMessage }) {
    return (
        <a href={`/chat/${id}`}>
            <div className="card card-side bg-base-100 shadow-md p-4 my-2  cursor-pointer">
                <figure className="avatar">
                    <div className="w-12 h-12 rounded-xl border-primary border-2">
                        <img src={profilePic} alt="Profile" />
                    </div>
                </figure>
                <div className="card-body p-2">
                    <h2 className="card-title text-lg">{name}</h2>
                    <p className="text-gray-600 text-sm">{lastMessage}</p>
                </div>
            </div>
        </a>
    );
}

export default Chat;
