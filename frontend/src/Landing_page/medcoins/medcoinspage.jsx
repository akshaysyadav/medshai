import React from "react";
import AchievementBadges from "./components/AchievementBanner.jsx";
import EnvironmentalHeroScore from "./components/EnvironmentalImpact.jsx";
import ImpactChart from "./components/ImpactChart.jsx";
import MedSahiCoinsWallet from "./components/MedSahiCoinsInfo.jsx";
import RedemptionOptions from "./components/RedemptionOptions.jsx";
import SocialSharing from "./components/SocialSharing.jsx";
import TakeBackProgram from "./components/TakeBackProgram.jsx";
import "./medcoins.css";

function MedCoinspage() {
  const sampleMonthly = [
    { month: 'Jan', impact: 20 },
    { month: 'Feb', impact: 28 },
    { month: 'Mar', impact: 25 },
    { month: 'Apr', impact: 35 },
    { month: 'May', impact: 40 },
    { month: 'Jun', impact: 44 }
  ];
  const communityAvg = sampleMonthly.map(m => ({ impact: Math.max(0, m.impact - 5) }));
  const earningHistory = [
    { type: 'return', description: 'Returned expired medicines', date: '2025-09-25', amount: 50 },
    { type: 'referral', description: 'Referred a friend', date: '2025-09-20', amount: 30 }
  ];
  const userStats = { medicinesReturned: 12, co2Prevented: 6.4, waterSaved: 28, totalSavings: 920, heroScore: 720, coinsBalance: 180, latestAchievement: 'Eco Warrior' };
  const pickupSlots = [
    { id: 'a', date: 'Oct 2', time: '10:00-12:00', available: true },
    { id: 'b', date: 'Oct 3', time: '14:00-16:00', available: false },
    { id: 'c', date: 'Oct 4', time: '09:00-11:00', available: true }
  ];
  const activeReturns = [ { medicines: 4, pickupDate: 'Oct 1, 10:30', status: 'scheduled' } ];

  return (
    <section className="medcoins-section">
      <div className="medcoins-animated-bg"></div>
      <div className="medcoins-content">
        <AchievementBadges achievements={['eco_warrior']} progress={{ medicinesReturned: 12, referrals: 2, totalSavings: 920, co2Prevented: 6.4, waterSaved: 28, monthsActive: 6 }} />
        <EnvironmentalHeroScore heroScore={userStats.heroScore} impactData={{ medicinesReturned: userStats.medicinesReturned, co2Prevented: userStats.co2Prevented, waterSaved: userStats.waterSaved }} />
        <ImpactChart monthlyData={sampleMonthly} communityAverage={communityAvg} />
        <MedSahiCoinsWallet balance={userStats.coinsBalance} earningHistory={earningHistory} />
        <RedemptionOptions balance={userStats.coinsBalance} />
        <SocialSharing userStats={userStats} />
        <TakeBackProgram pickupSlots={pickupSlots} activeReturns={activeReturns} />
      </div>
      <div className="medcoins-wave-bg">
        <svg className="medcoins-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="medcoins-wave-path" d="m-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#medcoins-wave-path" x="48" y="0" fill="rgba(40, 167, 69, 0.7)" />
            <use xlinkHref="#medcoins-wave-path" x="48" y="3" fill="rgba(40, 167, 69, 0.5)" />
            <use xlinkHref="#medcoins-wave-path" x="48" y="5" fill="rgba(40, 167, 69, 0.3)" />
            <use xlinkHref="#medcoins-wave-path" x="48" y="7" fill="rgba(255, 255, 255, 1)" />
          </g>
        </svg>
      </div>
    </section>
  );
}

export default MedCoinspage ;