import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function PrivatePage() {
  const [currentUser, setCurrentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) return ""; 

    //decode token to get username info
    try {
      const decodedToken = jwtDecode(jwtToken);
      return decodedToken.username || "";
    } catch {
      return "";
    }
  });

  const navigate = useNavigate();

  //verify JWT on component mount and redirect if invalid
  useEffect(() => {
    const jwtToken = Cookies.get("jwt-authorization"); 

    if (!jwtToken) {
      navigate("/login");
      return;
    }

    try {
      jwtDecode(jwtToken); // Try decoding the token
      // If decoding is successful, token is valid
    } catch (error) {
      console.error("Invalid JWT", error); // Log error for debugging
      // Redirect to login if token is invalid
      navigate("/login");
    }
  }, [navigate]); //empty dependarray ensures this runs only once on mount

  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    setCurrentUser("");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome {currentUser}</h1>
      <h1>Private Page</h1>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}