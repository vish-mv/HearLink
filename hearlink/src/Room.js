/*import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import logoLight from "./assets/Log short Dark.png";
import logoDark from "./assets/Logo short light.png";
import textLight from "./assets/hearlink text2.png";
import textDark from "./assets/hearlink text1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "../src/index.css"
import { width } from "@fortawesome/free-solid-svg-icons/faSun";


const Room = () => {
    const { roomID } = useParams();
    const containerRef = useRef(null);
    const [isDarkTheme, setIsDarkTheme] = useState(false); // State to manage the theme

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme); // Toggle the theme
        // Here you can dynamically change the background color of the body or a container div
        document.body.style.backgroundColor = isDarkTheme ? "#FFFFFF" : "#0E151B";
    };

    useEffect(() => {
        const meeting = async () => {
            const appID = 1481648916;
            const serverSecret = "b61d7a9c5ab1e42ed0d21e9caba79b1f";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                Date.now().toString(),
                "name" // Change this as necessary
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: containerRef.current,
                layout:"Grid",
                showTextChat:"block",
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
                lowerLeftNotification:false,
                showRoomDetailsButton:true,
            });
        };

        if (containerRef.current) {
            meeting();
        }

        // Additional logic to modify styles of specific elements
        const additionalElements = document.querySelectorAll('.QAHxuJxRZWb3P_cbR8QA, .ji5jASszKFf2CGCmbxEh');

        additionalElements.forEach(element => {
            // Modify the styles of the elements as needed
            // Example:
            element.style.backgroundColor = isDarkTheme ? "#000000" : "#FFFFFF";
            element.style.color = isDarkTheme ? "#FFFFFF" : "#000000";
        });
    }, [roomID, isDarkTheme]);

    return (
        <div>
            <div style={{  padding: "5px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={isDarkTheme ? logoDark : logoLight} alt="Logo" style={{ width: "75px", height: "auto",marginLeft: "5px",padding:"2px"}} />
                    <img src={isDarkTheme ? textDark : textLight} alt="Text" style={{ width: "360px", height: "auto", marginLeft: "5px" }} />
                </div>
            </div>
            <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: "999", borderRadius: "50px" }}>
                <button 
                    onClick={toggleTheme} 
                    className="themebutton" 
                    style={{ cursor: "pointer", borderRadius: "100%" ,padding:"10px"}} // Setting border-radius to make the button fully round
                >
                    <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} className="theme-icon" size="2x" />
                </button>
            </div>
            <div ref={containerRef} style={{ width: "100vw", height: "calc(100vh - 117px)" }}>
                {/* Video container will be mounted here */ /*}
            </div>
        </div>
    );
};

export default Room;
*/
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation hook
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import logoLight from "./assets/Log short Dark.png";
import logoDark from "./assets/Logo short light.png";
import textLight from "./assets/hearlink text2.png";
import textDark from "./assets/hearlink text1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "../src/index.css"


const Room = () => {
    const { roomID } = useParams();
    const containerRef = useRef(null);
    const [isDarkTheme, setIsDarkTheme] = useState(false); // State to manage the theme
    const location = useLocation(); // Use useLocation hook

    // Extract name from location state or default to empty string
    const name = location.state ? location.state.name : "";

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
        document.body.style.backgroundColor = isDarkTheme ? "#FFFFFF" : "#0E151B";
        
        
    };
    
    
    useEffect(() => {
        const meeting = async () => {
            const appID = 1481648916;
            const serverSecret = "b61d7a9c5ab1e42ed0d21e9caba79b1f";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                Date.now().toString(),
                name // Use name from location state
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: containerRef.current,
                layout:"Grid",
                sharedLinks:[
                    {
                        name: 'Room Id',
                    url:
                    
                    
                    roomID,

                    }
                ],
                showTextChat:"block",
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
                lowerLeftNotification:false,
                showRoomDetailsButton:true,
            });
        };

        if (containerRef.current) {
            meeting();
        }

        // Additional logic to modify styles of specific elements
        const additionalElements = document.querySelectorAll('.QAHxuJxRZWb3P_cbR8QA, .ji5jASszKFf2CGCmbxEh');
        const additionalElements1 = document.querySelectorAll('.D9WLyEQaARfWqCTyVrpU');
        const additionalElements2 = document.querySelectorAll('._M8cCug8H18ALQ05cNMt','.pOvRwHj19chJGkgemUH3');
        const additionalElements3 = document.querySelectorAll('.w8s9gCKilsV7YNRW_ZqU');

        additionalElements.forEach(element => {
            // Modify the styles of the elements as needed
            // Example:
            element.style.backgroundColor = isDarkTheme ? "#000000" : "#FFFFFF";
            element.style.color = isDarkTheme ? "#FFFFFF" : "#000000";
        });
        additionalElements1.forEach(element => {
            // Modify the styles of the elements as needed
            // Example:
            element.style.backgroundColor = isDarkTheme ? "#0E151B" : "#FFFFFF";
            element.style.color = isDarkTheme ? "#FFFFFF" : "#000000";
            element.style.boxShadow = isDarkTheme ? "0px 14px 24px 0px rgba(0, 0, 0, 0.1)" : "0px 14px 24px 0px rgba(14, 21, 27, 0.1)";
        });
        additionalElements2.forEach(element => {
            // Remove existing classes
            element.classList.remove('dark-custom-class', 'light-custom-class');
        
            // Add the appropriate class based on the isDarkTheme state
            if (isDarkTheme) {
                element.classList.add('light-custom-class');
            } else {
                element.classList.add('dark-custom-class');
            }
        });
        
    }, [roomID, isDarkTheme, name]); // Include name in dependency array

    return (
        <div>
            <div style={{  padding: "5px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={isDarkTheme ? logoDark : logoLight} alt="Logo" style={{ width: "75px", height: "auto",marginLeft: "5px",padding:"2px"}} />
                    <img src={isDarkTheme ? textDark : textLight} alt="Text" style={{ width: "360px", height: "auto", marginLeft: "5px" }} />
                </div>
            </div>
            <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: "999", borderRadius: "50px" }}>
                <button 
                    onClick={toggleTheme} 
                    className="theme-button" 
                    style={{ cursor: "pointer", borderRadius: "50%" }} // Setting border-radius to make the button fully round
                >
                    <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} className="theme-icon" size="2x" />
                </button>
            </div>
            <div ref={containerRef} style={{ width: "100vw", height: "calc(100vh - 117px)" }}>
                {/* Video container will be mounted here */}
            </div>
        </div>
    );
};

export default Room;



