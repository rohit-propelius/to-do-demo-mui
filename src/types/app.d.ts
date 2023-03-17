interface IReducerObj {
  count: number;
  todos: string[];
  completed: string[];
  filterdData: string[];
}

interface IActionObj {
  type: string;
  value?: string | {};
  key?: number;
}

interface IKeyValuePair {
  [key: string]: {
    key?: number
    value?: string
  };
}

interface IGlobalStateObj {
  isValid: boolean;
  values: IKeyValuePair;
  touched: IKeyValuePair;
  errors: IKeyValuePair;
}