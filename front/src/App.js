import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider} from "@mui/material";
import {AuthContextProvider} from "./context/AuthContext"
import UserInterface from "./user/UserInterface";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminInterface from "./admin/AdminInterface";

const theme = responsiveFontSizes(createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
  }
}));


export default function App(){
  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="admin/*" element={<AdminInterface/>}/>
            <Route path="/*" element={<UserInterface/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  </>
}