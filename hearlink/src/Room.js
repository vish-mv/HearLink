import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "../src/index.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import logoLight from "./assets/Log short Dark.png";
import logoDark from "./assets/Logo short light.png";
import textLight from "./assets/hearlink text2.png";
import textDark from "./assets/hearlink text1.png";

const Room = () => {
    const { roomID } = useParams();
    const containerRef = useRef(null);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const location = useLocation();
    const name = location.state ? location.state.name : "";

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
        document.body.style.backgroundColor = isDarkTheme ? "#FFFFFF" : "#0E151B";
    };
    
    
    
    const handleButtonClick = () => {
        startListening();
        const sendText = document.querySelector('.xM8CBkrn0wtFOdOP84Bb input'); // Select the input element
    
        // Check if the transcript exists
            console.log(transcript)
            sendText.value=transcript;
        
    };
    

    const startListening = () => SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    

    useEffect(() => {
        if (containerRef.current) {
            const meeting = async () => {
                try {
                    const appID = 1481648916;
                    const serverSecret = "b61d7a9c5ab1e42ed0d21e9caba79b1f";
                    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                        appID,
                        serverSecret,
                        roomID,
                        Date.now().toString(),
                        name
                    );
                    const zp = ZegoUIKitPrebuilt.create(kitToken);

                    await zp.joinRoom({
                        container: containerRef.current,
                        layout: "Grid",
                        sharedLinks: [{ name: 'Room Id', url: roomID }],
                        showTextChat: "block",
                        scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
                        lowerLeftNotification: true,
                        showRoomDetailsButton: true,
                    });
                } catch (error) {
                    console.error("Error joining room:", error);
                }
            };

            meeting();
        }
    }, [roomID, name]);

    useEffect(() => {
        const additionalElements = document.querySelectorAll('.QAHxuJxRZWb3P_cbR8QA, .ji5jASszKFf2CGCmbxEh');
        const additionalElements1 = document.querySelectorAll('.D9WLyEQaARfWqCTyVrpU');
        const additionalElements2 = document.querySelectorAll('._M8cCug8H18ALQ05cNMt', '.pOvRwHj19chJGkgemUH3');

        additionalElements.forEach(element => {
            element.style.backgroundColor = isDarkTheme ? "#000000" : "#FFFFFF";
            element.style.color = isDarkTheme ? "#FFFFFF" : "#000000";
        });
        additionalElements1.forEach(element => {
            element.style.backgroundColor = isDarkTheme ? "#0E151B" : "#FFFFFF";
            element.style.color = isDarkTheme ? "#FFFFFF" : "#000000";
            element.style.boxShadow = isDarkTheme ? "0px 14px 24px 0px rgba(0, 0, 0, 0.1)" : "0px 14px 24px 0px rgba(14, 21, 27, 0.1)";
        });
        additionalElements2.forEach(element => {
            if (isDarkTheme) {
                element.classList.add('light-custom-class');
                element.classList.remove('dark-custom-class');
            } else {
                element.classList.add('dark-custom-class');
                element.classList.remove('light-custom-class');
            }
        });
    }, [isDarkTheme]);

    return (
        <div>
            <div style={{ padding: "5px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={isDarkTheme ? logoDark : logoLight} alt="Logo" style={{ width: "75px", height: "auto", marginLeft: "5px", padding: "2px" }} />
                    <img src={isDarkTheme ? textDark : textLight} alt="Text" style={{ width: "360px", height: "auto", marginLeft: "5px" }} />
                </div>
            </div>
            <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: "999", borderRadius: "50px" }}>
                <button onClick={toggleTheme} className="theme-button" style={{ cursor: "pointer", borderRadius: "50%" }}>
                    <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} className="theme-icon" size="2x" />
                </button>
                <button className="buttonClass" onClick={handleButtonClick} style={{ cursor: "pointer", borderRadius: "100%", padding: "10px", marginLeft: "10px" }}>
                    Button A
                </button>
            </div>
            <div ref={containerRef} style={{ width: "100vw", height: "calc(100vh - 117px)" }}>
                {/* Video container will be mounted here */}
            </div>
        </div>
    );
};

export default Room;
