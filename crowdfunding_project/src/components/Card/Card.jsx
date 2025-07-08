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
      
      // If campaign hasn't started yet, show days until start
      if (today < start) {
        const daysUntilStart = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
        return `${daysUntilStart} days until start`;
      }
      
      // If campaign is ongoing, show days remaining
      if (today <= end) {
        const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return daysRemaining === 1 ? "1 day left" : `${daysRemaining} days left`;
      }
      
      // If campaign has ended
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
      console.log("Campaign deleted successfully:", response);
      
      navigate("/campaigns", {
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

  const handleView = () => {
    navigate(`/campaign-details/${id}`);
  };

  const handleEdit = () => {
    navigate(`/campaign/edit/${id}`);
  };

  return (
    <>
      <div className={`campaign-card green `}>
        <div className="card-header">
          <div className="date">
            Start: &nbsp; {formatDate(start_date)}

          </div>
          <div className="date">
           End:&nbsp; {formatDate(end_date)}

          </div>
          
        </div>

        <div className="card-body">
          <h3 className="card-title">
            {title && title.length > 20 ? `${title.substring(0, 20)}...` : title || "Untitled Campaign"}
          </h3>
          <p className="card-description">
            {truncateDescription(description, 50)}
          </p>
          <div className="progress-section">
            <span className="progress-label">Target</span>
            <div className="progress-bar"></div>
            <span className="progress-text">{formatCurrency(target_amount)}</span>
          </div>
        </div>

        <div className="card-footer">
          <button className="btn-countdown">
            {calculateDaysRemaining(start_date, end_date)}
          </button>
        </div>

        <div className="action-buttons">
          <button
            className="action-btn btn-view"
            onClick={handleView}
          >
            View
          </button>
          
          {showControls && (
            <>
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
      </div>
    </>
  );
};

export default Card;