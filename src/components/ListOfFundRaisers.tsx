import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, setProvider, BN, getProvider } from "@coral-xyz/anchor";

import idl from "../idl.json"
import { Crowdfund } from "../utils/crowdfund-types"
import { useEffect, useState } from 'react';
import Modal from './Modal';
import Loader from './Loader';
const idl_string = JSON.stringify(idl)

const idl_object = JSON.parse(idl_string)

const programID = new PublicKey(idl.address)

// const getString = bufferstr => String.fromCharCode.apply(null, bufferstr)
export const ListOfFundRaisers = () => {
    const [data, setData] = useState([])
    const [modalData, setModalData] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const ourWallet = useWallet();
    const {connection} = useConnection()
    const provider = new AnchorProvider(connection, ourWallet)
    setProvider(provider)
    const program = new Program<Crowdfund>(idl_object, provider)
    useEffect(() => {
        (async () => {
            setLoading(true)
            const dataa = await program.account.crowdFund.all()
            setData(dataa.map(item => ({
                id: item.publicKey,
                title: item.account.title, 
                description: item.account.description,
                targetAmount: item.account.amount.toNumber()/LAMPORTS_PER_SOL,
                collectedAmount: item.account.collected.toNumber()/LAMPORTS_PER_SOL,
                crowdFundAuthority: item.account.crowdfundAuthority
            })))
            console.log(data)
            setLoading(false)
        })()
    }, [ourWallet])
    const contributeToFundraiser = async (details) => {
        if(ourWallet.connected) {
            console.log(getProvider().publicKey, details.crowdFundAuthority)
            const amount = Number(prompt("Enter amount to contribute(in sol): "))
            if (isNaN(amount)) alert("Enter valid number")
            else {
                // const [crowdfund_pkey, bump] = PublicKey.findProgramAddressSync([
                //     Buffer.from(details.title),
                //     details.crowdFundAuthority.toBuffer()
                // ], programID)
                // console.log(await connection.getBalance(crowdfund_pkey)/LAMPORTS_PER_SOL)
                const anchProvider = getProvider()
                // console.log(details.title.trim(), "Ved's Fundraiser")
                setLoading(true)
                try {
                    const tx = await program.methods.contribute(details.title, new BN(LAMPORTS_PER_SOL * amount))
                    .accountsStrict({
                        contributor: anchProvider.publicKey,  
                        crowdfund: new PublicKey(details.id),
                        systemPrgram: SystemProgram.programId
                    }).rpc()
            
                    console.log(tx)
                    setLoading(false)
                    setShowModal(false)
                } catch(e) {
                    alert(e.message)
                    setLoading(false)
                }
                setLoading(false)
                location.reload()
        }
        } else {
            alert("Not connected to the wallet")
        }
    }
    const openModal = item => {
        setModalData(item)
        setShowModal(true)
    }
    const closeModal = () => {
        setModalData(null)
        setShowModal(false)
    }
    const closeFundRaiser = async details => {
        if(ourWallet.connected) {

            try {
                setLoading(true)
                const tx = await program.methods.closeFundraiser(details.title)
                .accountsStrict({
                    crowdfundAuthority: getProvider().publicKey,
                    crowdfundPda: details.id,
                    systemProgram: SystemProgram.programId
                })
                .rpc({commitment: "processed"})
                console.log("closed account: tx: ", tx)
                setLoading(false)
                setShowModal(false)
                location.reload()
            } catch(e) {
                alert(e.message)
                setLoading(false)
            }
        } else {
            alert("Not connected to the wallet")
        }
    }
    return(
        <div>
            {loading && <Loader />}
            <p>Contribute to a cause</p>
            <table className="DataTable">
                <thead>
                    <tr>
                    <th className="DataTable__Header DataTable__Header_Title">Title</th>
                    <th className="DataTable__Header">Target</th>
                    <th className="DataTable__Header">Raised</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                    <tr title={`${item.collectedAmount>=item.targetAmount ? 'fundraiser target already reached':'click for more details'}`} key={item.id.toString()} className={`DataTable__Row ${item.collectedAmount>=item.targetAmount && "Target-reached"}`} onClick={() => openModal(item)}>
                        <td className="DataTable__Cell">{item.title}</td>
                        <td className="DataTable__Cell">{`${item.targetAmount} sol`}</td>
                        <td className="DataTable__Cell">{`${item.collectedAmount} sol`}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onClose={closeModal}>
                {modalData && (
                    <div className='Contribute-modal '>
                        <h2>{modalData.title}</h2>
                        {modalData.collectedAmount>=modalData.targetAmount &&<small style={{marginTop: -5, color: "red"}}>(Note: Target already reached)</small>}
                        <div className='Contribute-modal-div'>
                            <br />
                            <p>{modalData.description}</p>
                        </div>
                        <div className='Btn-container'>
                            <button className='CreateFundraiser-btn Contribute-btn' onClick={() => contributeToFundraiser(modalData)}>Contribute</button>
                            {
                                modalData.crowdFundAuthority.toString() == getProvider().publicKey?.toString() ? (
                                    <div>
                                        <button className='CreateFundraiser-btn Closefund-btn' onClick={() => closeFundRaiser(modalData)}>Close fundraiser</button>
                                    </div>): 
                                    (<div>
                                        <button title='Only owner can close the fundraiser' className='CreateFundraiser-btn Closefund-btn' disabled={true}>Close fundraiser</button>
                                    </div>)
                            }
                        </div>
                        <small className='End-description'>created by 
                        <a rel="noreferrer"  target='_blank' href={`https://explorer.solana.com/account/${modalData.crowdFundAuthority}?cluster=devnet`}> {modalData.crowdFundAuthority.toString().slice(0,5)} </a>
                            at <a rel="noreferrer" target="_blank"href={`https://explorer.solana.com/account/${modalData.id}?cluster=devnet`}>
                                {modalData.id.toString().slice(0,5)}
                            </a>
                        </small>
                    </div>
                )}
            </Modal>
        </div>
    )
}