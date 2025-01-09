import React, { useContext, useState, useEffect } from "react";
import { LandRegistryContext } from "@/context/LandRegistryContext";
import { ethers } from "ethers";

const LandRegistry = () => {
  const {
    registerLand,
    getUserRegisteredLands,
    userRegisteredLands,
    currentUser,
    connectWallet,
  } = useContext(LandRegistryContext);

  // States
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" }); // Toast state
  // Formdata
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    condition: "",
    features: "",
    documentHash: "",
  });

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

  // Register new land
  const handleRegisterLand = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { title, location, condition, features, documentHash } = formData;
    try {
      await registerLand(title, location, condition, features, documentHash);
      setModalOpen(false);
      await getUserRegisteredLands(); // Fetch updated lands
      setToast({ message: "Land registered successfully!", type: "success" });
    } catch (error) {
      console.error("Error registering land:", error);
      setToast({ message: "Failed to register land. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl font-bold mb-4">Land Registry</h1>
        
        {/* Button aligned to the left */}
        <div className="flex justify-end mb-4">
            <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
            Register New Land
            </button>
        </div>

        {/* Table of Lands */}
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr>
                        {/*<th className="px-4 py-2 border">ID</th>*/}
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Location</th> 
                        <th className="px-4 py-2 border">Is Register?</th>
                        <th className="px-4 py-2 border">Is Survey ?</th>
                        <th className="px-4 py-2 border">Is Minted ?</th>
                        <th className="px-4 py-2 border">Is For Sale ?</th>
                        <th className="px-4 py-2 border">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {userRegisteredLands.length > 0 ? (
                    userRegisteredLands.map((land) => (
                        <tr key={land.id}>
                            {/*<td className="px-4 py-2 border">{land.id.toString()}</td>*/}
                            <td className="px-4 py-2 border">{land.title}</td>
                            <td className="px-4 py-2 border">{land.location}</td>
                            <td className="px-4 py-2 border">
                                <span className={`px-2 py-1 text-white rounded ${land.isRegistered ? "bg-green-500" : "bg-red-500"}`}>
                                    {land.isRegistered ? "Yes" : "No"}
                                </span>
                            </td>
                            <td className="px-4 py-2 border">
                                <span className={`px-2 py-1 text-white rounded ${land.isSurveyed ? "bg-green-500" : "bg-red-500"}`}>
                                    {land.isSurveyed ? "Yes" : "No"}
                                </span>
                            </td>
                            <td className="px-4 py-2 border">
                                <span className={`px-2 py-1 text-white rounded ${land.isMinted ? "bg-green-500" : "bg-red-500"}`}>
                                    {land.isMinted ? "Yes" : "No"}
                                </span>
                            </td>
                            <td className="px-4 py-2 border">
                                <span className={`px-2 py-1 text-white rounded ${land.isForSale ? "bg-green-500" : "bg-red-500"}`}>
                                    {land.isForSale ? "Yes" : "No"}
                                </span>
                            </td>
                            <td className="px-4 py-2 border">
                                 {ethers.utils.formatEther(land.price.toString())} POL
                            </td>

                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td className="px-4 py-2 border text-center" colSpan="4">
                        No lands registered.
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Register New Land</h2>
                <form onSubmit={handleRegisterLand}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Location</label>
                    <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.location}
                    onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                    }
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Condition</label>
                    <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.condition}
                    onChange={(e) =>
                        setFormData({ ...formData, condition: e.target.value })
                    }
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Features</label>
                    <textarea
                    className="w-full p-2 border rounded"
                    value={formData.features}
                    onChange={(e) =>
                        setFormData({ ...formData, features: e.target.value })
                    }
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Upload Documents</label>
                    <input
                    type="file"
                    className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Document Hash</label>
                    <input
                    readOnly
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.documentHash}
                    onChange={(e) =>
                        setFormData({ ...formData, documentHash: e.target.value })
                    }
                    required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={isLoading}
                    >
                    {isLoading ? "Registering..." : "Register"}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
  );
};

export default LandRegistry;
