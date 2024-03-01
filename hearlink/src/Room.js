import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";


const Room = () => {
    const { roomID } = useParams();
    const meeting = async (element) => {
    
        const appID = 1481648916;
        const serverSecret = "b61d7a9c5ab1e42ed0d21e9caba79b1f";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          Date.now().toString(),
          "andrei"//cnange
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
    
        zp.joinRoom({
          container: element,
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
        });
      };

      return <div ref={meeting} style={{ width: "100vw", height: "calc(100vh - 64px)" }}></div>
      





};


export default Room;