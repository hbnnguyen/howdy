export interface BaseUserInterface {
    username:string,
    email: string,
    name: string,
    bio: string
  }

  export interface User extends BaseUserInterface {
    username:string,
    name: string;
    id: number,
    imageKey: string
  }

  export interface UserFormData extends BaseUserInterface {
    password:string,
  }

  export interface UserLoginData {
    email: string,
    password: string
  }

  export interface ProfilePicData {
    image?: File
  }