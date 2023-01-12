export async function getUser({ accessToken, firebaseUid }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        id: "id123",
        firebaseUid: firebaseUid,
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        creditCount: 50,
        createdAt: "2021-01-01T00:00:00.000Z",
        subscriptionValidUntil: "2022-03-01T00:00:00.000Z",
        subscriptionPlanName: "CopyZilla Personal",
    }
}