'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Web3 from 'web3';

const Web3Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getNetworkName = async (web3: Web3) => {
    try {
      const networkId = await web3.eth.net.getId();
      switch (networkId) {
        case 1:
          return 'Ethereum Mainnet';
        case 3:
          return 'Ropsten Testnet';
        case 4:
          return 'Rinkeby Testnet';
        case 5:
          return 'Goerli Testnet';
        case 42:
          return 'Kovan Testnet';
        case 56:
          return 'Binance Smart Chain';
        case 137:
          return 'Polygon Mainnet';
        default:
          return `Network ID: ${networkId}`;
      }
    } catch (error) {
      console.error('Error getting network:', error);
      return 'Unknown Network';
    }
  };

  const connectWallet = async () => {
    setError(null);
    
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create Web3 instance
        const web3 = new Web3(window.ethereum);
        
        // Get connected accounts
        const accounts = await web3.eth.getAccounts();
        const networkName = await getNetworkName(web3);
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setNetworkName(networkName);
          setIsConnected(true);
        } else {
          setError('No accounts found. Please connect to MetaMask.');
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        setError('Error connecting to wallet. Please try again.');
      }
    } else {
      setError('MetaMask is not installed. Please install MetaMask to connect your wallet.');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
    setNetworkName(null);
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setIsConnected(false);
          setAccount(null);
        } else if (accounts[0] !== account) {
          // Account changed
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = async () => {
        if (isConnected) {
          const web3 = new Web3(window.ethereum);
          const networkName = await getNetworkName(web3);
          setNetworkName(networkName);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [account, isConnected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-bold text-white mb-4">Web3 Connection</h3>
      
      {error && (
        <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {isConnected ? (
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Connected Account:</p>
            <p className="text-blue-400 font-mono text-sm break-all">{account}</p>
          </div>
          
          {networkName && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Network:</p>
              <p className="text-green-400">{networkName}</p>
            </div>
          )}
          
          <button
            onClick={disconnectWallet}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          Connect Wallet
        </button>
      )}
      
      <p className="text-gray-400 text-sm mt-4">
        Connect your Ethereum wallet to interact with blockchain features.
      </p>
    </motion.div>
  );
};

export default Web3Connect;
