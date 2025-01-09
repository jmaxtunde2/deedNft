import React, { createContext, useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import LandRegistry from "../context/LandRegistry.json";

const ContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const ContractAbi = LandRegistry.abi;

// Fetching the smart contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractAbi, signerOrProvider); 

export const LandRegistryContext = createContext();

export const LandRegistryProvider = ({ children }) => {
    const DappName = "Land Registry System";
    const [currentUser, setCurrentUser] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [allRegisteredLands, setAllRegisteredLands] = useState([]);
    const [userRegisteredLands, setUserRegisteredLands] = useState([]);

    // Connect wallet
    const connectWallet = async () => {
        try {
        const web3Modal = new Web3Modal();
        const instance = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(instance);
        const userSigner = web3Provider.getSigner();
        const userAddress = await userSigner.getAddress();

        setProvider(web3Provider);
        setSigner(userSigner);
        setCurrentUser(userAddress);
        const landContract = fetchContract(userSigner);
        setContract(landContract);
        } catch (error) {
        console.error("Wallet connection failed:", error);
        }
    };

    // Check if wallet is connected
    const checkIfWalletIsConnected = async () => {
        try {
        const { ethereum } = window;
        if (!ethereum) {
            console.log("Make sure you have MetaMask installed!");
            return;
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
            const web3Provider = new ethers.providers.Web3Provider(ethereum);
            const userSigner = web3Provider.getSigner();
            const userAddress = await userSigner.getAddress();

            setProvider(web3Provider);
            setSigner(userSigner);
            setCurrentUser(userAddress);
            const landContract = fetchContract(userSigner);
            setContract(landContract);
        } else {
            console.log("No authorized account found");
        }
        } catch (error) {
        console.error("Error checking wallet connection:", error);
        }
    };

    const disconnectWallet = () => {
        setCurrentUser(null);
      };

    // 1. Register Land
    const registerLand = async (_title, _location, _condition, _features, _documentHash) => {
        try {
            const tx = await contract.registerLand(_title, _location, _condition, _features, _documentHash);
            await tx.wait();
            console.log("Land registered:", tx);
        } catch (error) {
        console.error("Error registering land:", error);
        }
    };

    // 2. Sell Land
    const sellLand = async (landId, price) => {
        try {
            const tx = await contract.listLandForSale(landId, ethers.utils.parseEther(price.toString()));
            await tx.wait();
            console.log("Land listed for sale:", tx);
        } catch (error) {
        console.error("Error selling land:", error);
        }
    };

    // 3. List Land for Sale
    const listLandForSale = async (landId, price) => {
        try {
        const tx = await contract.listLandForSale(landId, ethers.utils.parseEther(price.toString()));
        await tx.wait();
        console.log("Land listed for sale:", tx);
        } catch (error) {
        console.error("Error listing land for sale:", error);
        }
    };

    // 4. Purchase Land
    const purchaseLand = async (landId, price) => {
        try {
        const tx = await contract.purchaseLand(landId, { value: ethers.utils.parseEther(price.toString()) });
        await tx.wait();
        console.log("Land purchased:", tx);
        } catch (error) {
        console.error("Error purchasing land:", error);
        }
    };

    // 5. Transfer Ownership
    const transferOwnership = async (landId, newOwner) => {
        try {
        const tx = await contract.transferOwnership(landId, newOwner);
        await tx.wait();
        console.log("Ownership transferred:", tx);
        } catch (error) {
        console.error("Error transferring ownership:", error);
        }
    };

    // 6. Survey Land
    const surveyLand = async (landId, accepted) => {
        try {
            const tx = await contract.surveyLand(landId, accepted);
            await tx.wait();
            console.log("Land surveyed:", tx);
        } catch (error) {
            console.error("Error surveying land:", error);
        }
    };

    // 7. Mint Land NFT
    const mintLandNFT = async (landId) => {
        try {
        const tx = await contract.mintLandNFT(landId);
        await tx.wait();
        console.log("Land NFT minted:", tx);
        } catch (error) {
        console.error("Error minting land NFT:", error);
        }
    };

    // 8. Verify Land
    const verifyLand = async (landId) => {
        try {
        const isValid = await contract.verifyLand(landId);
        console.log("Land verified:", isValid);
        return isValid;
        } catch (error) {
        console.error("Error verifying land:", error);
        }
    };

        //  // Fetch all registered lands
    const getAllRegisteredLands = async () => {
        try {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }
        const landIds = await contract.getAllRegisteredLands();
        setAllRegisteredLands(landIds.map((id) => id.toString())); // Convert BigNumber to string
        console.log("All registered lands fetched:", landIds);
        } catch (error) {
        console.error("Error fetching all registered lands:", error);
        }
    };

    const getLandById = async (landId) => {
        try {
            const landData = await contract.getLandDetails(landId);
    
            if (!landData) {
                console.error("No land data found.");
                return null; // Return null if no land data is found
            }
    
            return {
                id: landId,
                title: landData.title || "Unknown",
                location: landData.location || "Unknown",
                condition: landData.condition || "Unknown",
                features: landData.features || "None",
                documentHash: landData.documentHash || "N/A",
                isRegistered: landData.isRegistered,
                isSurveyed: landData.isSurveyed,
                isMinted: landData.isMinted,
                isForSale: landData.isForSale,
                price: landData.price || "N/A",
                register_at: landData.register_at,
                survey_at: landData.survey_at,
                minted_at: landData.minted_at
            };
        } catch (error) {
            console.error("Error fetching land data:", error);
            return null; // Return null if there's an error
        }
    };
     
    const getUserRegisteredLands = async () => {
        try {
          // Assuming you have a method in your contract to get all lands for the user
          const landIds = await contract.getUserRegisteredLands(currentUser);
          const landDetails = await Promise.all(
            landIds.map(async (landId) => {
              const landData = await contract.getLandDetails(landId); // Replace with actual contract method
              return {
                id: landId,
                title: landData.title,
                location: landData.location,
                condition: landData.condition,
                features: landData.features,
                documentHash: landData.documentHash,
                isRegistered:landData.isRegistered,
                isSurveyed:landData.isSurveyed,
                isMinted:landData.isMinted,
                isForSale:landData.isForSale,
                price:landData.price,
                register_at:landData.register_at,
                survey_at:landData.survey_at,
                minted_at:landData.minted_at
              };
            })
          );
          setUserRegisteredLands(landDetails); // Update the state with the full land details
        } catch (error) {
          console.error("Error fetching user's lands:", error);
        }
      };
      

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <LandRegistryContext.Provider
      value={{
        DappName,
        currentUser,
        contract,
        connectWallet,
        checkIfWalletIsConnected,
        registerLand,
        sellLand,
        listLandForSale,
        purchaseLand,
        transferOwnership,
        surveyLand,
        mintLandNFT,
        verifyLand,
        disconnectWallet,
        getAllRegisteredLands,
        getUserRegisteredLands,
        getLandById,
        allRegisteredLands,
        userRegisteredLands,
      }}
    >
      {children}
    </LandRegistryContext.Provider>
  );
};
