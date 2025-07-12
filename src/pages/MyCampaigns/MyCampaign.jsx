import {useEffect, useState } from "react"; // Add useContext import
import axiosInstance from "../../apis/config";
import Card from "../../components/Card/Card";

const MyCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const userCampaigns = campaigns.filter(
    (campaign) => campaign.owner == userId
  );

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
    if (newCampaign) {
      fetchCampaigns();
      localStorage.removeItem("newCampaignAdded");
    }
  }, []);

  if (loading)
    return (
  <div className="d-flex justify-content-center align-items-center vh-100">
  <div className="spinner-border text-info" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
    );

  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="mt-lg-4 ml-auto p-5">
      <h2 className="mb-5 text-center pt-5" style={{color: "#123F76"}}>My Campaigns</h2>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {userCampaigns.map((campaign) => {

          return (
            <Card
              key={campaign.id}
              {...campaign}
              showControls={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyCampaign;
