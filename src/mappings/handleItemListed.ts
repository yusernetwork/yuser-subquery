//import { Transfer, Prebuy, Approval, SafeMint } from "../types";
import { ItemListed } from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam.js';
import { BigNumber } from "ethers";

// Setup types from ABI
type ItemListedEventArgs = [BigNumber, string, string, BigNumber, string, string, BigNumber] & { itemNumber: BigNumber; auctionEnd: string; seller: string; tokenId: BigNumber; saleToken: string; nftToken: string; minPrice: BigNumber; };


export async function handleItemListed(event: MoonbeamEvent<ItemListedEventArgs>): Promise<void> {
    const transaction = new ItemListed(event.transactionHash);
    transaction.itemNumber = event.args.itemNumber.toBigInt();
    transaction.auctionEnd = event.args.auctionEnd;
    transaction.seller = event.args.seller;
    transaction.tokenId = event.args.tokenId.toBigInt();
    transaction.saleToken = event.args.saleToken;
    transaction.nftToken = event.args.nftToken;
    transaction.minPrice = event.args.minPrice.toBigInt();
    await transaction.save();

    logger.info(`MOonriver Item Listing event processed: ${event.transactionHash}`);

}
