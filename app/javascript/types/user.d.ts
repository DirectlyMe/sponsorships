declare module "UserTypes" {
    export type User = {
        userId: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        description: string;
        employeeId: string;
        role: string;
        sponsees?: Array<User>;
        sponsors?: Array<User>;
        handlers?: Array<User>;
        actionItems: Array<{
            subject: string;
            detail: {};
        }>;
        profileImage: string;
    }
}
