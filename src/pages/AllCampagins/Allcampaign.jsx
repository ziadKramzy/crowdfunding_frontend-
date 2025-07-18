import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../apis/config";
import Card from "../../components/Card/Card";

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
    refetch,
  } = useQuery({
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
    <div className="container mt-lg-5 pt-lg-5">
      <h1 className="text-center pe-5 pt-5" style={{ color: "#123F76" }}>
        Campaigns
      </h1>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="text-danger text-center mt-5">{error?.message || "Failed to load campaigns."}</div>
      ) : (
        <div className="row pt-lg-5 ">
          {campaigns.length === 0 ? (
            <div className="text-center text-muted">No campaigns found.</div>
          ) : (
            campaigns.map((campaign) => (
              <div className="col-md-4 mb-4" key={campaign.id}>
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
