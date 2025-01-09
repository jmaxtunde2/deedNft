import React, { useContext, useEffect, useState } from "react";
import { LandRegistryContext } from "@/context/LandRegistryContext";
import TimestampToDate from "@/components/TimestampToDate";

const SellLandPage = () => {
    const [selectedLand, setSelectedLand] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sellStatus, setSellStatus] = useState(null); // true for sell, false for cancel
    const [price, setPrice] = useState(""); // New state for price input
    const [toast, setToast] = useState({ message: "", type: "" }); // Toast state

    // Context
    const {
        userRegisteredLands, 
        getUserRegisteredLands,
        sellLand,
        currentUser,
        connectWallet,
    } = useContext(LandRegistryContext);

    // Fetch user's surveyed lands on component mount and when `currentUser` changes
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

    // Filter lands that are surveyed but not sold
    const landsToSell = userRegisteredLands.filter(
        (land) => land.isSurveyed && !land.isForSale
    );

    const handleActionClick = (land) => {
        setSelectedLand(land);
        setIsModalOpen(true);
    };

    const handleSellSubmit = async () => {
        try {
            if (selectedLand && price) {
                // Pass the price along with land ID and sell status
                await sellLand(selectedLand.id, price); // Blockchain transaction
                setToast({ message: "Land listed for sale successfully!", type: "success" });
                await getUserRegisteredLands(); // Refresh lands
            } else {
                setToast({ message: "Please enter a valid price.", type: "error" });
            }
        } catch (error) {
            setToast({ message: "Failed to list land for sale. Try again.", type: "error" });
        } finally {
            setIsModalOpen(false);
            setSelectedLand(null);
            setPrice(""); // Reset price field
        }
    };

    const toggleSellStatus = () => {
        setSellStatus(!sellStatus);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
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
            <h1 className="text-2xl font-bold mb-4">Sell Land</h1>

            {/* Table of Lands to Sell */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Location</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {landsToSell.length > 0 ? (
                            landsToSell.map((land) => (
                                <tr key={land.id}>
                                    <td className="px-4 py-2 border">{land.title}</td>
                                    <td className="px-4 py-2 border">{land.location}</td>
                                    <td className="px-4 py-2 border">
                                        <span
                                            className={`px-2 py-1 text-white rounded ${
                                                land.isForSale ? "bg-green-500" : "bg-red-500"
                                            }`}
                                        >
                                            {land.isForSale ? "For Sale" : "Not for Sale"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleActionClick(land)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            {land.isForSale ? "Cancel Sale" : "Sell Land"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 border text-center" colSpan="4">
                                    No lands available for sale.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Sell Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">Sell Land</h2>
                        <p>Title: {selectedLand.title}</p>
                        <p>Location : {selectedLand.location}</p>
                        <p>Condition : {selectedLand.condition}</p>
                        <p>Features : {selectedLand.features}</p>
                        <p>Is Registered ? : {selectedLand.isRegistered ? "Yes" : "Not Yet"}</p>
                        {selectedLand.register_at && (
                            <TimestampToDate timestamp={selectedLand.register_at} title="Registered At: "/>
                        )}
                        <p>Is Surveyed ? : {selectedLand.isSurveyed ? "Yes" : "Not Yet"}</p>
                        {selectedLand.survey_at && (
                            <TimestampToDate timestamp={selectedLand.survey_at} title="Survey At: "/>
                        )}
                        <p>Is Listed for Sale ? : {selectedLand.isForSale ? "Yes" : "Not Yet"}</p>

                        {/* Price Input */}
                        <div className="mt-4">
                            <label htmlFor="price" className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                id="price"
                                className="mt-2 w-full p-2 border rounded-lg"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price in USD"
                                min="0"
                            />
                        </div>

                        <div className="mt-4 flex items-center">
                            <label className="mr-4 text-gray-700">
                                {sellStatus ? "List for Sale" : "Cancel Sale"}
                            </label>
                            <button
                                onClick={toggleSellStatus}
                                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                                    sellStatus ? "bg-green-500" : "bg-red-500"
                                }`}
                            >
                                <span
                                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                                        sellStatus ? "translate-x-5" : "translate-x-1"
                                    }`}
                                ></span>
                            </button>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedLand(null);
                                    setPrice(""); // Reset price field
                                    setSellStatus(null);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded-lg mr-2 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSellSubmit}
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

export default SellLandPage;
