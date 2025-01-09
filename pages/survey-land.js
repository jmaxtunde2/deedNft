import React, { useContext, useEffect, useState } from "react";
import { LandRegistryContext } from "@/context/LandRegistryContext";
import TimestampToDate from "@/components/TimestampToDate";

const GovernmentSurveyPage = () => {
  const [selectedLand, setSelectedLand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [surveyStatus, setSurveyStatus] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "" }); // Toast state

  // Context
  const {
    userRegisteredLands,
    getUserRegisteredLands,
    surveyLand,
    currentUser,
    connectWallet,
  } = useContext(LandRegistryContext);

  // Fetch user's lands on component mount and when `currentUser` changes
  useEffect(() => {
    if (currentUser) getUserRegisteredLands();
  }, [currentUser]);

  // Toast auto-hide
  useEffect(() => {
    if (toast.message) {
      const timeout = setTimeout(() => setToast({ message: "", type: "" }), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  // Filter lands that are not yet surveyed
  const landsToSurvey = userRegisteredLands.filter(
    (land) => land.isRegistered && !land.isSurveyed
  );

  const handleActionClick = (land) => {
    setSelectedLand(land);
    setSurveyStatus(false); // Default to "Rejected" initially
    setIsModalOpen(true);
  };

  const handleSurveySubmit = async () => {
    try {
      if (selectedLand) {
        await surveyLand(selectedLand.id, surveyStatus); // Blockchain transaction
        setToast({ message: "Land survey completed successfully!", type: "success" });
        await getUserRegisteredLands(); // Refresh lands
      }
    } catch (error) {
      setToast({ message: "Failed to complete the land survey. Try again.", type: "error" });
    } finally {
      setIsModalOpen(false);
      setSelectedLand(null);
    }
  };

  const toggleSurveyStatus = () => {
    setSurveyStatus(!surveyStatus);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-4">Government Land Survey</h1>

      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed top-4 right-4 p-4 rounded text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } shadow-lg`}
        >
          {toast.message}
        </div>
      )}

      {/* Table of Lands to Survey */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {landsToSurvey.length > 0 ? (
              landsToSurvey.map((land) => (
                <tr key={land.id}>
                    <td className="px-4 py-2 border">{land.title}</td>
                    <td className="px-4 py-2 border">{land.location}</td>
                    <td className="px-4 py-2 border">
                        <span className={`px-2 py-1 text-white rounded ${land.isSurveyed ? "bg-green-500" : "bg-red-500"}`}>
                            {land.isSurveyed ? "Yes" : "Not Survey"}
                        </span>
                    </td>
                    <td className="px-4 py-2 border">
                        <button
                        onClick={() => handleActionClick(land)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                        Survey
                        </button>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 border text-center" colSpan="4">
                  No lands available for survey.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Survey Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Approve Survey Land</h2>
            <p>Title: {selectedLand.title}</p>
            <p>Location : {selectedLand.location}</p>
            <p>Condition : {selectedLand.condition}</p>
            <p>Features : {selectedLand.features}</p>
            <p>Is Registered ? : {selectedLand.isRegistered ? "Yes": "Not Yet"}</p>
            <p>{selectedLand.register_at}</p>
            {selectedLand.isRegistered && ( <TimestampToDate timestamp={selectedLand.register_at} title="Registered At: "/>) }
            <p>Is Survey ? : {selectedLand.isSurveyed ? "Yes": "Not Yet"}</p>
            {selectedLand.survey_at && ( <TimestampToDate timestamp={selectedLand.survey_at} title="Survey At: "/>) }
            <p>Is Minted ? : {selectedLand.isMinted ? "Yes": "Not Yet"}</p>
            {selectedLand.minted_at && ( <TimestampToDate timestamp={selectedLand.minted_at} title="Minted At: "/>) }
            <p>Is For Sale ? : {selectedLand.isForSale ? "Yes": "Not Yet"}</p>
            <div className="mt-4 flex items-center">
              <label className="mr-4 text-gray-700">
                {surveyStatus ? "Accept" : "Reject"}
              </label>
              <button
                onClick={toggleSurveyStatus}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                  surveyStatus ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    surveyStatus ? "translate-x-5" : "translate-x-1"
                  }`}
                ></span>
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSurveySubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentSurveyPage;
