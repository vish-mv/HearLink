import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backLogo from "../src/assets/backLogo.png";

 

const Home = () => {
    const [RoomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const submitCode = (e) => {
        e.preventDefault();
        navigate(`/room/${RoomCode}`);
      };


      return (
        <div className=" ">
          {/* Hero */}
          <div className="relative h-screen ">

          <div className="absolute max-h-[30rem] flex overflow-hidden">
            <img src={backLogo} alt="backLogo" className="object-cover  w-full h-full" />
          </div>

            {/* Overlay */}
            <div className="absolute h-full w-full flex overflow-hidden bg-black/60"></div>
            {/* Hero Info */}
            <div className="lg:flex lg:pt-20 flex-col items-center justify-center relative z-10 px-6 md:max-w-[90vw] mx-auto">
              {/* Main */}
              <div className=" flex flex-col items-center justify-center pb-8">
                <h1 className="text-[50px] md:text-[80px] text-white font-bold pt-12">
                  HearLink
                </h1>
                
              </div>
    
              {/* Hero Info */}
              <div className="relative z-10 px-4">
                {/* Main */}
                <div className="pb-8">
                  <h1 className="text-[56px] text-white font-bold"> Video Chat App</h1>
                  <p className="text-[26px] text-white -mt-2"> Welcome to HearLink</p>
                </div>


                {/* Enter code*/}
                <form onSubmit={submitCode} className="text-white">
                <div className="flex flex-col justify-center ">
                  <label className="text-[30px] font-bold">
                    Enter Room Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Room Code"
                    value={RoomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
    
                    className="py-1.5 md:py-2 px-4 rounded-full max-w-[14rem] mt-2 text-black md:mt-6 outline-0"
                  />
                </div>
                <button
                  type="submit"
                  className=" bg-blue-500 hover:bg-blue-400 duration-100 ease-out font-bold w-[5rem] md:w-[7rem] rounded-full py-[5px] md:py-[7px] mt-2 md:mt-4 "

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
    