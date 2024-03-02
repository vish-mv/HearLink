import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import logoImage from "./assets/logo.png";
import textImage from "./assets/hearlink text1.png";

const Room = () => {
    const { roomID } = useParams();
    const containerRef = useRef(null);

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
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
            });
        };

        if (containerRef.current) {
            meeting();
        }
    }, [roomID]);

    return (
        <div>
            <div style={{ background: "#21262C", padding: "5px " }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={logoImage} alt="First Image" style={{ width: "80px", height: "auto",marginLeft: "5px",padding:"2px" }} />
                    <img src={textImage} alt="Second Image" style={{ width: "360px", height: "auto", marginLeft: "5px" }} />
                </div>
            </div>
            <div ref={containerRef} style={{ width: "100vw", height: "calc(100vh - 150px)" }}>
                {/* Video container will be mounted here */}
            </div>
        </div>
    );
};

export default Room;
