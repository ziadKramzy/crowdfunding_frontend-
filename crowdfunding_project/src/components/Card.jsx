import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/config";

const Card = ({
  id,
  title,
  description,
  target_amount,
  start_date,
  end_date,
  owner,
  showDelete = false,
  onDelete,
  showControls = false,
}) => {
  const navigate = useNavigate();

  const truncateDescription = (text, maxLength = 100) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  let handleDelete = async (id) => {
    const response = await axiosInstance.delete(`projects/${id}/delete/`);

    console.log(response);
    window.location.href = "/";
  };

  return (
    <div className="col-12 flex-grow-0 flex-md-grow-1 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm d-flex flex-column justify-content-between">
        <div className="card-body">
          <h5 className="card-title">
            {title.length > 50 ? `${title.substring(0, 50)}...` : title}
          </h5>
          <p className="card-text">{truncateDescription(description)}</p>
          <p className="card-text">
            <strong>Target:</strong> {formatCurrency(target_amount)}
          </p>
          <p className="card-text">
            <strong>Start:</strong> {formatDate(start_date)}
            <br />
            <strong>End:</strong> {formatDate(end_date)}
          </p>
        </div>

        <div className="card-footer bg-white border-0">
          {showControls && (
            <div className="d-flex justify-content-between mb-2">
              <button
                className="btn btn-info text-white w-50 me-2"
                onClick={() => navigate(`campaign/edit/${id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger w-50"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                Delete
              </button>
            </div>
          )}

          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate(`/campaign-details/${id}`)}
            >
              View
            </button>

            {showDelete && typeof onDelete === "function" && (
              <button className="btn btn-danger" onClick={() => onDelete(id)}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
