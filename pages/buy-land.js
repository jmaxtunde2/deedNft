import React, { useContext, useEffect, useState } from "react";
import { LandRegistryContext } from "@/context/LandRegistryContext";
import TimestampToDate from "@/components/TimestampToDate";
import { ethers } from "ethers";

const PurchaseLandPage = () => {
    const [selectedLand, setSelectedLand] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState(false); // true for purchase, false for reject
    const [toast, setToast] = useState({ message: "", type: "" }); // Toast state

    // Context
    const {
        userRegisteredLands, 
        getUserRegisteredLands,
        purchaseLand,
        currentUser,
        connectWallet,
    } = useContext(LandRegistryContext);

    // Fetch lands available for sale on component mount and when `currentUser` changes
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

    // Filter lands that are for sale
    const landsToPurchase = userRegisteredLands.filter(
        (land) => land.isForSale && !land.isPurchased
    );

    const handleActionClick = (land) => {
        setSelectedLand(land);
        setIsModalOpen(true);
    };

    const handlePurchaseSubmit = async () => {
        try {
            if (selectedLand) {
                await purchaseLand(selectedLand.id, purchaseStatus); // Blockchain transaction
                setToast({ message: "Land Purchased successfully!", type: "success" });
                await getLandsForSale(); // Refresh lands for sale
            }
        } catch (error) {
            setToast({ message: "Failed to purchase Land. Try again.", type: "error" });
        } finally {
            setIsModalOpen(false);
            setSelectedLand(null);
        }
    };

    const togglePurchaseStatus = () => {
        setPurchaseStatus(!purchaseStatus);
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
            <h1 className="text-2xl font-bold mb-4">Purchase Land</h1>

            {/* Table of Lands for Sale */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Location</th>
                            <th className="px-4 py-2 border">Price</th>
                            <th className="px-4 py-2 border"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {landsToPurchase.length > 0 ? (
                            landsToPurchase.map((land) => (
                                <tr key={land.id.toString()}>
                                    <td className="px-4 py-2 border">{land.title}</td>
                                    <td className="px-4 py-2 border">{land.location}</td>
                                    <td className="px-4 py-2 border">
                                    {ethers.utils.formatEther(land.price.toString())} ETH
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleActionClick(land)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Purchase
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 border text-center" colSpan="4">
                                    No lands available for purchase.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Purchase Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">Purchase Land</h2>
                        <p>Title: {selectedLand.title}</p>
                        <p>Location: {selectedLand.location}</p>
                        <p>Condition: {selectedLand.condition}</p>
                        <p>Features: {selectedLand.features}</p>
                        <p>Price: {selectedLand.price} ETH</p>
                        <p>Is For Sale?: {selectedLand.isForSale ? "Yes" : "No"}</p>
                        <div className="mt-4 flex items-center">
                            <label className="mr-4 text-gray-700">
                                {purchaseStatus ? "Confirm Purchase" : "Cancel Purchase"}
                            </label>
                            <button
                                onClick={togglePurchaseStatus}
                                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                                    purchaseStatus ? "bg-green-500" : "bg-red-500"
                                }`}
                            >
                                <span
                                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                                        purchaseStatus ? "translate-x-5" : "translate-x-1"
                                    }`}
                                ></span>
                            </button>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedLand(null);
                                    setPurchaseStatus(false);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded-lg mr-2 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePurchaseSubmit}
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

export default PurchaseLandPage;
