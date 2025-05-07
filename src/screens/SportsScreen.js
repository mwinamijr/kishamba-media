import React from "react";
import SportsContent from "../components/sports/SportsContent";
import PopularSports from "../components/sports/PopularSports";
import FollowUs from "../components/home/Followus";
import TopSports from "../components/sports/TopSports";
import MostViewedSports from "../components/sports/MostViewedSports";

function SportsScreen() {
  return (
    <div className="container-fluid">
      <div className="custom-container">
        <br />
        <TopSports />
        <div className="row">
          <div className="col-12 col-sm-10 col-md-9 col-lg-8">
            <br />
            <MostViewedSports />
            <br />
            <SportsContent />
          </div>
          <div className="col-lg-4">
            <br />
            <FollowUs />
            <PopularSports />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SportsScreen;
