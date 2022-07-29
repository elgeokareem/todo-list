import { Dispatch, SetStateAction } from "react";

export interface Task {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string | null;
  done: boolean;
  authorId: number;
}

export interface User {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string | Date;
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface GetData {
  tasks: {
    authorId: number;
    tasks: Task[];
  };
}

export interface AddUser {
  email: string;
}

export interface AddTask {
  title: string;
  authorId: number;
}

export interface EditTask {
  title?: string;
  done?: boolean;
}

export interface TodoProp {
  id: number;
  done: boolean;
  title: string;
}

export interface TodoPropEdit extends TodoProp {
  setEdit: Dispatch<SetStateAction<boolean>>;
}
