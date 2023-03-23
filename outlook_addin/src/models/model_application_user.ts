export interface ApplicationUser {
    id: string;
    product: Product;
    consumedCredits: number;
    subscriptionStatus: string;
}

export interface Product {
    name: string;
    dailyCreditLimit: number;
    scope: string;
}