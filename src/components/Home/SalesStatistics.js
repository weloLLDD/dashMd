import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title"> Vente par mois</h5>
 

          <iframe
            title="Content Frame 56"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
               width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-dbmudulix-pzodzxc/embed/charts?id=ece1e703-c8d4-4564-bb47-6e8d4c20b940&maxDataAge=14400&theme=light&autoRefresh=true"
          ></iframe>

          {/* rapport */}
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
