import { ScriptProps } from "next/script";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }: ScriptProps) {
    return (
        <React.Fragment>
            <Navbar></Navbar>
            <main className="mx-auto container">{children}</main>
            <Footer></Footer>
        </React.Fragment>
    )
}