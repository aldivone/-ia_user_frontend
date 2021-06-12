interface User {
  id?: number;

  name: string;

  login: string;

  password: string;

  createdDate?: Date;

  updatedDate?: Date;

  email: string;

  admin: boolean;
}
