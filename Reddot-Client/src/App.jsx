import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Routers from "./Routers/Routers";
import Navbar from "./Components/Toolbar/Navbar";
import Sidebar from "./Components/Toolbar/Sidebar";
import { Theme } from "./Themes/Theme";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const excludeRoutes = ["/users/login", "/users/register"];
  const isSidebarExcluded = excludeRoutes.includes(location.pathname);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <div style={{ display: "flex", height: "80vh" }}>
        {!isSidebarExcluded && (
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <div
          style={{
            flex: 1,
            marginLeft: sidebarOpen && !isSidebarExcluded ? "240px" : "0px",
            paddingLeft:"10px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Navbar toggleSidebar={toggleSidebar} />
          <Routers />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;