export interface ICharacterAll {
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
  title: string;
  handleClick: (email: string, pass: string) => void;
}

export interface ICharacter {
  id: number;
  name: string;
  image: string;
}

export interface ICharactersState {
  characters: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface IUserState {
  email: string | null;
  token: string | null;
  id: string | null;
}
