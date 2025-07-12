import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/config";
import Card from "../../components/Card/Card";
import "./Home.css";

import image2 from '../../assets/Images/istockphoto-1643578236-1024x1024.jpg'
import image1 from '../../assets/Images/pexels--section-img.jpg'

 const Home = () => {
  let navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 3;

  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);
  const paginatedCampaigns = campaigns.slice(
    (currentPage - 1) * campaignsPerPage,
    currentPage * campaignsPerPage
  );
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
     <div className="d-flex justify-content-center align-items-center vh-100">
  <div className="spinner-border text-info" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
    );

  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <>
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero_content">
          <h1 className="home-hero-title">Empower Ideas, Fund Dreams</h1>
          <div className="explore">
            <p className="home-hero-desc">Discover inspiring campaigns or start your own journey today.</p>
            <button className="home-hero-btn" onClick={() => navigate("/create-campaign")}>Start Now</button>
          </div>
        </div>
        <img className="picture" src="https://images.unsplash.com/photo-1451153378752-16ef2b36ad05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80" alt="hero background" style={{display:'none'}} />
      </div>

      {/* Info Section */}
      <section className="home-info-section">
        <h2 className="home-info-title">Fundraising on OurPlatform is easy,<br/> powerful, and trusted</h2>
        <div className="home-info-content">
          <div className="home-info-image">
            <img src={image2} alt="Fundraising steps illustration" />
          </div>
          <div className="home-info-steps">
            <div className="home-info-step">
              <div className="home-info-step-number">1</div>
              <div>
                <div className="home-info-step-title">Use our tools to create your fundraiser</div>
                <div className="home-info-step-desc">You'll be guided by prompts to add fundraiser details and set your goal. Make updates anytime.</div>
              </div>
            </div>
            <div className="home-info-step">
              <div className="home-info-step-number">2</div>
              <div>
                <div className="home-info-step-title">Reach donors by sharing</div>
                <div className="home-info-step-desc">Share your fundraiser link and use the resources in your dashboard to gain momentum.</div>
              </div>
            </div>
            <div className="home-info-step">
              <div className="home-info-step-number">3</div>
              <div>
                <div className="home-info-step-title">Securely receive funds</div>
                <div className="home-info-step-desc">Add your bank information, or invite your fundraiser beneficiary to add theirs, and start receiving funds.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns List */}
      <div className="home-campaigns-section mt-lg-5 ml-auto p-5">
        <h2 className="mb-5 text-center fs-1 home-campaigns-title" style={{color:'#123F76'}}>All Campaigns</h2>
        <div className="home-campaigns-list d-flex flex-wrap gap-4 justify-content-center">
          {paginatedCampaigns.length > 0 ? (
            paginatedCampaigns.map((campaign) => 
              <Card key={campaign.id} {...campaign} />
            )
          ) : (
            <div className="text-center mt-5">
              <p>there is no campaigns yet.</p>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="home-pagination">
            <button
              className="home-pagination-btn"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i+1}
                className={`home-pagination-btn${currentPage === i+1 ? ' active' : ''}`}
                onClick={() => setCurrentPage(i+1)}
              >
                {i+1}
              </button>
            ))}
            <button
              className="home-pagination-btn"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* My Campaigns Section */}
      <div className="home-my-campaigns-card">
  <div className="home-my-campaigns-img-wrapper">
    <img
      src={image1}
      alt="My Campaigns Illustration"
      className="home-my-campaigns-img"
    />
  </div>
  <div className="home-my-campaigns-content">
    <h3 className="home-my-campaigns-title mb-2">Check Your Campaigns</h3>
    <p className="home-my-campaigns-desc mb-3">
      See all the campaigns you have created, track their progress, and manage them easily.
    </p>
    <a href="/mycampaigns" className="home-my-campaigns-btn">Go to My Campaigns</a>
  </div>
</div>
    </>
  );
};
export default Home