import React from "react";
import { useSelector } from "react-redux";

const Metrics = () => {
  const candidates = useSelector((state) => state.candidates);
  const total = candidates.length;
  const pending = candidates.filter(c => c.status === "Pending").length;
  const reviewed = candidates.filter(c => c.status === "Reviewed").length;
  const hired = candidates.filter(c => c.status === "Hired").length;

  return (
    <div>
      <h2 className="text-2xl mb-4">Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <p className="text-lg">Total Candidates</p>
          <p className="text-2xl">{total}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          <p className="text-lg">Pending</p>
          <p className="text-2xl">{pending}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <p className="text-lg">Reviewed</p>
          <p className="text-2xl">{reviewed}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded">
          <p className="text-lg">Hired</p>
          <p className="text-2xl">{hired}</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;