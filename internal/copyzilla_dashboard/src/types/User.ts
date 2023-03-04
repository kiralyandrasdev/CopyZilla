export type User = {
    id: string;
    firebaseUid: string;
    email: string;
    accountEnabled: boolean;
    accountDeleted: boolean;
    subscriptionValidUntil: string;
    subscriptionPlanName: string;
    planType: string;
    creditCount: number | string;
    createdOn: string;
}