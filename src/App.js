import React from "react";
import Navbar from "./components/UI/navbar/Navbar";
import './styles/App.css';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./components/AppRoutes";

function App() {

    return (
        <BrowserRouter>
            <ChakraProvider>
                <Navbar/>
                <AppRoutes/>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
