import "./Messenger.css";
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/Conversations/Conversation";
import Message from "../../components/Message/Message";
import Rightbar from "../../components/Rightbar/Rightbar";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null); // State for the selected conversation
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  const [shouldReloadConversations, setShouldReloadConversations] =
    useState(false);

  const { user } = useContext(AuthContext);
  // const scrollRef = useRef();

  const getConversations = async () => {
    try {
      const res = await axios.get(BACKEND+"/conversations/" + user._id);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // Messenger.js
  useEffect(() => {
    if (shouldReloadConversations) {
      getConversations();
      setShouldReloadConversations(false); // Reset the state to prevent continuous reloading
    }
  }, [shouldReloadConversations, getConversations]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get(BACKEND+"/messages/" + currentChat._id);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
    const interval = setInterval(getMessages, 1000); // 1000 milliseconds = 1 second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentChat]);

  useEffect(() => {
    // Fetch conversations when the component mounts
    getConversations();
  }, []); //
  const handleChatClick = (conversation) => {
    setCurrentChat(conversation); // Set the selected conversation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };
    try {
      const res = await axios.post(BACKEND+"/messages", message);
      setNewMessage("");
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <>
      <Topbar />
      <div className="Messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => handleChatClick(c)} key={c._id}>
                {/* Pass the conversation to the click handler */}
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} >
                      <div onClick={() => setCurrentChat(m)}>
                        <Message
                          message={m}
                          own={m.sender === user._id}
                          conversation={currentChat}
                          currentUser={user}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit} disabled={!newMessage.trim()}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                open a conversation to start chatting
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatMenuWrapper">
            <Rightbar
              messenger={true}
              getConversations={getConversations}
              shouldReloadConversations={shouldReloadConversations}
              setShouldReloadConversations={setShouldReloadConversations}
            />
          </div>
        </div>
      </div>
    </>
  );
}
