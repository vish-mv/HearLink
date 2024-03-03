import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import logoImage from "./assets/logo.png";
import textImage from "./assets/hearlink text1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "../src/index.css"

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
                "andrei" // Change this as necessary
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: containerRef.current,
                layout:"Grid",
                showTextChat:"block",
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
                
                //showPreJoinView:false,
                lowerLeftNotification:false,
                showRoomDetailsButton:true,
                
            });
        };

        // Assuming you want to change the styles of an element with class name 'M4HRY2n7rpNAd1UjDNZe'
            const Message_elements = document.querySelectorAll('.M4HRY2n7rpNAd1UjDNZe');

            // Loop through each element and modify its styles
            Message_elements.forEach(Message_element => {
                Message_element.style.display = 'block'; // Change the display property to block
                Message_element.style.width = '340px'; // Change other properties as needed
            });

            const MessageButton_elements = document.querySelectorAll('.aUBcrib1jsrHTK9vhlVZ');

            // Loop through each element and modify its styles
            MessageButton_elements.forEach(MessageButton_element => {
                // MessageButton_element.style.display = 'none'; 
            });




        if (containerRef.current) {
            meeting();
        }
    }, [roomID]);

   

    return (
        <div>
            <div style={{ background: "#21262C", padding: "5px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={logoImage} alt="First Image" style={{ width: "80px", height: "auto",marginLeft: "5px",padding:"2px",position:"absolute",top:0, right:0}} />
                    <img src={textImage} alt="Second Image" style={{ width: "360px", height: "auto", marginLeft: "5px" }} />
                </div>
                
            </div>
            <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: "999" ,borderRadius :"50px"}}>
                <button 
                    onClick={toggleTheme} 
                    className="bg-gray-500 text-gray-800 font-semibold hover:text-white py-5 px-5 rounded-full flex items-center" 
                    style={{ cursor: "pointer" }}
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
