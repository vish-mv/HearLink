import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backLogo from "../src/images/sideImg.png";
import textImage from "./assets/hearlink text2.png";
import "../src/index.css"
import "./assets/Home.css"
import FloatingBalls from "./FloatingBalls";




const Home = () => {
    const [RoomCode, setRoomCode] = useState("");
    const [name, setName] = useState(""); // State to manage the name
    const navigate = useNavigate();

    const submitCode = (e) => {
        e.preventDefault();
        navigate(`/room/${RoomCode}`, { state: { name } }); // Pass the name as state
      };


      return (
        <div className="body-home">
          <FloatingBalls /> 
          <div className="main">
          <div className="main_login">
            
          <div className="main_details">

          <div className="logo" >
             <img src={textImage} alt="SecondImage" style={{ width: "360px", height: "auto", marginLeft: "5px",}}/>
          </div>
          <br></br>
          <br></br>
            
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
                    className="input_code" 
                    id="name" 
                    value={name} // Set value to name state
                    onChange={(e) => setName(e.target.value)} // Update name state
                  />
            </div>
            <br></br>

            

            
            <hr className="line"></hr>
            <br></br>

            <div className="lobby_code ">

              <label className="lable">
                Enter lobby Code
              </label>

              <input
                type="text"
                required
                placeholder="Enter Room Code"
                className="input_code" 
                value={RoomCode}
                onChange={(e) => setRoomCode(e.target.value)}></input>

            </div>
            <br></br>
            <button
              type="submit"
              className="submit_button"
            >
              Join Lobby
            </button>
          </form></div>
            
            <div className="background_img">
              <img src={backLogo} alt="backLogo" className="object-cover" />
            </div>
            </div>
            
          </div>
        </div>
      );
    };
    
    export default Home;

    