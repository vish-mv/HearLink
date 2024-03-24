import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "../src/index.css";
import { FaHandPaper } from "react-icons/fa";
import { MdRecordVoiceOver } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import gestureRecognizerModel1 from './gesture_recognizer.task'; // Adjust the filename accordingly
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

    const [gestureRecognizer1, setGestureRecognizer1] = useState(null); // State to hold gestureRecognizer instance
    const [gestureRecognizer2, setGestureRecognizer2] = useState(null);
 
    
    const createGestureRecognizer1 = async () => {
        const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                delegate: "GPU"
            },
            runningMode: runningMode
        });
        setGestureRecognizer1(recognizer); // Set gestureRecognizer state
    };
    const createGestureRecognizer2 = async () => {
        const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: gestureRecognizerModel1,
                delegate: "GPU"
            },
            runningMode: runningMode
        });
        setGestureRecognizer2(recognizer); // Set gestureRecognizer state
    };

    useEffect(() => {
        createGestureRecognizer1();
        createGestureRecognizer2();
       
    }, []);
    const outText= document.getElementById("outtext");


    const handleOpenWebcamButtonClick = async () => {
        
        outText.style.opacity="100%";
        const gtest=document.getElementById("gtype")
    if(gtest.innerText==="A"){
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
    
                const results = await gestureRecognizer2.recognize(captureCanvas);
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
                        if (categoryName==="space"){
                            data+=" ";
                        }
                        else{
                            data+=categoryName.toString();
                        }
                        console.log(data);
                        outText.value=data;

                    }
                }
    
                stream.getVideoTracks().forEach(track => track.stop());
            };
        } catch (error) {
            console.error("Error accessing webcam or running gesture recognizer:", error);
        }
    }
    else{
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
    
                const results = await gestureRecognizer1.recognize(captureCanvas);
                console.log(results);
                if (results.gestures.length > 0) {                
                    const categoryName = results.gestures[0][0].categoryName;
                    const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
                    const handedness = results.handednesses[0][0].displayName;
                    console.log( `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`);
                    if (categoryName === "Open_Palm"){
                        data+=" Hello "
                    }
                    else if (categoryName==="ILoveYou"){
                        data+=" I Love You "
                    }
                    else if (categoryName==="Victory"){
                        data+=" Let's Go! "
                    }
                    else if (categoryName==="Closed_Fist"){
                        data+=" I'm Leaving "
                    }
                    else if (categoryName==="Thumb_Up"){
                        data+=" I Agree "
                    }
                    else if (categoryName==="Thumb_Down"){
                        data+=" I Do Not Agree "
                    }
                    console.log(data);
                    outText.value=data;
                }
    
                stream.getVideoTracks().forEach(track => track.stop());
            };
        } catch (error) {
            console.error("Error accessing webcam or running gesture recognizer:", error);
        }
    }
        
    };





    useEffect(() => {
        // Function to handle the button click event
        const handleClick = (event) => {
            const target = event.target;
            if (target.classList.contains("mCx2N1NwuMWObjjTeG0q")) {
                // Redirect to the specified URL
                window.location.href = 'https://hearlink.online/';
            }
        };

        // Add event listener for click event on document
        document.addEventListener('click', handleClick);

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []); // Empty dependency array to ensure the effect runs only once


    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
        document.body.style.backgroundColor = isDarkTheme ? "#ffffff" : "#0E151B";
    };
    
    
    

    
    
    const handleButtonClick = () => {
        outText.style.opacity="100%";
        startListening();
    
        // Check if the transcript exists
        outText.value=transcript;
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
        
        additionalElements.forEach(element => {
            element.style.backgroundColor = isDarkTheme ? "#1e2130" : "#D2E0FB";
            element.style.color = isDarkTheme ? "#FFFFFF" : "#0E151B";
        });
        


    }, [isDarkTheme]);
    const [buttonText, setButtonText] = useState('A');

    const toggleButtonText = () => {
        setButtonText(prevText => prevText === 'A' ? 'S' : 'A');
    };
    const copyTranscript = () => {
        // Copy data from outtext input field to clipboard
        const outText = document.getElementById("outtext");
        outText.select();
        document.execCommand('copy');
        console.log('Text copied to clipboard:', outText.value);
        outText.style.opacity = "0%";
        outText.value = "";
    
        let msgbox = document.querySelector(".xM8CBkrn0wtFOdOP84Bb input");
        if (!msgbox) {
            // If input field is not found, simulate a click on the button to make it visible
            const showButton = document.querySelector(".aUBcrib1jsrHTK9vhlVZ");
            if (showButton) {
                console.log("Button found, clicking...");
                showButton.click();
                // After clicking the button, reselect the input field
                setTimeout(() => {
                    msgbox = document.querySelector(".xM8CBkrn0wtFOdOP84Bb input");
                    console.log("Input field after click:", msgbox);
                    if (msgbox) {
                        msgbox.focus();
                    } else {
                        console.error("Input field still not found after clicking the button!");
                    }
                }, 1000); // Delay added to ensure the input field is updated in the DOM
            } else {
                console.error("Button to show input field not found!");
                return;
            }
        } else {
            // Focus on the input field
            msgbox.focus();
            const notifyb= document.getElementById("notify");
            notifyb.style.opacity="100%";
            setTimeout(() => {
                notifyb.style.opacity="0%";
            }, 3000);
        }
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'v') {
                setTimeout(() => { // Delay by 2 seconds
                    const sendButton = document.querySelector(".xM8CBkrn0wtFOdOP84Bb button");
                    if (sendButton) {
                        sendButton.click();
                        console.log("Button clicked");
                    } else {
                        console.error("Button not found!");
                    }
                }, 1000); // 2000 milliseconds = 2 seconds
            }
        };

        // Add event listener for keydown event on document
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array to ensure the effect runs only once
    

    return (
        <div>
            <div style={{ padding: "5px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={isDarkTheme ? logoDark : logoLight} alt="Logo" style={{ width: "75px", height: "auto", marginLeft: "5px", padding: "2px" }} />
                    <img src={isDarkTheme ? textDark : textLight} alt="Text" style={{ width: "360px", height: "auto", marginLeft: "5px" }} />
                </div>
            </div>
            <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: "999", borderRadius: "50px" }}>
                <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: "999", borderRadius: "50px" }}>
                <button onClick={toggleTheme} className="theme-button" style={{ cursor: "pointer", borderRadius: "50%" }}>
                    <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} className="theme-icon" size="2x" />
                </button>
                </div>
                <div style={{ position: "fixed", bottom: "30px", left: "20px", zIndex: "999", borderRadius: "50px" }}>
                <button id="voicebut" className="buttonClass" onClick={handleButtonClick} style={{ cursor: "pointer", borderRadius: "50%", padding: "10px", marginLeft: "10px", fontSize:"15px",}}>
                <MdRecordVoiceOver className="icon"/>
                </button>
                <button id="openWebcamButton" onClick={handleOpenWebcamButtonClick}><FaHandPaper  className="icon"/></button>
                <button id="gtype" onClick={toggleButtonText}>{buttonText}</button> {/* Button to toggle text */}
                <button id="sendbut"onClick={copyTranscript} ><FontAwesomeIcon icon={faPaperPlane} /> </button>
                </div>
                <div id="notify">Press <b>Ctrl + V</b> to send Message</div>
            </div>
            <div>
                <input type="text" id="outtext"></input>
            </div>
            <div ref={containerRef} style={{ width: "100vw", height: "calc(100vh - 117px)" }}>
                {/* Video container will be mounted here */}
            </div>
            

        </div>
    );
};

export default Room;
