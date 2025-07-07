import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/config";
import Card from "../components/Card";

export const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axiosInstance.get("projects/");
        setCampaigns(response.data);
      } catch (err) {
        setError("Failed to load campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
    const newCampaign = localStorage.getItem("newCampaignAdded");
    if (newCampaign === "true") {
      fetchCampaigns();
      localStorage.removeItem("newCampaignAdded");
    }
  }, []);


  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">All Campaigns</h2>
      <div className="row">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => <Card key={campaign.id} {...campaign} showControls={campaign.owner == userId}/>)
        ) : (
          <div className="text-center mt-5">
            <p>there is no campaigns yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
