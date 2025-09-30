import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShare, 
  faLeaf, 
  faPiggyBank, 
  faTrophy,
  faCopy,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp as faWhatsappBrand,
  faTwitter as faTwitterBrand,
  faFacebook as faFacebookBrand,
  faLinkedin as faLinkedinBrand,
  faInstagram as faInstagramBrand
} from '@fortawesome/free-brands-svg-icons';

function SocialSharing({ userStats }) {
  const [selectedTemplate, setSelectedTemplate] = useState('impact');
  const [copySuccess, setCopySuccess] = useState(false);

  const shareTemplates = {
    impact: {
      title: 'Environmental Impact',
      preview: `🌱 I've made a positive impact with MedSahi!\n\n✅ ${userStats?.medicinesReturned || 0} medicines returned\n🌍 ${userStats?.co2Prevented || 0}kg CO₂ prevented\n💧 ${userStats?.waterSaved || 0}L water saved\n\nJoin me in making healthcare sustainable! #MedSahi #SustainableHealth`,
      bgColor: 'rgba(25, 135, 84, 0.1)',
      iconColor: '#198754',
      icon: faLeaf
    },
    savings: {
      title: 'Cost Savings',
      preview: `💰 Smart healthcare choices with MedSahi!\n\n🎯 Saved ₹${userStats?.totalSavings || 0} on medicines\n🏆 ${userStats?.heroScore || 0} Environmental Hero Score\n🪙 Earned ₹${userStats?.coinsBalance || 0} in rewards\n\nHealthcare that's good for you AND your wallet! #MedSahi #SmartSavings`,
      bgColor: 'rgba(255, 193, 7, 0.1)',
      iconColor: '#ffc107',
      icon: faPiggyBank
    },
    achievement: {
      title: 'Achievement Unlock',
      preview: `🏆 Achievement Unlocked on MedSahi!\n\n🌟 Just earned my "${userStats?.latestAchievement || 'Eco Warrior'}" badge\n📈 Environmental Hero Score: ${userStats?.heroScore || 0}\n🌱 Making healthcare sustainable, one medicine at a time\n\nEvery small action counts! #MedSahi #Achievement`,
      bgColor: 'rgba(13, 110, 253, 0.1)',
      iconColor: '#0d6efd',
      icon: faTrophy
    }
  };

  const socialPlatforms = [
    { name: 'WhatsApp', icon: faWhatsappBrand, color: '#25D366' },
    { name: 'Twitter', icon: faTwitterBrand, color: '#1DA1F2' },
    { name: 'Facebook', icon: faFacebookBrand, color: '#1877F2' },
    { name: 'LinkedIn', icon: faLinkedinBrand, color: '#0A66C2' },
    { name: 'Instagram', icon: faInstagramBrand, color: '#E4405F' }
  ];

  const handleShare = (platform) => {
    const template = shareTemplates[selectedTemplate];
    const text = encodeURIComponent(template.preview);
    
    const shareUrls = {
      WhatsApp: `https://wa.me/?text=${text}`,
      Twitter: `https://twitter.com/intent/tweet?text=${text}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      Instagram: '#'
    };

    if (shareUrls[platform] !== '#') {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    } else {
      alert('Instagram does not support direct text sharing. Please copy the text and share manually.');
    }
  };

  const copyToClipboard = () => {
    const text = shareTemplates[selectedTemplate].preview;
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      alert('Failed to copy text. Please copy manually.');
    });
  };

  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'rgba(214, 51, 132, 0.1)'
              }}
            >
              <FontAwesomeIcon 
                icon={faShare} 
                size="xl" 
                style={{ color: '#d63384' }}
              />
            </div>
            <div>
              <h3 className="h5 fw-bold mb-1">Share Your Impact</h3>
              <p className="text-muted small mb-0">Inspire others with your sustainability journey</p>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-4">
            <h4 className="h6 fw-semibold mb-3">Choose Template</h4>
            <div className="row g-3">
              {Object.entries(shareTemplates).map(([key, template]) => (
                <div key={key} className="col-12 col-md-4">
                  <button
                    onClick={() => setSelectedTemplate(key)}
                    className="w-100 p-3 rounded-3 text-start border-0"
                    style={{
                      backgroundColor: selectedTemplate === key ? 'rgba(13, 110, 253, 0.05)' : '#f8f9fa',
                      border: selectedTemplate === key ? '2px solid #0d6efd' : '2px solid #e9ecef',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTemplate !== key) {
                        e.currentTarget.style.borderColor = 'rgba(13, 110, 253, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTemplate !== key) {
                        e.currentTarget.style.borderColor = '#e9ecef';
                      }
                    }}
                  >
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: template.bgColor
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={template.icon} 
                        size="lg"
                        style={{ color: template.iconColor }}
                      />
                    </div>
                    <h5 className="h6 fw-semibold mb-0">{template.title}</h5>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-4">
            <h4 className="h6 fw-semibold mb-3">Preview</h4>
            <div 
              className="p-3 rounded-3"
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                whiteSpace: 'pre-line',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}
            >
              {shareTemplates[selectedTemplate].preview}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="h6 fw-semibold mb-0">Share On</h4>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={copyToClipboard}
              >
                <FontAwesomeIcon icon={faCopy} className="me-2" />
                {copySuccess ? 'Copied!' : 'Copy Text'}
              </button>
            </div>

            <div className="row g-3">
              {socialPlatforms.map((platform) => (
                <div key={platform.name} className="col-6 col-md">
                  <button
                    className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                    onClick={() => handleShare(platform.name)}
                    style={{
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = platform.color;
                      e.currentTarget.style.color = platform.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#6c757d';
                      e.currentTarget.style.color = '#6c757d';
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={platform.icon} 
                      size="xl"
                      className="mb-2"
                      style={{ color: platform.color }}
                    />
                    <span style={{ fontSize: '0.8rem' }}>{platform.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Graphics Option */}
          <div 
            className="p-3 rounded-3"
            style={{
              backgroundColor: 'rgba(214, 51, 132, 0.05)',
              border: '1px solid rgba(214, 51, 132, 0.2)'
            }}
          >
            <div className="d-flex align-items-center">
              <FontAwesomeIcon 
                icon={faImage} 
                size="lg"
                className="me-3"
                style={{ color: '#d63384' }}
              />
              <div className="flex-grow-1">
                <p className="fw-semibold mb-1">Custom Graphics</p>
                <p className="text-muted small mb-0">Generate personalized impact graphics for social media</p>
              </div>
              <button className="btn btn-outline-secondary btn-sm">
                Create Graphics
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialSharing;