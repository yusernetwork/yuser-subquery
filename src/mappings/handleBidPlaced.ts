//import { Transfer, Prebuy, Approval, SafeMint } from "../types";
import { Bid } from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam.js';
import { BigNumber } from "ethers";

// Setup types from ABI
type BidPlacedEventArgs = [BigNumber, BigNumber, string, BigNumber] & { itemNumber: BigNumber; bidAmount: BigNumber; bidder: string; tokenId: BigNumber; };


export async function handleBidPlaced(event: MoonbeamEvent<BidPlacedEventArgs>): Promise<void> {
    const transaction = new Bid(event.transactionHash);
    transaction.itemNumber = event.args.itemNumber.toBigInt();
    transaction.bidAmount = event.args.bidAmount.toBigInt();
    transaction.bidder = event.args.bidder;
    transaction.tokenId = event.args.tokenId.toBigInt();

    await transaction.save();

    logger.info(`Moonriver Bidding event processed: ${event.transactionHash}`);

}
