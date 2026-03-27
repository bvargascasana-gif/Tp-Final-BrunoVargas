import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import contactData from "../data/contactData";


const ContactContext = createContext(null);
const ARG_TIME_ZONE = "America/Argentina/Buenos_Aires";
const THEME_STORAGE_KEY = "ws_theme";
const AI_FALLBACK_BY_CHAT = {
    "chat-Principal-group": "Ya estan todos informados. Vamos para alla.",
    "chat-Waylay": "DEJAME DDORMIRRRR. Hablamos mañana, dale?",
    "chat-Homie-group": "[RAZE] AGREGA MANQUITO DALE",
    "chat-Miks": "Que ganas de una buena polenta.",
    "chat-Veto": "¿Quieres un cafe otra vez?.",
    "chat-Killjoy": "Okey, Okey :3.",
    "chat-Deadlock": "Alguien se puede tomar esto en serio?.",
    "chat-Cypher": "¿Estas bien?. Te noto raro.",
    "chat-Astra": "Es una lastima, lo sé.",
};


    const AUTH_STORAGE_KEYS = [
        "ws_currentUser",
        "ws_selectedChatId",
        "ws_current_user",
        "ws_selected_chat_id",
        "currentUser",
        "selectedChatId",
    ];


    function clearAuthStorage() {
        AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    }

    
    function safeLoadMessages() {
        const openedAt = new Date().toISOString();
        return ensureEddardVoiceNoteMessage(hydrateMessages(contactData.messages, openedAt));
    }


    function ensureEddardVoiceNoteMessage(messagesByChatId) {
        if (!messagesByChatId || typeof messagesByChatId !== "object") return {};


        const chatId = "chat-eddard";
        const voicePath = "/audio/chat-audio-eddard.mp3";
        const eddardMessages = Array.isArray(messagesByChatId[chatId]) ? messagesByChatId[chatId] : [];


        if (eddardMessages.some((message) => message?.audio === voicePath)) {
            return messagesByChatId;
        }
        return messagesByChatId;

    }


    function safeLoadTheme() {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") return stored;
        return "light";
    }


    function formatArgentinaTime(date) {
        return new Intl.DateTimeFormat("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: ARG_TIME_ZONE,
        }).format(date);
    }


    function appendMessage(setter, chatId, message) {
        setter((prev) => {
            return {
                ...prev,
                [chatId]: [...(prev[chatId] || []), message],
            };
        });
    }


    function buildReplyBack(chatId) {
        return AI_FALLBACK_BY_CHAT[chatId] || "Recibido. Te respondo en breve.";
    }


    function slugifyName(value) {
        return (value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
            .slice(0, 24);
    }


    function buildCustomCurrentUser(payload) {
        const rawName = (payload?.name || "").trim();
        if (!rawName) return null;


        const avatar = payload?.avatar || payload?.perfil || "/Perfiles/Brimstone.png";
        const slug = slugifyName(rawName) || `user-${Date.now()}`;


        return {
            id: `me-${slug}`,
            name: rawName,
            avatar,
            status: "Disponible",
            lastSeen: "En línea",
            phone: "+54 9 11 5322-7254",
        };
    }


    function hydrateMessages(messagesMap, openedAtIso) {
        if (!messagesMap || typeof messagesMap !== "object") return {};


        const result = {};


        Object.entries(messagesMap).forEach(([chatId, messages]) => {
            if (!Array.isArray(messages)) {
                result[chatId] = [];
                return;
            }


            result[chatId] = messages.map((message, index) => {
                if (!message || typeof message !== "object") return message;


                return { ...message };
            });
        });


        return result;
    }


    function warnInvalidChats(chats, usersById) {
        if (!Array.isArray(chats) || !usersById) 
            return
    }


    export function ContactProvider({ children }) {
        // No persistimos la sesión: siempre iniciar en login.
        const [currentUser, setCurrentUser] = useState(null);
        const [selectedChatId, setSelectedChatId] = useState(null);
        const [messagesByChatId, setMessagesByChatId] = useState(() => safeLoadMessages());
        const [typingByChatId, setTypingByChatId] = useState({});
        const [theme, setTheme] = useState(() => safeLoadTheme());


        useEffect(() => {
            clearAuthStorage();
            ["ws_messages", "ws_app_opened_at", "ws_data_seed_version", "ws_data_seed_snapshot"].forEach((key) => {
                localStorage.removeItem(key);
            });
        }, []);


        useEffect(() => {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        }, [theme]);


        const usersById = useMemo(() => {
            const map = {};
            for (const u of contactData.users) map[u.id] = u;
            return map;
        }, []);


        const validChats = useMemo(
            () => contactData.chats.filter((chat) => Boolean(usersById[chat?.userId])),
            [usersById]
        );


        const validChatIds = useMemo(
            () => new Set(validChats.map((chat) => chat.id)),
            [validChats]
        );


        useEffect(() => {
            warnInvalidChats(contactData.chats, usersById);
        }, [usersById]);


        useEffect(() => {
            if (selectedChatId && !validChatIds.has(selectedChatId)) {
                setSelectedChatId(null);
            }
        }, [selectedChatId, validChatIds]);


        function login(userInput) {
            const u = typeof userInput === "string"
                ? (usersById[userInput] || null)
                : buildCustomCurrentUser(userInput);
            setCurrentUser(u);
            setSelectedChatId(null);
            clearAuthStorage();
        }


        function logout() {
            setCurrentUser(null);
            setSelectedChatId(null);
            clearAuthStorage();
        }


        function selectChat(chatId) {
            if (chatId !== null && !validChatIds.has(chatId)) return;
            setSelectedChatId(chatId);
        }


        function toggleTheme() {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        }


        function sendMessage(chatId, text) {
            const trimmed = text.trim();
            if (!trimmed || !chatId || !validChatIds.has(chatId)) return;


            const now = new Date();


            const newMsg = {
                id: `m-${Date.now()}`,
                fromMe: true,
                text: trimmed,
                time: formatArgentinaTime(now),
                createdAt: now.toISOString(),
            };


            appendMessage(setMessagesByChatId, chatId, newMsg);
            setTypingByChatId((prev) => ({ ...prev, [chatId]: true }));


            window.setTimeout(() => {
                const replyNow = new Date();
                
                
                try {
                    const replyText = buildReply(chatId, trimmed) || buildReplyBack(chatId);


                    appendMessage(setMessagesByChatId, chatId, {
                        id: `m-ai-${Date.now()}`,
                        fromMe: false,
                        text: replyText,
                        time: formatArgentinaTime(replyNow),
                        createdAt: replyNow.toISOString(),
                    });
                } catch {
                    appendMessage(setMessagesByChatId, chatId, {
                        id: `m-ai-${Date.now()}`,
                        fromMe: false,
                        text: buildReplyBack(chatId),
                        time: formatArgentinaTime(replyNow),
                        createdAt: replyNow.toISOString(),
                    });
                } finally {
                    setTypingByChatId((prev) => ({ ...prev, [chatId]: false }));
                }
            }, 450);
        }


        const value = {
            users: contactData.users,
            chats: validChats,
            usersById,
            currentUser,
            selectedChatId,
            messagesByChatId,
            typingByChatId,
            theme,
            login,
            logout,
            selectChat,
            toggleTheme,
            sendMessage,
        };


        return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
    }


    ContactProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };


    export function useChat() {
        const ctx = useContext(ContactContext);
        if (!ctx) throw new Error("useChat debe usarse dentro de ContactProvider");
        return ctx;
    }
