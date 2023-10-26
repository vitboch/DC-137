import { ReactNode } from 'react';

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface IOrigin {
  name: string;
  url: string;
}

export interface ILocation {
  name: string;
  url: string;
}

export interface IFormProps {
  signUp: boolean;
  handleClick: (email: string, pass: string, name?: string) => void;
  errMessage: string;
}

// export interface ICharacter {
//   id: number;
//   name: string;
//   image: string;
// }

export interface ICharactersState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  characters: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData extends ISignInData {
  name: string;
}

// export interface IUserState {
//   email: string | null;
//   token: string | null;
//   id: string | null;
//   name: string | null;
// }

export interface IProtectedRouteProps {
  children: ReactNode;
}
