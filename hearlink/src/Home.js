import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backLogo from "../src/images/sideImg.png";
import logoImage from "./assets/Light_2.png";
import textImage from "./assets/hearlink text1.png";
import "../src/index.css"


 

const Home = () => {
    const [RoomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const submitCode = (e) => {
        e.preventDefault();
        navigate(`/room/${RoomCode}`);
      };


      return (
        <div className=" ">
          <div className="main">

          <div style={{  padding: "5px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={logoImage} alt="First Image" style={{ width: "200px", height: "auto",margin: "20px",padding:"2px",position:"absolute",top:0, right:0}} />
                    <img src={textImage} alt="Second Image" style={{ width: "360px", height: "auto", marginLeft: "5px" }} />
                </div>
                
            </div>
            
          
            
            <div className="main_login">
    
              <><br /><br /><div className="main_details">

          <div className="login_detail">
            <h1 className="main_name"> LOGIN</h1>
          </div>



          <form onSubmit={submitCode} className="text-white">
            <div className="lobby_code ">
              <label className="lable">Name</label>

              <input
                type="text"
                required
                placeholder="Enter Name"
                className="input_code" id="name"></input>
              <br />

              <label className="lable">Select Your Type</label>

              <select id="Your_type" className="input_code">
                <option id="Deaf">I am a Deaf User</option>
                <option id="Healthy">I am a Healthy User</option>
              </select>
              <br />

              <label className="lable">
                Enter lobby Code
              </label>

              <input
                type="text"
                required
                placeholder="Enter Room Code"
                value={RoomCode}
                onChange={(e) => setRoomCode(e.target.value)}

                className="input_code" />
            </div>
            <button
              type="submit"
              className="submit_button"

            >
              Go
            </button>
          </form></div></>
            </div>
            
          </div>
        </div>
      );
    };
    
    export default Home;
    