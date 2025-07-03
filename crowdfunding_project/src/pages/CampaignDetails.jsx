import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/projects/${id}/`);
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
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{campaign.title}</h2>
      <div className="card p-4 shadow-sm">
        <p><strong>Description:</strong> {campaign.description}</p>
        <p><strong>Target Amount:</strong> ${campaign.target_amount}</p>
        <p><strong>Start Date:</strong> {new Date(campaign.start_date).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(campaign.end_date).toLocaleDateString()}</p>
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back to Campaigns
          </button>
        </div>
      </div>
    </div>
  );
};
