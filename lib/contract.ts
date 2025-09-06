import { type Address } from 'viem';

// PASTE YOUR CONTRACT ADDRESS HERE
export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as Address;

// The Application Binary Interface (ABI) for the smart contract.
export const contractABI = [
  {
    "inputs": [{"internalType": "string", "name": "emoji", "type": "string"}],
    "name": "sendVibe",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "sender", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "emoji", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "NewVibe",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getVibes",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "sender", "type": "address"},
          {"internalType": "string", "name": "emoji", "type": "string"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
        ],
        "internalType": "struct BlockVibes.Vibe[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract instance is now handled by wagmi hooks directly