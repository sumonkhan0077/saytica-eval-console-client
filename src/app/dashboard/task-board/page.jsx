import TaskBoardCom from "@/components/taskBoard/TaskBoardCom";
import { getTasks } from "@/server/tasks.service";

export default async function TaskPage() {
   const res = await getTasks();
  //  console.log(res)
  return <div>
    <TaskBoardCom initialTasks={res.success ? res.data : []}/>
  </div>;
}