import "./App.css";
import { Outlet } from "react-router-dom";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import useAuth from "./hooks/useAuth";
import Paragraph from "./components/Paragraph/Paragraph";

function App() {
	useAuth();

  return (
    <AppWrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <Paragraph paragraphText="Zadanie zaliczeniowe - sem 2" />
      </Footer>
    </AppWrapper>
  );
}

export default App;