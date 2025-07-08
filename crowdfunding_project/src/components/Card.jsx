import React, { useState } from "react";
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
  showControls = false,
}) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await axiosInstance.delete(`projects/${id}/delete/`);
      console.log("Campaign deleted successfully:", response);
      
      
      navigate("/campaigns/:id", { 
        replace: true,
        state: { message: "Campaign deleted successfully" }
      });
      
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      
      if (error.response?.status === 404) {
        alert("Campaign not found. It may have already been deleted.");
      } else if (error.response?.status === 403) {
        alert("You don't have permission to delete this campaign.");
      } else {
        alert("Failed to delete campaign. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
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
          <button
            className="btn btn-primary w-100 mb-2"
            onClick={() => navigate(`/campaign-details/${id}`)}
          >
            View Details
          </button>
          
          {showControls && (
            <div className="d-flex justify-content-between gap-2">
              <button
                className="btn btn-info text-white flex-fill"
                onClick={() => navigate(`/campaign/edit/${id}`)}
                disabled={isDeleting}
              >
                Edit
              </button>
              <button
                className="btn btn-danger flex-fill"
                onClick={() => handleDelete(id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;