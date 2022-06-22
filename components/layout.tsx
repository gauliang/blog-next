import { ScriptProps } from "next/script";
import React, { useEffect } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }: ScriptProps) {
    useEffect(() => {
        if ((window as any).navigator.standalone) {
            document.body.classList.add('standalone')
        }
    }, [])
    return (
        <React.Fragment>
            <Navbar></Navbar>
            <main className="mx-auto container">{children}</main>
            <Footer></Footer>
        </React.Fragment>
    )
}