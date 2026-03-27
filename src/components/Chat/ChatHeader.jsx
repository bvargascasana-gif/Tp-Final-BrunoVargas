import React from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import PropTypes from "prop-types";
import "./ChatHeader.css";


export default function ChatHeader({ onBack }) {
    const { selectedChatId, chats, usersById } = useChat();
    const navigate = useNavigate();
    const chat = chats.find((c) => c.id === selectedChatId);
    const u = chat ? usersById[chat.userId] : null;


    if (!selectedChatId) return null;


    const userName = u?.name || "Chat";
    const userStatus = u?.status || "Sin estado";
    const userAvatar = u?.avatar || "/avatars/jon.png";


    function goToProfile() {
        if (!u?.id) return;
        navigate(`/profile/${u.id}`);
    }


    return (
        <div className="chatHeader">
            {onBack ? (
                <button type="button" className="headerBackBtn" onClick={onBack} aria-label="Volver a inicio/chats">
                    ← Inicio
                </button>
            ) : null}
            <button type="button" className="headerAvatarBtn" onClick={goToProfile} aria-label={`Abrir perfil de ${userName}`} disabled={!u?.id}>
                <img className="headerAvatar"src={userAvatar} alt={userName}/>
            </button>
            <div className="headerMeta">
                <div className="headerName">{userName}</div>
                <div className="headerStatus">{userStatus}</div>
            </div>
        </div>
    );
}

ChatHeader.propTypes = {
    onBack: PropTypes.func,
};