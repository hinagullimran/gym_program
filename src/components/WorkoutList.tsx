import { WorkoutEntry as Entry } from "@/types";
import WorkoutEntryComponent from "./WorkoutEntry";

interface Props {
  entries: Entry[];
}

export default function WorkoutList({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500 italic">
        No sets logged today. Grab some iron!
      </div>
    );
  }

  // Group entries sequentially to maintain chronological order
  // but let's just display a flat list since it works chronologically nicely.
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
      <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-4 pl-1">
        Today&apos;s Log
      </h3>
      <div className="flex flex-col">
        {entries.map((entry, idx) => (
          <WorkoutEntryComponent key={entry.id || idx} entry={entry} />
        ))}
      </div>
    </div>
  );
}
