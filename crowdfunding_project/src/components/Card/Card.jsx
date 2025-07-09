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
  amount_raised,
  image 
}) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [amountRaised, setAmountRaised] = useState(amount_raised);
  const [targetAmount, setTargetAmount] = useState(target_amount);
  const [donateAmount, setDonateAmount] = useState("");
  const [donateError, setDonateError] = useState("");
  const [donateLoading, setDonateLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const truncateDescription = (text, maxLength = 100) =>
    text && text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text || "";

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

  const now = new Date();
  const ended = end_date ? new Date(end_date) < now : false;

  if (ended) {
    return null;
  }

  const calculateDaysRemaining = (startDate, endDate) => {
    try {
      if (!startDate || !endDate) return "Invalid dates";
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();
      if (today < start) {
        const daysUntilStart = Math.ceil(
          (start - today) / (1000 * 60 * 60 * 24)
        );
        return `${daysUntilStart} days until start`;
      }
      if (today <= end) {
        const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return daysRemaining === 1
          ? "1 day left"
          : `${daysRemaining} days left`;
      }
      return "Campaign ended";
    } catch {
      return "Invalid dates";
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this campaign? This action cannot be undone."
      )
    ) {
      return;
    }
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`projects/${id}/delete/`);
      navigate("/campaigns", {
        replace: true,
        state: { message: "Campaign deleted successfully" },
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

  const handleDonate = async (e) => {
    e.preventDefault();
    const amount = parseFloat(donateAmount);
    if (isNaN(amount) || amount <= 0) {
      setDonateError("Please enter a valid amount.");
      return;
    }
    setDonateLoading(true);
    setDonateError("");
    try {
      const response = await axiosInstance.post(`projects/${id}/donate/`, {
        amount,
      });
      setAmountRaised(response.data.campaign.amount_raised);
      setTargetAmount(response.data.campaign.target_amount);
      setShowDonate(false);
      setDonateAmount("");
    } catch (error) {
      setDonateError(
        error.response?.data?.error || "Failed to donate. Please try again."
      );
    } finally {
      setDonateLoading(false);
    }
  };

  console.log("image prop:", image);

  return (
    <div className="card-hover">
      <div className="card-hover__content">
        <h3 className="card-hover__title">
          {title && title.length > 20
            ? `${title.substring(0, 20)}...`
            : title || "Untitled Campaign"}
        </h3>
        <div style={{ margin: "1em 0", fontWeight: 600 }}>
          Target: {formatCurrency(targetAmount)}
        </div>
        <div style={{ margin: "0.5em 0", fontWeight: 600 }}>
          Amount Raised: {formatCurrency(amountRaised)}
        </div>
        <div style={{ marginBottom: "1em" }}>
          <button
            className="btn-countdown"
            style={{
              background: "#EADEB4",
              color: "#000",
              border: "none",
              borderRadius: "10px",
              padding: "0.4em 1em",
            }}
          >
            {calculateDaysRemaining(start_date, end_date)}
          </button>
        </div>
        <div
          className="action-buttons"
          style={{ display: "flex", gap: "0.5em", justifyContent: "center" }}
        >
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

        {!showControls && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1em",
              marginTop: "1em",
            }}
          >
            <a
              className="card-hover__link"
              tabIndex={-1}
              style={{
                opacity: 1,
                position: "static",
                transform: "none",
                padding: 0,
              }}
            >
              <span
                className="view-btn"
                onClick={handleView}
                style={{ cursor: "pointer", color: "#b6ffb3" }}
              >
                See More
              </span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{ marginLeft: 4 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            {userId !== null && (
              <button
                className="action-btn btn-donate"
                style={{
                  background: "#1b7a3a",
                  color: "#fff",
                  borderRadius: "1.2em",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
                onClick={() => setShowDonate(true)}
              >
                Donate
              </button>
            )}
          </div>
        )}
      </div>
      <div className="card-hover__extra"></div>
      <img
        src={
          image
            ? image.startsWith("http")
              ? image
              : `https://res.cloudinary.com/ddtp8tqvv/${image}`
            : "https://dummyimage.com/400x200/cccccc/000000&text=No+Image"
        }
        alt={title || "Campaign"}
        style={{ width: "100%", height: "50%", objectFit: "cover" }}
      />

      {showDonate && (
        <div className="donate-modal-overlay">
          <div className="donate-modal">
            <div className="donate-modal-header">
              <h3>Donate to {title}</h3>
              <span
                className="donate-modal-close"
                onClick={() => setShowDonate(false)}
              >
                &times;
              </span>
            </div>
            <form onSubmit={handleDonate}>
              <div className="donate-modal-body">
                <label
                  style={{ fontWeight: 600, marginBottom: 8, display: "block" }}
                >
                  Amount
                </label>
                <input
                  type="number"
                  min="1"
                  className="donate-input"
                  value={donateAmount}
                  onChange={(e) => setDonateAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  disabled={donateLoading}
                />
                {donateError && (
                  <div className="donate-error">{donateError}</div>
                )}
              </div>
              <div className="donate-modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowDonate(false)}
                  disabled={donateLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-countdown"
                  style={{ width: "auto", marginTop: "1em" }}
                  disabled={donateLoading}
                >
                  {donateLoading ? "Donating..." : "Donate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
