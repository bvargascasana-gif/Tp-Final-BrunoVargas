import React from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import PropTypes from "prop-types";
import "./ChatListItem.css";


export default function ChatListItem({ chat, active, collapsed }) {
    const { usersById, selectChat } = useChat();
    const navigate = useNavigate();
    const u = usersById[chat.userId];


    if (!u) return null;


    function openProfile(e) {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/profile/${u.id}`);
    }


    return (
        <article className={`chatItem ${active ? "active" : ""} ${collapsed ? "collapsed" : ""}`} aria-current={active ? "true" : undefined}>
            <button type="button" className="chatAvatarBtn" onClick={openProfile} aria-label={`Abrir perfil de ${u.name}`}>
                <img className="chatAvatar" src={u.avatar} alt={u.name} />
            </button>
            <button type="button" className="chatMainBtn" onClick={() => selectChat(chat.id)} aria-label={`Abrir chat con ${u.name}`}>
                <div className="chatMeta">
                    <div className="chatRow">
                        <div className="chatName">{u.name}</div>
                        <div className="chatTime">{chat.lastTime}</div>
                    </div>
                    <div className="chatRow">
                        <div className="chatLast">{chat.lastMessage}</div>
                        {chat.unread > 0 && <div className="chatUnread">{chat.unread}</div>}
                    </div>
                </div>
            </button>
        </article>
    );
}


ChatListItem.propTypes = {
    chat: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        lastTime: PropTypes.string.isRequired,
        lastMessage: PropTypes.string.isRequired,
        unread: PropTypes.number.isRequired,
    }).isRequired,
    active: PropTypes.bool,
    collapsed: PropTypes.bool,
};