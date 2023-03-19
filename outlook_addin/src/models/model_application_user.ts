export interface ApplicationUser {
    id: string;
    product: Product;
    consumedCredits: number;
}

export interface Product {
    name: string;
    dailyCreditLimit: number;
}