import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./LoadingError/Loading";
import Message from "./LoadingError/Error";
import moment from "moment";  
import { downloadGroupedReport } from "../Redux/Action/OrderAction";

const InvoiceGrouped = () => {
  const dispatch = useDispatch();
  const reportRef = useRef();

  const [selectedMonth, setSelectedMonth] = useState(moment().format("YYYY-MM"));
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");

  const orderReport = useSelector((state) => state.orderReport);
  const { loading, error, report } = orderReport; 

  useEffect(() => {
    dispatch(downloadGroupedReport(selectedMonth, category, userId));
  }, [dispatch, selectedMonth, category, userId]);

  const exportPDF = () => {
    const opt = {
      margin: 0.5,
      filename: `rapport_group_${selectedMonth}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(reportRef.current).save();
  };

  const productReport = report?.products || [];
  const totalGeneral = report?.totalRevenue || 0;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Rapport de Vente Groupé</h4>
        <div className="d-flex gap-2">
          <input
            type="month"
            className="form-control"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={exportPDF} className="btn btn-success">
            Exporter PDF
          </button>
        </div>
      </div>

      <div ref={reportRef} className="card shadow p-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-primary text-center">
                <tr>
                  <th>Produit</th>
                  <th>Quantité totale</th>
                  <th>CA</th>
                  <th>Nombre commandes</th>
                </tr>
              </thead>
              <tbody>
                {productReport.length > 0 ? (
                  productReport.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <td>{item.name}</td>
                      <td>{item.totalQty}</td>
                      <td>{item.totalRevenue.toLocaleString()} $</td>
                      <td>{item.totalOrders}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Aucun produit trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="table-light text-center fw-bold">
                <tr>
                  <td colSpan="2">Total Général</td>
                  <td colSpan="2">{totalGeneral.toLocaleString()} $</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceGrouped;
