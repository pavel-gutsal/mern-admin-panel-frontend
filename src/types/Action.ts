import { User } from './User';

type Payload1 = {
  list: User[];
}

type Payload2 = {
  id: string;
}

type Payload3 = {
  updatedUser: User;
}

export type Action = { type: 'CREATE'; payload: Payload1 }
| { type: 'DELETE'; payload: Payload2 }
| { type: 'UPDATE'; payload: Payload3 }
