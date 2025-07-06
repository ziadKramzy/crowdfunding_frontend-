import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({
  id,
  title,
  description,
  target_amount,
  start_date,
  end_date,
  owner,
  showDelete = false,
  onDelete 
}) => {
  const navigate = useNavigate();

  const truncateDescription = (text, maxLength = 100) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="col-12 flex-grow-0 flex-md-grow-1 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {title.length > 50 ? `${title.substring(0, 50)}...` : title}
          </h5>
          <p className="card-text">{truncateDescription(description)}</p>
          <p className="card-text">
            <strong>Target:</strong> {formatCurrency(target_amount)}
          </p>
          <p className="card-text">
            <strong>Start:</strong> {formatDate(start_date)}<br />
            <strong>End:</strong> {formatDate(end_date)}
          </p>
        </div>
       <div className="card-footer text-center">
   <div className={showDelete && typeof onDelete === 'function' ? 'card-footer d-flex justify-content-between align-items-center' : ''}>
    <button
      className="btn btn-primary"
      onClick={() => navigate(`/campaign-details/${id}`)}
    >
      View
    </button>
    {showDelete && typeof onDelete === 'function' && (
      <button
        className="btn btn-danger"
        onClick={onDelete}
      >
        Delete 
      </button>
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default Card;
