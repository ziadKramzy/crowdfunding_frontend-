import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../apis/config";
import Card from "../../components/Card/Card";
import "./Allcampagin.css";

const fetchCampaigns = async ({ queryKey }) => {
  const [_key, searchParams] = queryKey;
  let url = "projects/search";
  const urlParams = [];
  if (searchParams.title) urlParams.push(`title=${encodeURIComponent(searchParams.title)}`);
  if (searchParams.start) urlParams.push(`start_date=${encodeURIComponent(searchParams.start)}`);
  if (searchParams.end) urlParams.push(`end_date=${encodeURIComponent(searchParams.end)}`);
  if (urlParams.length) url += "?" + urlParams.join("&");
  const response = await axiosInstance.get(url);
  return response.data;
};

const Allcampaign = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchParams = {
    title: params.get("search") || "",
    start: params.get("start_date") || "",
    end: params.get("end_date") || "",
  };

  const {
    data: campaigns = [],
    isLoading,
    isError,
    error,
    refetch,} = useQuery({
    queryKey: ["campaigns", searchParams],
    queryFn: fetchCampaigns,
    staleTime: 10 * 60 * 1000, // 5 minutes
  });

  // Refetch if a new campaign was added (preserving your logic)
  if (localStorage.getItem("newCampaignAdded") === "true") {
    refetch();
    localStorage.removeItem("newCampaignAdded");
  }

  return (
    <div className="allCamp container">
      <div className="allCamp-header">
        <h1 className="allCamp-title text-center" style={{ color: "#123F76" }}>
          Campaigns
        </h1>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="text-danger text-center mt-5">{error?.message || "Failed to load campaigns."}</div>
      ) : (
        <div className="row g-4">
          {campaigns.length === 0 ? (
            <div className="text-center text-muted">No campaigns found.</div>
          ) : (
            campaigns.map((campaign) => (
              <div className="col-12 col-sm-6 col-lg-4" key={campaign.id}>
                <Card {...campaign} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Allcampaign;
