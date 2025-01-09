import React, { useState, useContext, useEffect } from "react";
import { LandRegistryContext } from "@/context/LandRegistryContext";
import TimestampToDate from "@/components/TimestampToDate";

const VerifyLandPage = () => {
    const [landID, setLandID] = useState("");  // Store the land ID input by the user
    const [selectedLand, setSelectedLand] = useState(null);  // Store the land details after search
    const [toast, setToast] = useState({ message: "", type: "" });  // Toast state

    // Context to access land registry data or functions to query the land data
    const { getLandById } = useContext(LandRegistryContext);

    // Handle the form submission to verify the land
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that the land ID is provided
        if (!landID) {
            setToast({ message: "Please enter a Land ID.", type: "error" });
            return;
        }

        try {
            // Query for the land using the ID entered
            const land = await getLandById(landID);

            if (land) {
                setSelectedLand(land);
                setToast({ message: "Land found!", type: "success" });
            } else {
                setToast({ message: "Land not found.", type: "error" });
                setSelectedLand(null);
            }
            } catch (error) {
                setToast({ message: "An error occurred. Please try again.", type: "error" });
                setSelectedLand(null);
        }
    };

    // Auto-hide toast message after 3 seconds
    useEffect(() => {
        if (toast.message) {
        const timeout = setTimeout(() => setToast({ message: "", type: "" }), 3000);
        return () => clearTimeout(timeout);
        }
    }, [toast]);

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <h1 className="text-2xl font-bold mb-4">Verify Land</h1>

            {/* Toast Message */}
            {toast.message && (
                <div
                className={`fixed top-4 right-4 p-4 rounded text-white ${
                    toast.type === "success" ? "bg-green-500" : "bg-red-500"
                } shadow-lg`}
                >
                {toast.message}
                </div>
            )}

            {/* Land ID Input Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                type="text"
                placeholder="Enter Land ID"
                value={landID}
                onChange={(e) => setLandID(e.target.value)}
                className="px-4 py-2 border rounded-lg mr-2"
                />
                <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                Verify Land
                </button>
            </form>

            {/* Land Details if found */}
            {selectedLand && (
                <div className="bg-white p-6 border rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Land Details</h2>
                <p><strong>Title:</strong> {selectedLand.title}</p>
                <p><strong>Location:</strong> {selectedLand.location}</p>
                <p><strong>Condition:</strong> {selectedLand.condition}</p>
                <p><strong>Features:</strong> {selectedLand.features}</p>
                <p><strong>Is Registered?</strong> {selectedLand.isRegistered ? "Yes" : "No"}</p>
                {selectedLand.register_at && (
                    <TimestampToDate timestamp={selectedLand.register_at} title="Registered At: " />
                )}
                <p><strong>Is Surveyed?</strong> {selectedLand.isSurveyed ? "Yes" : "No"}</p>
                {selectedLand.survey_at && (
                    <TimestampToDate timestamp={selectedLand.survey_at} title="Surveyed At: " />
                )}
                <p><strong>Is Minted?</strong> {selectedLand.isMinted ? "Yes" : "No"}</p>
                {selectedLand.minted_at && (
                    <TimestampToDate timestamp={selectedLand.minted_at} title="Minted At: " />
                )}
                <p><strong>Is For Sale?</strong> {selectedLand.isForSale ? "Yes" : "No"}</p>
                </div>
            )}
        </div>
    );
};

export default VerifyLandPage;
