//import { Transfer, Prebuy, Approval, SafeMint } from "../types";
import { Transfer } from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam.js';
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; tokenId: BigNumber; };


export async function handleNextGemTransfer(event: MoonbeamEvent<TransferEventArgs>): Promise<void> {
    const transaction = new Transfer(event.transactionHash);
    transaction.from = event.args.from;
    transaction.to = event.args.to;
    transaction.tokenId = event.args.tokenId.toBigInt();
    await transaction.save();


    logger.info(`Moonriver NextGem Transfer event processed: ${event.transactionHash}`);

}
