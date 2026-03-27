import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MessageBubble.css";
import PropTypes from "prop-types";


export default function MessageBubble({ message }) {
    const text = message.text?.trim() || "";
    const hasImage = Boolean(message.image);
    const hasAudio = Boolean(message.audio);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const isSingleLine = Boolean(text) && !hasImage && !hasAudio && !text.includes("\n") && text.length <= 52;
    const waveBars = useMemo(() => Array.from({ length: 28 }), []);
    const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;


        const handleLoadedMetadata = () => {
            setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
        };


        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime || 0);
        };


        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            audio.currentTime = 0;
        };


        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);


        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("ended", handleEnded);
            audio.pause();
        };
    }, [message.audio]);


    function formatTime(seconds) {
        const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
        const minutes = Math.floor(safeSeconds / 60);
        const remainingSeconds = safeSeconds % 60;
        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    }


    function toggleAudio() {
        const audio = audioRef.current;
        if (!audio) return;


        if (audio.paused) {
            audio.play().catch(() => { });
            return;
        }


        audio.pause();
    }


    return (
        <div className={`bubbleRow ${message.fromMe ? "me" : "them"}`} role="listitem">
            <div className="bubble">
                {text ? (
                    <div className={`textAndTime ${isSingleLine ? "singleLine" : ""}`}>
                        <div className="text">{text}</div>
                        {isSingleLine ? (
                            <time className="time inlineTime" aria-label={`Enviado a las ${message.time}`}>{message.time}</time>
                        ) : null}
                    </div>
                ) : null}
                {message.image ? <img className="messageImage" src={message.image} alt="Imagen del chat" /> : null}
                {hasAudio ? (

                    
                    <>
                        <div className="voiceNoteWrap">
                            <div className="voiceNoteLabel">{message.audioLabel || "Nota de voz"}</div>
                            <div className="voiceNotePlayer" role="group" aria-label={message.audioLabel || "Nota de voz"}>
                                <button type="button" className="voicePlayBtn" onClick={toggleAudio} aria-label={isPlaying ? "Pausar nota de voz" : "Reproducir nota de voz"}>
                                    <span aria-hidden="true">{isPlaying ? "❚❚" : "▶"}</span>
                                </button>


                                <div className="voiceWaveWrap" aria-hidden="true">
                                    <div className="voiceWave">
                                        {waveBars.map((_, index) => {
                                            const barProgress = (index + 1) / waveBars.length;
                                            const active = barProgress <= progress;
                                            return <span key={`bar-${index}`} className={`voiceWaveBar ${active ? "active" : ""}`} />;
                                        })}
                                    </div>
                                    <div className="voiceTimes">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>


                                <audio ref={audioRef} className="srOnly" preload="metadata">
                                    <source src={message.audio} type="audio/mpeg" />
                                </audio>

                            </div>
                            <div className="voiceMic" aria-hidden="true">🔊</div>
                            <audio className="srOnly">
                                Tu navegador no soporta reproducción de audio.
                            </audio>
                        </div>
                    </>


                ) : null}
                {!isSingleLine ? <time className="time" aria-label={`Enviado a las ${message.time}`}>{message.time}</time> : null}
            </div>
        </div>
    );
}


MessageBubble.propTypes = {
    message: PropTypes.shape({
        fromMe: PropTypes.bool.isRequired,
        text: PropTypes.string,
        image: PropTypes.string,
        audio: PropTypes.string,
        audioLabel: PropTypes.string,
        time: PropTypes.string.isRequired,
    }).isRequired,
};