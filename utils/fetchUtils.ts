import { GetDataServer, Task } from "../types";

export function addTodo(oldData: GetDataServer, newTodo: Task): GetDataServer {
  return {
    authorId: oldData.authorId,
    tasks: [...oldData.tasks, newTodo]
  };
}

export function editTodo(
  oldData: GetDataServer,
  newTodo: Partial<GetDataServer["tasks"][number]>
): GetDataServer {
  const newTasks = oldData.tasks.map(todo => {
    if (todo.id === newTodo.id) {
      return { ...todo, ...newTodo };
    }
    return todo;
  });

  return {
    authorId: oldData.authorId,
    tasks: newTasks
  };
}

export function deleteTodo(oldData: GetDataServer, id: number) {
  return {
    authorId: oldData.authorId,
    tasks: oldData.tasks.filter(todo => todo.id !== id)
  };
}
