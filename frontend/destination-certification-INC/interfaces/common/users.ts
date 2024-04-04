export interface Users {
    userId: number;
    userName: string;
    email: string;
    profileImg:string;
    role: 'admin' | 'user';
}