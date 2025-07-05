import { useContext, useEffect, useState } from "react"; // Add useContext import
import axiosInstance from "../apis/config";
import Card from "../components/Card";
import { UserContext } from '../UserContext';

const MyCampaign = () => {
  let {userLogin, setUserLogin} = useContext(UserContext)
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const userId =  userLogin?.user?.id;
  const userCampaigns = campaigns.filter(campaign => campaign.owner === userId);

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
    
    const newCampaign = localStorage.getItem('newCampaignAdded');
    if (newCampaign === 'true') {
      fetchCampaigns();
      localStorage.removeItem('newCampaignAdded');
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
      <h2 className="mb-4 text-center">My Campaigns</h2>
      <div className="row justify-content-center">
        {userCampaigns.length > 0 ? (
          userCampaigns.map((campaign) => (
            <Card key={campaign.id} {...campaign} />
          ))
        ) : (
          <div className="text-center mt-5">
            <p>You haven't created any campaigns yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCampaign;