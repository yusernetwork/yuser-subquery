//import { Transfer, Prebuy, Approval, SafeMint } from "../types";
import { Settled } from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam.js';
import { BigNumber } from "ethers";
import fetch from 'node-fetch';

// Setup types from ABI
type SettledEventArgs = [BigNumber, BigNumber, string, string, BigNumber] & { itemNumber: BigNumber; bidAmount: BigNumber; winner: string; seller: string; tokenId: BigNumber; };


export async function handleSettled(event: MoonbeamEvent<SettledEventArgs>): Promise<void> {
    const transaction = new Settled(event.transactionHash);
    transaction.itemNumber = event.args.itemNumber.toBigInt();
    transaction.bidAmount = event.args.bidAmount.toBigInt();
    transaction.winner = event.args.winner;
    transaction.seller = event.args.seller;
    transaction.tokenId = event.args.tokenId.toBigInt();

    await transaction.save();
    const stringBid = transaction.bidAmount.toString();
    const seller = transaction.seller.toString();
    const winner = transaction.winner.toString();
    logger.info(transaction);

    logger.info(`Moonriver Bid Settle event processed: ${event.transactionHash}`);

}
