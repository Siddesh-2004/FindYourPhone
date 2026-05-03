import { useState } from "react";
import { useLocation } from "react-router-dom";
import Ranking from "../components/Ranking";
import ProductDetails from "../components/ProductDetails";

function Result() {
  const { state } = useLocation();
  console.log("Result rendered, state:", state.recommendations);
  const recommendations = state?.recommendations ?? [];

  const [activeId, setActiveId] = useState(recommendations[0]?._id);
  const activePhone = recommendations.find((p) => p._id === activeId);
console.log("recommendations in Ranking:", recommendations);
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Ranking
        recommendations={recommendations}
        activeId={activeId}
        onSelect={setActiveId}
      />
      <ProductDetails phone={activePhone} />
    </div>
  );
}

export default Result;