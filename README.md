# Saytica Eval Console — Client

Frontend for the Saytica Eval Console take-home task. Built with Next.js 16, React 19, and Tailwind CSS v4.

**Live demo:** https://saytica-eval-console-client.vercel.app/

---

## Screens

**Model Leaderboard** — sortable table of AI models fetched from the backend. Columns: model name, provider, accuracy, latency (ms), cost per 1K calls. Values that are `null` in the source data render as `—` rather than `0` or blank. Accuracy and cost are colour-coded (green → good, orange/red → high) so a reader can spot outliers at a glance. Search and filter by provider or model type without a full page reload.

**Task Board** — one page, two views switched by a role toggle:
- **Annotator** — paginated list of assigned tasks with an inline status dropdown (pending → in progress → done). Changes hit the backend immediately with an optimistic UI update; the row shows a spinner while the request is in flight and reverts on failure.
- **Client** — read-only summary: stat cards for total / pending / in-progress / done counts, and a stacked progress bar per project derived from the live task data.

---

## Project structure

```
src/
  app/
    dashboard/
      layout.jsx               # shared sidebar shell
      model-leaderboard/
        page.jsx               # server component — fetches models, passes to component
      task-board/
        page.jsx               # server component — fetches tasks, passes to component
  components/
    Sidebar.jsx                # nav with active-route highlight via usePathname
    modelBoard/
      ModelLeaderBoard.jsx     # client component — sort, search, filter
    taskBoard/
      TaskBoardCom.jsx         # client component — role toggle, pagination, status edit
  server/
    models.service.js          # getModels()
    tasks.service.js           # getTasks(), updateTaskStatus()
  utils/
    server-fetch.jsx           # thin fetch wrapper around BASE_URL
```

Data fetching is split by Next.js convention: `page.jsx` files are async server components that call the service layer; interactive components are `"use client"` and receive data as props. This keeps the server/client boundary explicit and avoids unnecessary client-side waterfalls.

---

## Running locally on Linux

**Requirements:** Node.js 20+

```bash
git clone https://github.com/sumonkhan0077/saytica-eval-console-client
cd saytica-eval-console-client

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app points to the deployed backend at `https://saytica-eval-console-backend.vercel.app` — no local backend setup is needed to run the frontend.

To build for production:

```bash
npm run build
npm start
```

---

## Key decisions and trade-offs

**Null data handling.** The source data has `null` accuracy and cost values for some models. Rather than filtering those rows out or showing `0`, they display as `—` and sort to the bottom. This preserves the full dataset while making the gap obvious to the reader.

**Optimistic status updates.** Updating a task status feels instant because the UI changes before the server responds. If the request fails the row reverts and the user can try again. The alternative — waiting for the server — would feel sluggish for a table full of quick status changes.

**Project stats derived at runtime.** The client progress panel computes counts from the live task array rather than a separate endpoint. This means the bars update immediately when an annotator changes a status in the same session, without a refetch.

**Server components for data fetching.** `page.jsx` files are async server components so the initial HTML arrives with data already embedded. The interactive parts (`TaskBoardCom`, `ModelLeaderBoard`) are client components that receive that data as props — a clean boundary with no extra loading states on first render.

**Single codebase, two roles.** The annotator and client views live in the same component behind a toggle rather than two separate routes. The data and layout are nearly identical; splitting them would duplicate code without adding clarity.
