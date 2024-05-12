import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotesContextProvider from "./context/NotesProvider";
import UserContextProvider from "./context/UserProvider";

const Layout = () => {
  return (
    <>
      <UserContextProvider>
        <NotesContextProvider>
          <Header />
          <Outlet />
          <Footer />
        </NotesContextProvider>
      </UserContextProvider>
    </>
  );
};

export default Layout;
