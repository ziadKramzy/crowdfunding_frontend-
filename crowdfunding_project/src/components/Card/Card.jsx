import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import axiosInstance from "../../apis/config";

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
    text && text.length > maxLength ? `${text.substring(0, maxLength)}...` : text || "";

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);

  const formatDate = (dateString) => {
    try {
      return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
    } catch {
      return "N/A";
    }
  };

  const calculateDaysRemaining = (startDate, endDate) => {
    try {
      if (!startDate || !endDate) return "Invalid dates";
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();
      if (today < start) {
        const daysUntilStart = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
        return `${daysUntilStart} days until start`;
      }
      if (today <= end) {
        const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return daysRemaining === 1 ? "1 day left" : `${daysRemaining} days left`;
      }
      return "Campaign ended";
    } catch {
      return "Invalid dates";
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
      return;
    }
    setIsDeleting(true);
    try {
      const response = await axiosInstance.delete(`projects/${id}/delete/`);
      navigate("/campaigns", {
        replace: true,
        state: { message: "Campaign deleted successfully" }
      });
    } catch (error) {
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

  const handleView = () => {
    navigate(`/campaign-details/${id}`);
  };

  const handleEdit = () => {
    navigate(`/campaign/edit/${id}`);
  };

  return (
    <div className="card-hover">
      <div className="card-hover__content">
        <h3 className="card-hover__title">
          {title && title.length > 20 ? `${title.substring(0, 20)}...` : title || "Untitled Campaign"}
        </h3>
        <p className="card-hover__text">
          {truncateDescription(description, 70)}
        </p>
        <div style={{ margin: "1em 0", fontWeight: 600 }}>
          Target: {formatCurrency(target_amount)}
        </div>
        <div style={{ fontSize: "0.9em", marginBottom: "0.5em" }}>
          <span>Start: {formatDate(start_date)}</span>
          <br />
          <span>End: {formatDate(end_date)}</span>
        </div>
        <div style={{ marginBottom: "1em" }}>
          <button className="btn-countdown" style={{ background: "#2d7f0b", color: "#fff", border: "none", borderRadius: "4px", padding: "0.4em 1em" }}>
            {calculateDaysRemaining(start_date, end_date)}
          </button>
        </div>
        <div className="action-buttons" style={{ display: "flex", gap: "0.5em", justifyContent: "center" }}>
         
          {showControls && (
            <>
             <button className="action-btn btn-view" onClick={handleView}>
            View
          </button>
              <button
                className="action-btn btn-edit"
                onClick={handleEdit}
                disabled={isDeleting}
              >
                Edit
              </button>
              <button
                className="action-btn btn-delete"
                onClick={() => handleDelete(id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </>
          )}
        </div>
        {/* Only show "See More" when showControls is false */}
        {!showControls && (
          <a href="#" className="card-hover__link" tabIndex={-1}>
            <span
              className="view-btn"
              onClick={handleView}
              style={{ cursor: "pointer" }}
            >
              See More
            </span>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        )}
      </div>
      <div className="card-hover__extra">
    
      </div>
      <img
        src="https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60"
        alt="Campaign"
      />
    </div>
  );
};

export default Card;