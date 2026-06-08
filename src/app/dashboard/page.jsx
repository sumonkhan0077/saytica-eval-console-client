import Link from "next/link";


export default async function Page() {


  return (
     <div className="space-y-4">
      <h1 className="text-4xl font-bold">
        Saytica Eval Console
      </h1>

      <p className="mt-2 text-gray-500">
        AI Model Evaluation Dashboard
      </p>
      
      <Link  href="/dashboard/model-leaderboard" className="bg-blue-600 p-2  rounded-xl text-white text-center mt-10">Go Dashboard</Link>
    </div>
  );
}