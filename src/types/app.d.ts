interface IReducerObj {
  count: number;
  todos: string[];
  completed: string[];
  filterdData: string[];
}

interface IActionObj {
  type: string;
  value: string | {};
  key: number;
}