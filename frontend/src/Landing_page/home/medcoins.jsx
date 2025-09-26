import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MedSahiCoinsPreview = () => {
  const [animatedCoins, setAnimatedCoins] = useState(0);
  const [currentImpact, setCurrentImpact] = useState(0);

  const impactMetrics = [
    { icon: "leaf", value: "2.5kg", label: "CO₂ Saved", color: "text-success" },
    { icon: "droplet", value: "150L", label: "Water Saved", color: "text-primary" },
    { icon: "trash", value: "45", label: "Medicines Disposed", color: "text-secondary" },
  ];

  const rewardTiers = [
    {
      tier: "Bronze",
      coins: "0-500",
      benefits: ["5% discount on generics", "Free delivery on ₹500+"],
      color: "bg-warning",
      icon: "award",
    },
    {
      tier: "Silver",
      coins: "501-1500",
      benefits: ["10% discount on generics", "Priority doctor consultation"],
      color: "bg-secondary",
      icon: "medal",
    },
    {
      tier: "Gold",
      coins: "1501+",
      benefits: ["15% discount on generics", "Free health checkup"],
      color: "bg-warning text-dark",
      icon: "crown",
    },
  ];

  useEffect(() => {
    const coinsInterval = setInterval(() => {
      setAnimatedCoins((prev) => (prev < 1250 ? prev + 25 : 1250));
    }, 100);

    const impactInterval = setInterval(() => {
      setCurrentImpact((prev) => (prev + 1) % impactMetrics.length);
    }, 2000);

    return () => {
      clearInterval(coinsInterval);
      clearInterval(impactInterval);
    };
  }, [impactMetrics.length]);

  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">MedSahi Coins Program</h2>
          <p className="text-muted">
            Earn coins by returning unused medicines and redeem them for discounts while helping the environment
          </p>
        </div>

        <div className="row g-4">
          {/* Environmental Impact */}
          <div className="col-lg-6">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "100px", height: "100px", background: "linear-gradient(135deg,#0d6efd,#198754)" }}
                >
                  <img
            src="media/images/coin.svg"
            style={{ width: "85px", height: "85px" }}
            alt="Logo"/>
                </div>
                <h3 className="fw-bold">{animatedCoins.toLocaleString()}</h3>
                <p className="text-muted">MedSahi Coins Earned</p>
              </div>

              <div className="card-body">
                <h5 className="card-title text-center mb-3">Your Environmental Impact</h5>
                {impactMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className={`d-flex justify-content-between align-items-center p-3 mb-2 rounded ${
                      currentImpact === index ? "bg-primary bg-opacity-10" : "bg-light"
                    }`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <i className={`fas fa-${metric.icon} ${metric.color}`}></i>
                      <span className="text-muted">{metric.label}</span>
                    </div>
                    <span className={`fw-bold ${metric.color}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">How to Earn Coins</h5>
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: "30px", height: "30px" }}>1</div>
                  <span>Schedule medicine pickup</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" style={{ width: "30px", height: "30px" }}>2</div>
                  <span>We collect & safely dispose</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-2" style={{ width: "30px", height: "30px" }}>3</div>
                  <span>Earn coins based on quantity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reward Tiers */}
          <div className="col-lg-6">
            <h4 className="text-center mb-3">Reward Tiers</h4>
            {rewardTiers.map((tier, index) => (
              <div key={index} className={`card mb-3 ${tier.color} text-white shadow-sm`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <i className={`fas fa-${tier.icon} fa-lg`}></i>
                      <div>
                        <h6 className="fw-bold mb-0">{tier.tier}</h6>
                        <small>{tier.coins} coins</small>
                      </div>
                    </div>
                    {index === 1 && <span className="badge bg-light text-dark">Current</span>}
                  </div>
                  <ul className="mb-0 ps-3">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i}>
                        <i className="fas fa-check text-success me-2"></i>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="text-center mt-4">
              <Link to="/dashboard" className="btn btn-primary btn-lg">
              <img
            src="media/images/coin.svg"
            style={{ width: "35px", height: "35px" }}
            alt="Logo"/> View My Dashboard
              </Link>
              <p className="text-muted mt-2">Start earning coins today by returning unused medicines</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedSahiCoinsPreview;
