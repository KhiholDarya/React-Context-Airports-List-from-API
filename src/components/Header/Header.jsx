import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const currentUser = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/signIn");
	}


  return (
    <div
      style={{
        height: "100px", // wysokość100px
        width: "100%", // szerokość 100%
        backgroundColor: "#f8d7da", // kolor tła
        display: "flex", // flexbox
        justifyContent: "center", // wyśrodkowanie w poziomie
        alignItems: "center", // wyśrodkowanie w pionie
        gap: "100px", // odstęp między elementami
      }}
    >
       {currentUser && (
        <>
          <p> You are logged as: {currentUser.username}</p>
          <button onClick={handleLogout}>Log out</button>
        </>
      )}
    </div>
  );
};

export default Header;