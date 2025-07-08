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
          <button className="btn-countdown" style={{ background: "#EADEB4", color: "#000", border: "none", borderRadius: "10px", padding: "0.4em 1em" }}>
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
        src="data:image/jpeg;base64,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"
        alt="Campaign"
        style={{width:'100%', height:"50%"}}
      />
    </div>
  );
};

export default Card;