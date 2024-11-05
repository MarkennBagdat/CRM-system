import React from 'react';
import Overview from './Parts/Overview';
import RatingChart from './Parts/RatingChart';
import CustomerCount from './Parts/CustomerCount';
import ServiceRating from './Parts/ServiceRating';
import BranchIncome from './Parts/BranchIncome';

const GeneralReview = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "15px", gap: "25px" }}>
      <Overview />
      <RatingChart />
      <div style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
        <CustomerCount style={{ flex: 1 }} />
        <ServiceRating style={{ flex: 1 }} />
      </div>
      <BranchIncome />
    </div>
  );
};

export default GeneralReview;
