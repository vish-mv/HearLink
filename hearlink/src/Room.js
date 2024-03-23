import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "../src/index.css";
import { FaHandPaper } from "react-icons/fa";
import { MdRecordVoiceOver } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import gestureRecognizerModel from './gesture_recognizer.task'; // Adjust the filename accordingly
import logoLight from "./assets/Log short Dark.png";
import logoDark from "./assets/Logo short light.png";
import textLight from "./assets/hearlink text2.png";
import textDark from "./assets/hearlink text1.png";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { GestureRecognizer, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
let runningMode = "IMAGE";
let data="";





const Room = () => {
    const { roomID } = useParams();
    const containerRef = useRef(null);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const location = useLocation();
    const name = location.state ? location.state.name : "";

    const [gestureRecognizer, setGestureRecognizer] = useState(null); // State to hold gestureRecognizer instance

    const createGestureRecognizer = async () => {
        const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: gestureRecognizerModel,
                delegate: "GPU"
            },
            runningMode: runningMode
        });
        setGestureRecognizer(recognizer); // Set gestureRecognizer state
    };

    useEffect(() => {
        createGestureRecognizer();
    }, []);

    const handleOpenWebcamButtonClick = async () => {
        if (!gestureRecognizer) {
            alert("Please wait for gestureRecognizer to load");
            return;
        }
    
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.createElement("video");
            videoElement.srcObject = stream;
            videoElement.play();
    
            videoElement.onloadeddata = async () => {
                const captureCanvas = document.createElement("canvas");
                captureCanvas.width = videoElement.videoWidth;
                captureCanvas.height = videoElement.videoHeight;
                const captureCanvasCtx = captureCanvas.getContext("2d");
                captureCanvasCtx.drawImage(videoElement, 0, 0, captureCanvas.width, captureCanvas.height);
    
                const results = await gestureRecognizer.recognize(captureCanvas);
                console.log(results);
                if (results.gestures.length > 0) {                
                    const categoryName = results.gestures[0][0].categoryName;
                    const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
                    const handedness = results.handednesses[0][0].displayName;
                    console.log( `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`);
                    if (categoryName === "del"){

                    }
                    else if (categoryName==="none"){

                    }
                    else{
                        if (categoryName==="blank"){
                            data+=" ";
                        }
                        else{
                            data+=categoryName.toString();
                        }
                        console.log(data);
                    }
                }
    
                stream.getVideoTracks().forEach(track => track.stop());
            };
        } catch (error) {
            console.error("Error accessing webcam or running gesture recognizer:", error);
        }
    };


    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
        document.body.style.backgroundColor = isDarkTheme ? "#FFFFFF" : "#0E151B";
    };
    
    const button = document.querySelector('.mCx2N1NwuMWObjjTeG0q');

    // Add a click event listener to the button
    button.addEventListener('click', () => {
      // Redirect to the specified URL
      window.location.href = 'https://hearlink.online/';
    });
    
    
    const handleButtonClick = () => {
        startListening();
        const sendText = document.querySelector('.xM8CBkrn0wtFOdOP84Bb input'); // Select the input element
    
        // Check if the transcript exists
        console.log(transcript);
        sendText.focus();
    
        // Create a clipboard element
        const clipboard = document.createElement('textarea');
        clipboard.style.position = 'fixed';
        clipboard.style.opacity = 0;
        clipboard.value = transcript;
        document.body.appendChild(clipboard);
        clipboard.focus();
        clipboard.select();
        sendText.focus();
        // Execute the paste action (Ctrl + V)
        document.execCommand('paste');
    
        // Remove the clipboard element
        document.body.removeChild(clipboard);
    };
    

    const startListening = () => SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    const { transcript } = useSpeechRecognition();
    

    useEffect(() => {
        if (containerRef.current) {
            const meeting = async () => {
                try {
                    const appID = 463450622;
                    const serverSecret = "90f79ca60820b81bed4d06f352e75e82";
                    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                        appID,
                        serverSecret,
                        roomID,
                        Date.now().toString(),
                        name
                    );
                    const zp = ZegoUIKitPrebuilt.create(kitToken);
                    zp.addPlugins({ZegoSuperBoardManager});

                    zp.joinRoom({
                        container: containerRef.current,
                        layout: "Grid",
                        sharedLinks: [{ name: 'Room Id', url: roomID }],
                        showTextChat: "block",
                        scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
                        lowerLeftNotification: true,
                        showRoomDetailsButton: true,
                        whiteboardConfig: {            
                            //showAddImageButton: true, 
                         },
                         
                    });
                } catch (error) {
                    console.error("Error joining room:", error);
                }
                console.log("loaded")
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
                <button id="voicebut" className="buttonClass" onClick={handleButtonClick} style={{ cursor: "pointer", borderRadius: "50%", padding: "10px", marginLeft: "10px", fontSize:"15px",}}>
                <MdRecordVoiceOver className="icon"/>
                </button>
                <button id="openWebcamButton" onClick={handleOpenWebcamButtonClick}><FaHandPaper  className="icon"/></button>
            </div>
            <div ref={containerRef} style={{ width: "100vw", height: "calc(100vh - 117px)" }}>
                {/* Video container will be mounted here */}
            </div>
            

        </div>
    );
};

export default Room;
