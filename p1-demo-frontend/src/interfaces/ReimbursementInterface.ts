export interface ReimbursementInterface {
    reimb_id: number,
    description: string,
    amount: number,
    status: string,
    user: {
        userId: number,
        firstName: string,
        lastName: string,
        username: string,
        password: string,
    };
}
