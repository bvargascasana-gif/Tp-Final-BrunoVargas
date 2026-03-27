import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import "./LoginScreen.css";


export default function LoginScreen() {


    const MAX_LOGIN_VOLUME = 0.40;
    const LOGIN_AUDIO_TRACK_OFFSET_SECONDS = 0;
    const navigate = useNavigate();
    const { currentUser, login } = useChat();
    const audioRef = useRef(null);
    const fadeTimerRef = useRef(null);
    const hasAppliedTrackOffsetRef = useRef(false);
    const hasStartedLoadingFadeRef = useRef(false);


    const PerfilOptions = useMemo(() => [
        "/Perfiles/Brimstone.png",
        "/Perfiles/Gekko.png",
        "/Perfiles/Fade.png",
        "/Perfiles/Viper.png",
        "/Perfiles/Skye.png",
        "/Perfiles/Phoenix.png",
    ], []);


    const [mode, setMode] = useState("form");
    const [progress, setProgress] = useState(0);
    const [Apodo, setApodo] = useState("");
    const [password, setPassword] = useState("");
    const [selectedPerfil, setSelectedPerfil] = useState(PerfilOptions[0]);
    const [isAudioMuted, setIsAudioMuted] = useState(false);


    useEffect(() => {
        if (currentUser && mode !== "loading") navigate("/", { replace: true });
    }, [currentUser, mode, navigate]);


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;


        const unlockEvents = ["pointerdown", "touchstart", "click", "keydown"];


        const enforceMaxVolume = () => {
            if (audio.volume > MAX_LOGIN_VOLUME) {
                audio.volume = MAX_LOGIN_VOLUME;
            }
        };


        const applyTrackOffset = () => {
            if (hasAppliedTrackOffsetRef.current) return;
            if (Number.isFinite(audio.duration) && audio.duration > LOGIN_AUDIO_TRACK_OFFSET_SECONDS) {
                audio.currentTime = LOGIN_AUDIO_TRACK_OFFSET_SECONDS;
                hasAppliedTrackOffsetRef.current = true;
            }
        };


        audio.volume = MAX_LOGIN_VOLUME;
        enforceMaxVolume();
        applyTrackOffset();


        const tryPlay = () => {
            return audio.play()
                .then(() => {
                    return true;
                })
                .catch(() => false);
        };


        const removeUnlockListeners = () => {
            unlockEvents.forEach((eventName) => {
                window.removeEventListener(eventName, unlockAudio);
            });
        };


        const unlockAudio = () => {
            tryPlay().then((played) => {
                if (played) {
                    removeUnlockListeners();
                }
            });
        };


        audio.addEventListener("volumechange", enforceMaxVolume);
        audio.addEventListener("loadedmetadata", enforceMaxVolume);
        audio.addEventListener("loadedmetadata", applyTrackOffset);
        audio.addEventListener("canplay", unlockAudio);
        unlockEvents.forEach((eventName) => {
            window.addEventListener(eventName, unlockAudio, { passive: true });
        });
        tryPlay().then((played) => {
            if (played) {
                removeUnlockListeners();
            }
        });


        return () => {
            if (fadeTimerRef.current) {
                window.clearInterval(fadeTimerRef.current);
                fadeTimerRef.current = null;
            }
            audio.removeEventListener("volumechange", enforceMaxVolume);
            audio.removeEventListener("loadedmetadata", enforceMaxVolume);
            audio.removeEventListener("loadedmetadata", applyTrackOffset);
            audio.removeEventListener("canplay", unlockAudio);
            removeUnlockListeners();
            audio.pause();
            audio.currentTime = 0;
            hasAppliedTrackOffsetRef.current = false;
        };
    }, [LOGIN_AUDIO_TRACK_OFFSET_SECONDS, MAX_LOGIN_VOLUME]);


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;


        audio.muted = isAudioMuted;
    }, [isAudioMuted]);


    const toggleAudioMute = () => {
        setIsAudioMuted((prev) => !prev);
    };


    function handleSubmit(e) {
        e.preventDefault();
        const trimmedApodo = Apodo.trim();
        if (!trimmedApodo) return;


        const audio = audioRef.current;
        if (audio && audio.paused && !isAudioMuted) {
            audio.play().catch(() => { });
        }


        setMode("loading");
        setProgress(0);
        hasStartedLoadingFadeRef.current = false;


        const totalMs = 4000;
        const stepMs = 10;
        const steps = Math.ceil(totalMs / stepMs);
        let i = 0;


        const t = setInterval(() => {
            i += 1;
            const pct = Math.min(100, Math.round((i / steps) * 100));
            setProgress(pct);


            if (pct >= 100) {
                clearInterval(t);
                login({
                    name: trimmedApodo,
                    avatar: selectedPerfil,
                    perfil: selectedPerfil,
                });
                navigate("/", { replace: true });
            }
        }, stepMs);
    }


    return (
        <main className="loginScreen">
        

            <audio ref={audioRef} className="srOnly" src="/Audios/valorant_main_menu.mp3" autoPlay loop preload="auto" />
            

            {mode === "loading" ? (
                <div className="loginCard loadingCard" aria-live="polite" aria-busy="true">
                    <div className="loadingLogoShell">
                        <img
                            className="loginLogo waveAnim"
                            src="/logos/Logo-Whatlorant-solo.png"
                            alt="Whatlorant"
                        />
                    </div>
                    <div className="loadingText">Cargando tus mensajes</div>
                    <div className="loadingBar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Progreso de inicio de sesión">
                        <div className="loadingFill" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            ) : (
                <div className="loginCard">
                    <img
                        className="loginLogo"
                        src="/logos/Logo-Whatlorant.png"
                        alt="Whatlorant"
                    />


                    <h1 className="loginTitle">Iniciar sesión</h1>


                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="field">
                            <span className="fieldLabel">Perfil</span>
                            <div className="PerfilGrid" role="radiogroup" aria-label="Selector de Perfil">
                                {PerfilOptions.map((perfil, index) => {
                                    const isSelected = selectedPerfil === perfil;
                                    return (
                                        <button
                                            key={perfil}
                                            type="button"
                                            className={`PerfilChoice ${isSelected ? "isSelected" : ""}`}
                                            onClick={() => setSelectedPerfil(perfil)}
                                            role="radio"
                                            aria-checked={isSelected}
                                            aria-label={`Perfil ${index + 1}`}
                                        >
                                            <img src={perfil} alt="Perfil" className="PerfilThumb" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>


                        <label className="field">
                            <span className="fieldLabel">Apodo</span>
                            <input
                                id="login-Apodo"
                                className="fieldInput"
                                type="text"
                                placeholder="Elige tu apodo"
                                value={Apodo}
                                onChange={(e) => setApodo(e.target.value)}
                                autoComplete="Apodo"
                                minLength={2}
                                maxLength={24}
                                required
                            />
                        </label>


                        <label className="field">
                            <span className="fieldLabel">Contraseña</span>
                            <input
                                id="login-password"
                                className="fieldInput"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </label>


                        <div className="loginRow">
                            <label className="remember">
                                <input type="checkbox" className="checkbox" defaultChecked aria-label="Recordar sesión" />
                                Recordarme
                            </label>
                            <button type="button" className="linkBtn">
                                ¿Has olvidado tu contraseña?
                            </button>
                        </div>


                        <button className="loginBtn" type="submit">
                            Acceso
                        </button>

                        <div className="footerText">
                            ¿No tienes una cuenta?{" "}
                            <button type="button" className="linkBtn">
                                Regístrate
                            </button>
                        </div>
                    </form>
                    <button
                        type="button"
                        className="loginAudioToggle"
                        onClick={toggleAudioMute}
                        aria-label={isAudioMuted ? "Activar música" : "Mutear música"}
                        title={isAudioMuted ? "Activar música" : "Mutear música"}
                    >
                        <span aria-hidden="true">{isAudioMuted ? "🔇" : "🔊"}</span>
                    </button>
                </div>
            )}
        </main>
    );
}