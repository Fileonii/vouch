
import React, { Fragment } from 'react'
import HistoryRounded from "@mui/icons-material/HistoryRounded"
import logo from "../styles/img/logo.png"
export default function AppHeader() {
    return (
        <header className="app-header">
            <div className="app-header-label"><img src={logo} width="200px" /></div>
            <div className="app-header-history"><HistoryRounded fontSize="large"></HistoryRounded></div>
        </header>


    )
}
