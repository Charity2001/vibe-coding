import { ethers } from 'ethers';

// PASTE YOUR CONTRACT ADDRESS HERE
export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// The Application Binary Interface (ABI) for the smart contract.
export const contractABI = [
  "function sendVibe(string memory emoji)",
  "event NewVibe(address indexed sender, string emoji, uint256 timestamp)",
  "function getVibes() view returns (tuple(address sender, string emoji, uint256 timestamp)[] memory)"
];

// This helper function returns an instance of the smart contract.
export const getContract = async () => {
    if (typeof window.ethereum === 'undefined') {
        return null;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
};