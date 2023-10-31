import { ReactNode } from 'react';
import { Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

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

export interface ICharactersState {
  characters: {
    info: ICharactersInfoState;
    results: ICharacter[];
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ICharactersInfoState {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData extends ISignInData {
  name: string;
}

export interface ISearchParams {
  name: string;
  status: string;
  gender: string;
}

export interface IHistoryRecord extends ISearchParams {
  timestamp: Timestamp;
}

export interface IProtectedRouteProps {
  children: ReactNode;
}

export interface IUserState {
  user: User | null;
  favorites: number[] | undefined;
  status: string;
}

export interface IState {
  userData: IUserState;
  characters: ICharactersState;
}

export interface IPageLayoutProps {
  head: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'success' | 'danger';
}

export interface CharacterProps {
  character: ICharacter;
}

export interface CharactersProps {
  characters: ICharacter[];
}

export interface PaginationItemProps {
  page: string | number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isDisabled: boolean;
}

export interface PagesCutParams {
  pagesCount: number;
  pagesCutCount: number;
  currentPage: number;
}

export interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export interface IUseInput {
  value: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent) => void;
  error: string | null;
}

export interface IInputValidation {
  required: boolean;
  regex: RegExp;
  errMessage: string;
}
