import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import Nav from "../../components/Nav/Nav";
import ChatList from "../../components/Sidebar/ChatList";
import ChatHeader from "../../components/Chat/ChatHeader.jsx";
import MessageList from "../../components/Chat/MessageList";
import MessageInput from "../../components/Chat/MessageInput";
import { BsChevronLeft, BsSearch, BsEyeFill, BsImages, BsPeople } from "react-icons/bs";
import "./ChatScreen.css";


export default function ChatScreen() {
    const { currentUser, selectedChatId, selectChat } = useChat();
    const navigate = useNavigate();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [isMobileLayout, setIsMobileLayout] = useState(() => window.matchMedia("(max-width: 750px)").matches);


    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);


    useEffect(() => {
        const media = window.matchMedia("(max-width: 750px)");
        const handleChange = (event) => {
            setIsMobileLayout(event.matches);
            if (!event.matches) setMobileNavOpen(false);
        };
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);


    useEffect(() => {
        if (selectedChatId) setMobileNavOpen(false);
    }, [selectedChatId]);


    const showLeftPane = !isMobileLayout || !selectedChatId;
    const showRightPane = !isMobileLayout || Boolean(selectedChatId);


    return (
        <>
            <div className="layout">
                {showLeftPane ? (
                    <aside className="left">
                        <div className="leftShell">
                            <Nav />
                            <ChatList onMenuClick={() => setMobileNavOpen(true)} />
                        </div>
                    </aside>
                ) : null}


                {showRightPane ? (
                    <main className={`right ${isMobileLayout && selectedChatId ? "rightMobileChat" : ""}`}>
                        {!selectedChatId ? (
                            <section className="sup" aria-label="Estado inicial del chat">
                                <div className="supTitle">
                                    <h2>Whatlorant</h2>
                                    <span className="supLogoWrap" aria-hidden="true">
                                        <img className="supLogo" src="/logos/Logo-Whatlorant-solo.png" alt="Logo Whatlorant" />
                                    </span>
                                    <p>Seleccioná un chat para empezar o</p>
                                </div>
                                <div className="supActions" aria-label="Acciones rápidas">
                                    <button type="button" className="supActionBtn" aria-label="Buscar archivos" disabled>
                                        <BsSearch size={30} />
                                    </button>
                                    <button type="button" className="supActionBtn" aria-label="Ver estados" disabled>
                                        <BsEyeFill size={32} />
                                    </button>
                                    <button type="button" className="supActionBtn" aria-label="Galería" disabled>
                                        <BsImages size={30} />
                                    </button>
                                    <button type="button" className="supActionBtn" aria-label="Comunidades" disabled>
                                        <BsPeople size={32} />
                                    </button>
                                </div>
                                <div className="supActionLabels" aria-hidden="true">
                                    <span>Buscar archivos</span>
                                    <span>Ver estados</span>
                                    <span>Galería</span>
                                    <span>Comunidades</span>
                                </div>
                            </section>
                        )
                        : (
                            <>
                                <ChatHeader onBack={() => selectChat(null)} />
                                <MessageList />
                                <MessageInput />
                            </>
                        )}
                    </main>
                ) : null}
            </div>


            <div
                className={`mobileNavBackdrop ${mobileNavOpen ? "open" : ""}`}
                onClick={() => setMobileNavOpen(false)}
                aria-hidden="true"
            />
            <div className={`mobileNavDrawer ${mobileNavOpen ? "open" : ""}`}>
                <button
                    type="button"
                    className="mobileNavClose"
                    onClick={() => setMobileNavOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <BsChevronLeft size={18} />
                </button>
                <div className="mobileNavInner">
                    <Nav />
                </div>
            </div>
        </>
    );
}


