import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../apis/config";
import Card from "../../components/Card/Card";

 const Allcampaign = () => {
  const location = useLocation();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    // Simple date regex: YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    let title = "";
    let start = "";
    let end = "";
    if (search) {
      if (dateRegex.test(search)) {
        // If search string is a date, use as both start and end
        start = search;
        end = search;
      } else {
        title = search;
      }
    } // If search is empty, leave title/start/end as empty strings to fetch all

    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "projects/search/";
        if (title || start || end) {
          url += "?";
          const urlParams = [];
          if (title) urlParams.push(`title=${encodeURIComponent(title)}`);
          if (start) urlParams.push(`start_date=${encodeURIComponent(start)}`);
          if (end) urlParams.push(`end_date=${encodeURIComponent(end)}`);
          url += urlParams.join('&');
        }
        const response = await axiosInstance.get(url);
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
  }, [location.search]);


  return (
    <div className="container mt-lg-5 pt-lg-5">
          <h1 className="text-center pe-5 pt-5" style={{color: "#123F76"}}>Campaigns</h1>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-danger text-center mt-5">{error}</div>
      ) : (
        <div className="row pt-lg-5 ">
          {campaigns.length === 0 ? (
            <div className="text-center text-muted">No campaigns found.</div>
          ) : (
            campaigns.map(campaign => (
              <div className="col-md-4 mb-4" key={campaign.id}>
                <Card {...campaign} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Allcampaign
