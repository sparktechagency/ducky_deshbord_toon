import React, { useState } from "react";
import rentMeLogo from "../../assets/navLogo.png";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import RevenueDay from "../../components/Shared/RevenueDay";
import RevenueYear from "../../components/Shared/RevenueYear";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("year");

  const isActive = () => {
    if(selectedTab === "day") {
      return "bg-gray-600";
    }else if(selectedTab === "week") {
      return "bg-gray-600";
    }else if(selectedTab === "year") {
      return "bg-gray-600";
    }else {
      return "bg-gray-400";
    }
  }

  return (
    <div>
      <GeneralStateSection />
      <div className="py-8 space-y-4">
      <div className="text-white space-x-4">
        <button className={`py-1 px-3 rounded-sm ${selectedTab === "day" ? "bg-gray-600" : "bg-gray-800"}`} onClick={()=>setSelectedTab("day")}>Daily</button>
        <button className={`py-1 px-3 rounded-sm ${selectedTab === "week" ? "bg-gray-600" : "bg-gray-800"}`} onClick={()=>setSelectedTab("week")}>Weekly</button>
        <button className={`py-1 px-3 rounded-sm ${selectedTab === "year" ? "bg-gray-600" : "bg-gray-800"}`} onClick={()=>setSelectedTab("year")}>Yearly</button>
      </div>
        {selectedTab === "year" && <RevenueYear />}
        {selectedTab === "week" && <RevenueDay passDuration="7day" title="Weekly Revenue"/> }
        {selectedTab === "day" && <RevenueDay passDuration="24hour" title="Daily Revenue"/>}
      </div>
    </div>
  );
};

export default Home;
