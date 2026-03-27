import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import "./ProfileScreen.css";


export default function ProfileScreen() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { usersById, currentUser } = useChat();
    const user = usersById[userId] || (currentUser?.id === userId ? currentUser : null);


    if (!user) {
        return (
            <main className="profilePage">
                <div className="profileCard">
                    <p>Perfil no encontrado.</p>
                    <button type="button" className="profileBackBtn" onClick={() => navigate("/")}>Volver</button>
                </div>
            </main>
        );
    }


    return (
        <main className="Perfil-Page">
            <div className="Perfil-Card">
                <button type="button" className="Perfil-Volver-BTN" onClick={() => navigate(-1)}>← Volver</button>
                <img className="Perfil-Avatar" src={user.avatar} alt={user.name} />
                <h1 className="Perfil-Name">{user.name}</h1>
                <p className="Perfil-Status">{user.status}</p>
                <p className="Perfil-Phone">Celular: {user.phone || "No disponible"}</p>
                <p className="Perfil-Seen">Última conversación: {user.lastSeen}</p>
            </div>
        </main>
    );
}