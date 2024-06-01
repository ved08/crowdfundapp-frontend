
import bs58 from 'bs58';
import { FC, useState } from 'react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, setProvider, BN } from "@coral-xyz/anchor";

import idl from "../idl.json"
import { Crowdfund } from "../utils/crowdfund-types"
import Modal from './Modal';
import Loader from './Loader';
const idl_string = JSON.stringify(idl)

const idl_object = JSON.parse(idl_string)

const programID = new PublicKey(idl.address)


export const CrowdFund  : FC = () => {
    const [openModal, setOpenModal] = useState(false)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [amount, setAmount] = useState(null)
    const [loading, setLoading] = useState(false)
    const ourWallet = useWallet();
    const {connection} = useConnection()
    const provider = new AnchorProvider(connection, ourWallet)
    const program = new Program<Crowdfund>(idl_object, provider)
    const createCrowdFundInit = async() => {
        if (ourWallet.connected) {
            try {
                setOpenModal(true)
            } catch(e) {
                console.error("Error while creating crowdfund: ", e)
            }
        } else {
            alert("Wallet not connected!")
        }
    }
    const createCrowdFund = async () => {
        if(title && description && amount) {
            const [crowdfund_pkey, _bump] = PublicKey.findProgramAddressSync([
                Buffer.from(title),
                ourWallet.publicKey.toBuffer()
            ], programID)
            setLoading(true)
            try {
                await program.methods.initialize(title, description, new BN(LAMPORTS_PER_SOL*amount))
                .accounts({
                    crowdfundAuthority: ourWallet.publicKey
                }).rpc()
                const data = await program.account.crowdFund.fetch(crowdfund_pkey)
                console.log(data.title, data.description)
                alert(`Successfully created fundraiser: ${data.title}`)
                setLoading(false)
                setOpenModal(false)
            } catch(e) {
                alert(e.message)
                setLoading(false)
            }
            setLoading(false)
            location.reload()
        } else {
            alert("Enter all values")
        }
    }

    return (
        <div className="flex flex-row justify-center">
            {loading && <Loader />}
            <div className="relative group items-center">
                
                <button
                    className="CreateFundraiser-btn"
                    onClick={createCrowdFundInit}
                >
                    <span className="block group-disabled:hidden" > 
                    Kickstart Your Dream!
                    </span>
                </button>
            </div>
            <Modal onClose={() => setOpenModal(false)} show={openModal}>
                <h2>Create a Fundraiser</h2>
                <div className='Details-form'>
                    <input maxLength={30} type='text' placeholder='Enter a title(30 characters)' onChange={e => setTitle(e.target.value)}/>
                    <textarea  maxLength={500} placeholder='Description(500 characters)' onChange={e => setDescription(e.target.value)}/>
                    <input type='number' placeholder='Amount in SOL' onChange={e => setAmount(e.target.value)}/>
                    <button className='CreateFundraiser-btn' onClick={createCrowdFund}>Create a Fundraiser</button>
                </div>
            </Modal>
        </div>
    );
};
