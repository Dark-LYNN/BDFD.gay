// types/index.ts
export interface Member {
    userID: number;
    name: string;
    username: string;
    image: string;
}
  
export interface Staff {
    developer: Member[];
    communityManager: Member[];
    member: Member[];
}
  