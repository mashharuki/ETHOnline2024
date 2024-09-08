import {Analizer, Account, Analized} from "generated";

// Handling the Analized event
// Handling the Analized event
Analizer.Analized.handler(async ({ event, context }) => {
  // Fetching the target contract (Account entity)
  let targetContract = await context.Account.get(
    event.params.targetContract.toString()
  );


  if (!targetContract) {
    // Create a new target contract account if it doesn't exist
    targetContract = {
      id: event.params.targetContract.toString(),
      balance: 0n, // Not applicable but keeping for consistency
    };
    context.Account.set(targetContract);
  }

  // Convert the event params
  const analysisId = event.params.callId.toString();

  const analysisObject: Analized = {
    id: analysisId,
    callId: BigInt(event.params.callId),
    targetContract_id: event.params.targetContract.toString(),
    functionName: event.params.functionName || "", // Ensure string is set
    description: event.params.description || "",   // Ensure string is set
    value: BigInt(event.params.value),
    complexity: Number(event.params.complexity),
    riskLevel: Number(event.params.riskLevel),
  };

  // Store the analysis event
  await context.Analized.set(analysisObject);
});
