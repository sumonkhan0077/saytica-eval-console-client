import ModelLeaderBoard from "@/components/modelBoard/ModelLeaderBoard";
import { getModels } from "@/server/models.service";

export default async function ModelPage() {
  const res = await getModels()
  return <div>
    <ModelLeaderBoard initialTasks={res.success ? res.data : []}/>
  </div>;
}
