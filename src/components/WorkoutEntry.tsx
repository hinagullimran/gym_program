import { WorkoutEntry as Entry } from "@/types";

interface Props {
  entry: Entry;
}

export default function WorkoutEntry({ entry }: Props) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-zinc-800/50 last:border-0 last:pb-0">
      <div className="flex-1 pr-4">
        <h4 className="text-zinc-100 font-medium text-lg leading-tight tracking-wide">
          {entry.movement}
        </h4>
      </div>
      <div className="flex items-center gap-4 text-mono font-medium">
        <div className="flex flex-col items-center">
          <span className="text-emerald-400 text-xl">{entry.weight}</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
            kg
          </span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />
        <div className="flex flex-col items-center w-8">
          <span className="text-cyan-400 text-xl">{entry.reps}</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
            reps
          </span>
        </div>
      </div>
    </div>
  );
}
