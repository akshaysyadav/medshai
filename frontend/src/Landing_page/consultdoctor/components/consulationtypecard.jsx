import React from 'react';


const ConsultationTypeCard = ({ type, onSelect, isSelected }) => {
  const getTypeIcon = (typeName) => {
    switch (typeName?.toLowerCase()) {
      case 'prescription review':
        return 'FileText';
      case 'general consultation':
        return 'Stethoscope';
      case 'follow-up':
        return 'RefreshCw';
      case 'instant consult':
        return 'Zap';
      default:
        return 'MessageCircle';
    }
  };

  return (
    <div className={`p-3 border rounded ${isSelected ? 'border-primary' : ''} cursor-pointer`} onClick={() => onSelect(type)}>
      <div className="d-flex align-items-start gap-3">
        <div className={`p-2 rounded ${isSelected ? 'bg-primary text-white' : 'bg-light'}`}>
          <i className={`fas fa-${getTypeIcon(type?.name).toLowerCase()}${getTypeIcon(type?.name)==='Clock' ? '' : ''}`}></i>
        </div>
        <div className="flex-grow-1">
          <h3 className="h6 mb-1">{type?.name}</h3>
          <div className="small text-muted mb-2">{type?.description}</div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-primary">₹{type?.price}</span>
              {type?.originalPrice && (
                <span className="small text-muted text-decoration-line-through">₹{type?.originalPrice}</span>
              )}
            </div>
            <div className="d-flex align-items-center gap-1 small text-muted">
              <i className="far fa-clock"></i>
              <span>{type?.duration} mins</span>
            </div>
          </div>
          {type?.features && (
            <div className="mt-2">
              <ul className="list-unstyled mb-0 small text-muted">
                {type?.features?.map((feature, index) => (
                  <li key={index} className="d-flex align-items-center gap-2">
                    <i className="fas fa-check text-success"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationTypeCard;


