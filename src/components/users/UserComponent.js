import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Action/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const UserComponent = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  // 🆕 États pour recherche, statut, et pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | disabled
  const [itemsToShow, setItemsToShow] = useState(10); // 10, 20, 30...
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  // 1. Filtrer selon recherche (nom ou email)
  let filteredUsers = users
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // 2. Filtrer selon statut
  if (statusFilter === "active") {
    filteredUsers = filteredUsers.filter((u) => u.isAdmin === false);
  } else if (statusFilter === "disabled") {
    filteredUsers = filteredUsers.filter((u) => u.isAdmin === true);
  }

  // 3. Pagination basique
  const startIndex = (currentPage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / itemsToShow);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customers</h2>
        <div>
          <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            {/* Recherche */}
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Nombre à afficher */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={itemsToShow}
                onChange={(e) => {
                  setItemsToShow(Number(e.target.value));
                  setCurrentPage(1); // reset pagination
                }}
              >
                <option value={10}>Show 10</option>
                <option value={20}>Show 20</option>
                <option value={30}>Show 30</option>
                <option value={50}>Show 50</option>
              </select>
            </div>

            {/* Filtre statut */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">Status: all</option>
                <option value="active">Active only</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                {paginatedUsers.map((user) => (
                  <div className="col" key={user._id}>
                    <div className="card card-user shadow-sm">
                      <div className="card-header">
                        <img
                          className="img-md img-avatar"
                          src="images/favicon.png"
                          alt="User pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{user.name}</h5>
                        <div className="card-text text-muted">
                          {user.isAdmin ? (
                            <p className="m-0">Admin</p>
                          ) : (
                            <p className="m-0">User</p>
                          )}
                          <p>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

export default UserComponent;
