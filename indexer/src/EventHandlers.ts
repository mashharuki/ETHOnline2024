import {BaseNft, Account, Approval, Transfer} from "generated";

// Handling the Approval event for ERC721
BaseNft.Approval.handler(async ({event, context}) => {
  // Fetching the owner Account entity
  let ownerAccount = await context.Account.get(event.params.owner.toString());

  if (ownerAccount === undefined) {
    // Create a new owner account if it doesn't exist
    let accountObject: Account = {
      id: event.params.owner.toString(),
      balance: 0n, // balance field is not applicable for ERC721 but keeping it for consistency
    };
    context.Account.set(accountObject);
  }

  let approvalId =
    event.params.owner.toString() +
    "-" +
    event.params.approved.toString() +
    "-" +
    event.params.tokenId.toString();

  let approvalObject: Approval = {
    id: approvalId,
    owner_id: event.params.owner.toString(),
    spender_id: event.params.approved.toString(),
    tokenId: BigInt(event.params.tokenId),
  };

  // Store the approval event (create or update)
  context.Approval.set(approvalObject);
});

// Handling the Transfer event for ERC721
BaseNft.Transfer.handler(async ({event, context}) => {
  // Fetching the sender account
  let senderAccount = await context.Account.get(event.params.from.toString());

  if (senderAccount === undefined) {
    // Create a new sender account if it doesn't exist (likely for minting case)
    let accountObject: Account = {
      id: event.params.from.toString(),
      balance: 0n, // balance is symbolic here
    };
    context.Account.set(accountObject);
  }

  // Fetching the receiver account
  let receiverAccount = await context.Account.get(event.params.to.toString());

  if (receiverAccount === undefined) {
    // Create a new receiver account if it doesn't exist
    let accountObject: Account = {
      id: event.params.to.toString(),
      balance: 0n, // balance is symbolic here
    };
    context.Account.set(accountObject);
  }

  // Updating ownership of the token
  let tokenTransferId =
    event.params.tokenId.toString() + "-" + event.params.to.toString();

  let transferObject: Transfer = {
    id: tokenTransferId,
    from_id: event.params.from.toString(),
    to_id: event.params.to.toString(),
    tokenId: BigInt(event.params.tokenId),
  };

  // Storing the transfer event
  context.Transfer.set(transferObject);
});
