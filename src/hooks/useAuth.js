import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const useAuth = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (!authUser || !authUser.username) {
      navigate("/login");
    }
  });
};

export default useAuth;
