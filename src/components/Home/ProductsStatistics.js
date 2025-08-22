import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Vente par Jour</h5>
         
          {/*** graphiques products */}
          <iframe
          title="Content Frame 2"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px",
            }}
    
            src="https://charts.mongodb.com/charts-dbmudulix-pzodzxc/embed/charts?id=9138dd67-c9e4-422b-8e60-271fc26bad02&maxDataAge=14400&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
