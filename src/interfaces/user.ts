export interface UserInterface {
    _id: string;
    avatar: {
      url: string;
      localPath: string;
      _id: string;
    };
    name: string;
    email: string;
    googleId:string;
    designation:string;
    createdAt: string;
    updatedAt: string;
  }
