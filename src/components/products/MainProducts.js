 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProduct } from "../../Redux/Action/ProductAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: succesDelete } = productDelete;

  // 🆕 États pour recherche, filtrage et pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); // all, Electronics, Clothings...
  const [itemsToShow, setItemsToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch, succesDelete]);

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProduct(id));
    }
  };

  // 1. Filtrer par recherche
  let filteredProducts = products
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // 2. Filtrer par catégorie
  if (categoryFilter !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === categoryFilter
    );
  }

  // 3. Pagination basique
  const startIndex = (currentPage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / itemsToShow);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Articles</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            {/* Recherche */}
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="search"
                placeholder="Search by name or description..."
                className="form-control p-2"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset pagination
                }}
              />
            </div>

            {/* Filtre catégorie */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothings">Clothings</option>
                <option value="Something else">Something else</option>
              </select>
            </div>

            {/* Nombre à afficher */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={itemsToShow}
                onChange={(e) => {
                  setItemsToShow(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>Show 10</option>
                <option value={20}>Show 20</option>
                <option value={30}>Show 30</option>
                <option value={50}>Show 50</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant={"alert-danger"}>{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant={"alert-danger"}>{error}</Message>
          ) : (
            <>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantite</th>
                        <th>Prix</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedProducts.map((product, index) => (
                        <tr key={product._id}>
                          <td>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" />
                            </div>
                          </td>
                          <td>{index + 1 + (currentPage - 1) * itemsToShow}</td>
                          <td>
                            <b>{product.name}</b>
                          </td>
                          <td>{product.description}</td>
                          <td>{product.countInStock}</td>
                          <td>{product.price}</td>
                          <td className="text-end">
                            <div className="dropdown">
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                className="btn btn-light"
                              >
                                <i className="fas fa-ellipsis-h"></i>
                              </Link>
                              <div className="dropdown-menu">
                                <Link
                                  to={`/product/${product._id}/edit`}
                                  className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                                >
                                  <i className="fas fa-pen"></i>
                                </Link>
                                <Link
                                  to="#"
                                  onClick={() => deletehandler(product._id)}
                                  className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <nav className="float-end mt-4" aria-label="Page navigation">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
