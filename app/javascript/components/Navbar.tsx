import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
    display: flex;
    flexDirection: column;
    padding: 20px 40px 20px 40px;
    list-style-type: none;
    justify-content: flex-end;
    
    ul {
        text-decoration: none;
        list-style-type: none;
        text-align: left;
        
        a, a:visited, a:active {
            text-decoration: none;
            color: black;
        }
        a:hover {
          color: lightblue;
        }
        
        li {
            padding-top: 10px;
            font-size: 18px;
        }
    }
`

const Navbar = () => {
   return (
       <Nav>
           <ul>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/user-uploads">User Uploads</Link></li>
               <li><Link to="/user-profile">User Profile</Link></li>
           </ul>
       </Nav>
   );
}

export default Navbar;
