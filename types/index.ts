// types/index.ts
export interface Member {
    userID: number;
    name: string;
    username: string;
    image: string;
    profile: string;
}
  
export interface Staff {
    developer: Member[];
    communityManager: Member[];
    toaster: Member[];  // Ensure toaster is included
    moderator: Member[];
    support: Member[];
    member: Member[];
  }