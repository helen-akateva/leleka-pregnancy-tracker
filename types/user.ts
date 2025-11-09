import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

export interface UserRegisterData {
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dueDate: string;
  babyGender: string;
  theme: string;
}
export interface User {
  avatarUrl: string | StaticImport;
  name: ReactNode;
  email: ReactNode;
  user: UserData;
}
