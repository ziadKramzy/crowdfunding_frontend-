import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/config";
import Card from "../components/Card/Card";

export const Allcampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
      <div className="text-center mt-5 py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="mt-lg-5 ml-auto p-5">
      <h2 className="mb-5 text-center fs-1" style={{color:'#123F76'}}>All Campaigns</h2>
      <div className="d-flex flex-wrap gap-4 justify-content-center"  >
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => 
         
            <Card key={campaign.id} {...campaign} />
           
          )
        ) : (
          <div className="text-center mt-5">
            <p>there is no campaigns yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
