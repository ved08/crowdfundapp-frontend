import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NavElement from './nav-element';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const AppBar: React.FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className='Navbar'>
      {/* NavBar / Header */}
      <div className="navbar container mx-auto flex items-center justify-between p-4 shadow-md">
          <div className='logo'>
            <h1>FunDApp</h1>
          </div>
      <h2>Launch and Fund Your Ideas with Speed and Security</h2>

          <WalletMultiButtonDynamic/>
      </div>
    </div>
  );
};
