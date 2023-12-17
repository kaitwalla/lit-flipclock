import {createContext} from '@lit/context';

export interface TimeStruct {
  hour: number;
  minute: number;
  second: number;
}

export const timeContext = createContext<TimeStruct>(0);
