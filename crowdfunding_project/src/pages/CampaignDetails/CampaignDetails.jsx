import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import "../CreateCampaign/CampaignForm.css";
import "./CampaignDetails.css";

 const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  let handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;
    try {
      await axiosInstance.delete(`projects/${id}/delete/`);
      navigate("/");
    } catch (err) {
      alert("Failed to delete campaign.");
    }
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axiosInstance.get(`projects/${id}/`);
        setCampaign(response.data);
      } catch (err) {
        setError("Failed to load campaign details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading)
    return (
      <div className="campaignform-bg">
        <div className="campaignform-card">
        <div className="d-flex justify-content-center align-items-center vh-100">
  <div className="spinner-border text-info" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

          <div className="campaignform-body" style={{ textAlign: "center" }}>
            <span className="spinner"></span>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="campaignform-bg">
        <div className="campaignform-card">
          <div className="campaignform-header">
            <h2 className="campaignform-title">Error</h2>
          </div>
          <div className="campaignform-body" style={{ textAlign: "center", color: "#a63d2a" }}>
            {error}
          </div>
        </div>
      </div>
    );

  return (
    <div className="campaignform-bg">
      <div className="campaignform-card">
        <div className="campaignform-header">
          <h2 className="campaignform-title">{campaign.title}</h2>
        </div>
        <div className="campaignform-body">
          {campaign.image && (
            <img
              src={`https://res.cloudinary.com/ddtp8tqvv/${campaign.image}`}
              alt={campaign.title}
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover", marginBottom: "1em" }}
            />
          )}
          <p>
            <strong>Description:</strong> {campaign.description}
          </p>
          <p>
            <strong>Target Amount:</strong> ${campaign.target_amount}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(campaign.start_date).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(campaign.end_date).toLocaleDateString()}
          </p>
          {campaign.owner == userId && (
            <div style={{ display: "flex", gap: "1em", justifyContent: "center", marginTop: "2em" }}>
              <button
                className="btn-countdown-camp"
                onClick={() => navigate(`/campaign/edit/${campaign.id}`)}
              >
                Edit
              </button>
              <button className="btn-cancel" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "2em" }}>
            <button className="btn-cancel" onClick={() => navigate("/")}>
              Back to Campaigns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails