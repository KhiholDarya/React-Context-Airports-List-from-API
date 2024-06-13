import "./DashboardContent.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// import Button from "../Button/Button";
import UserForm from "../UserForm/UserForm";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";

function DashboardContent() {
  const [isUserFromVisible, setIsUserFromVisible] = useState(false);
  useAuth();

  return (
    <>
      <Button
        color="success"
        onClick={() => setIsUserFromVisible((prevState) => !prevState)}
      >
        Show / Hide User From
      </Button>
      <Link to={"users"}>
        <Button text="Users list" />
      </Link>
      {isUserFromVisible && <UserForm />}
    </>
  );
}

export default DashboardContent;
