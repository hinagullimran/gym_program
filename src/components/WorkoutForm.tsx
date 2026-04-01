"use client";

import { useState } from "react";
import { WorkoutEntry } from "@/types";

interface Props {
  onAdd: (entry: Omit<WorkoutEntry, "id">) => void;
}

export default function WorkoutForm({ onAdd }: Props) {
  const [movement, setMovement] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!movement.trim() || !reps || !weight) return;

    onAdd({
      movement: movement.trim(),
      reps: Number(reps),
      weight: Number(weight),
    });

    // Reset only reps and weight, keep movement for quick-add last set
    setReps("");
    // setWeight(""); optional to keep weight for next set
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-zinc-800 shadow-xl"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
            Movement
          </label>
          <input
            type="text"
            placeholder="e.g. Bench Press"
            value={movement}
            onChange={(e) => setMovement(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-lg outline-none transition-all placeholder-zinc-600"
            required
            autoCapitalize="words"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
              Weight <span className="text-zinc-500">(kg)</span>
            </label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-lg outline-none transition-all placeholder-zinc-600 font-mono"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
              Reps
            </label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-lg outline-none transition-all placeholder-zinc-600 font-mono"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-transform"
        >
          Add Set
        </button>
      </div>
    </form>
  );
}
