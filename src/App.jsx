import DoctorManagement from "./Components/DoctorSection/DoctorManagement";
import DoctorManagement7 from "./Components/DoctorSection/DM7";
import MiniDrawer from "./Drawer";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#55fff9ff",
    },
    secondary: {
      main: "#000000ff",
    },
    background: {
      default: "#ffffffff",
      paper: "#ffffffff",
    },
  },
});

function App() {
  return (
    // The ThemeProvider makes the theme available to all components inside it.
    <ThemeProvider theme={darkTheme}>
      {/* CssBaseline is a simple utility to normalize styles */}
      <CssBaseline />

      {/* Now, we render the MiniDrawer as the main layout of our app */}
      <MiniDrawer />
      {/* <DoctorManagement7 /> */}
    </ThemeProvider>
  );
}

export default App;
