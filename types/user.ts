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
  user: UserData;
}
