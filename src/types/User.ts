// export type User = {
//   email: string;
//   password: string;
// };

export interface Root {
  login: Login[];
}

export interface Login {
  ok: boolean;
  data: Data;
}

export interface Data {
  id: string;
  name: string;
  tasks: Recado;
  token: string;
  pass: string;
  Rpass: string;
  userName: string;
  userId: string;
}

export interface Recado {
  data: [];
  id_task: string;
  description: string;
  detail: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}
