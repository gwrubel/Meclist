import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { jwtDecode } from "jwt-decode";


function Dashboard() {
    const [nome, setnome] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          setnome(decodedToken.name);
        }
      }, []);

    return(
        <div className="home-page">
            <h1 className="background-logo">Mec<span>List</span></h1>
            <div className="content">
                <h1 className="title">Bem-vindo {nome}</h1>
                
            </div>
        </div>
    );
}

export default Dashboard;
