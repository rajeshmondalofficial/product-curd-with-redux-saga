import {UserI} from './user';

export interface InitialAuthstate {
  user?: UserI;
  errorMessage?: string;
}
