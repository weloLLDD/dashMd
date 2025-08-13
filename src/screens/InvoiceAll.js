import React from "react";
import Header from "../components/Header"; 
import Sidebar from "../components/sidebar";
import InvoiceGrouped from "../components/InvoiceGrouped";

const InvoiceAll = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
    
        <InvoiceGrouped/>
      </main>
    </>
  );
};

export default InvoiceAll;
