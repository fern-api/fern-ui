export const disputeStatusRequest = {
    eventType: "DISPUTE.STATUS",
    version: "2.2",
    type: "DISPUTE",
    status: "OPEN",
    primerAccountId: "7fcd50f1-99f2-416e-8013-6ecd1c1285c3",
    transactionId: "c3f662ad-d197-492e-b78b-63eefa64a31d",
    orderId: "order-123",
    paymentId: "1324rtf",
    processor: "ADYEN",
    processorDisputeId: "adyen_ref_123",
    receivedAt: "2021-10-10T17:03:12+00:00",
    challengeRequiredBy: "2021-11-10T17:03:12+00:00",
    reason: "Other Fraud - Card Absent Environment",
    reasonCode: "10.4",
    processorReason: "Other Fraud-Card Absent Environment",
    amount: 1000,
    currency: "EUR",
    paymentMethod: {
        paymentMethodType: "PAYMENT_CARD",
        paymentMethodData: {
            network: "VISA",
        },
    },
};
