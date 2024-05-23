export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface IRole {
  value: string;
}

export enum ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}
