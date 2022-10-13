import DesktopHeader from "./Header/DesktopHeader";
import {Routes, Route} from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import Error404Page from "../staticPage/404";
import {useAuthContext} from "../context/AuthContext";
import LogoutPage from "./Pages/LogoutPage";
import UniversitiesPage from "./Pages/UniversitiesPage";
import SearchPage from "./Pages/SearchPage";

export default function UserInterface() {
    const ctx = useAuthContext();
    return <>
        <DesktopHeader/>
        <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="/universities" element={<UniversitiesPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="logout" element={<LogoutPage/>}/>
            <Route path="*" element={<Error404Page/>}/>
        </Routes>
    </>
}