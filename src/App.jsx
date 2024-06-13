import "./App.css";
import Paragraph from "./components/Paragraph/Paragraph";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import { UsersProvider } from "./context/usersContext";
import { AirportsProvider } from "./context/airportsContext";
function App() {
  // disabled for make session more flexible and easier to test
  // useAuth();

  return (
    <AppWrapper>
      <UsersProvider>
			<AirportsProvider>
        <Header />
        <Content>
          <Outlet />
        </Content>
		</AirportsProvider>
      </UsersProvider>
      <Footer>
        <Paragraph paragraphText="Witaj w 2-gim semestrze" />
      </Footer>
    </AppWrapper>
  );
}

export default App;
