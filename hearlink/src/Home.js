import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backLogo from "../src/images/sideImg.png";
import logo1 from "../src/images/hearlink text1.png";
import logo2 from "../src/images/Hearlink Logo.png";
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

            <div className="logo">
              <img src={logo2} className="logo2"></img>
              <img src={logo1} className="logo1"></img>
            </div>
            <div className="background_img">
              <img src={backLogo} alt="backLogo" className="object-cover" />
            </div>

          
            
            <div className="main_login">
              
              
    
              <br/>
              <br/>
              <div className="main_details">
               
                <div className="login_detail">
                  <h1 className="main_name"> LOGIN</h1>
                  <p className="welcome"> Welcome to HearLink</p>
                </div>


                
                <form onSubmit={submitCode} className="text-white">
                <div className="lobby_code ">
                  <label className="lable">Name</label>
                  
                  <input
                    type="text"
                    required
                    placeholder="Enter Name"
                    className="input_code" id = "name"></input>
                  <br/>
                  
                  <label className="lable">Select Your Type</label>  
  
                  <select id = "Your_type" className="input_code">
                    <option id = "Deaf">I am a Deaf User</option>
                    <option id = "Healthy">I am a Healthy User</option>
                  </select>
                  <br/>

                  <label className="lable">
                    Enter lobby Code
                  </label>
                  
                  <input
                    type="text"
                    required
                    placeholder="Enter Room Code"
                    value={RoomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
    
                    className="input_code"
                  />
                </div>
                <button
                  type="submit"
                  className="submit_button"

                >
                  Go
                </button>
              </form></div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Home;
    