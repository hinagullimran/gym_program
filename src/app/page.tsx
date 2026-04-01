"use client";

import { useEffect, useState } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import { WorkoutEntry } from "@/types";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

export default function Home() {
  const [entries, setEntries] = useState<WorkoutEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Use local date string as document ID (e.g. "2023-10-25")
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
  const docRef = doc(db, "workouts", today);

  useEffect(() => {
    async function fetchToday() {
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setEntries(snap.data().entries || []);
        } else {
          // It's technically okay if it doesn't exist, we will create it on first insert
          setEntries([]);
        }
      } catch (err) {
        console.error("Firestore error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchToday();
  }, [today, docRef]);

  const handleAddEntry = async (newEntry: Omit<WorkoutEntry, "id">) => {
    // Generate a quick random ID for local optimistic UI keys
    const entryWithId = { ...newEntry, id: Math.random().toString(36).substr(2, 9) };
    
    // Optimistic UI update
    setEntries((prev) => [...prev, entryWithId]);

    try {
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        await setDoc(docRef, {
          date: Timestamp.fromDate(new Date()),
          createdAt: Timestamp.now(),
          entries: [entryWithId],
        });
      } else {
        await updateDoc(docRef, {
          entries: arrayUnion(entryWithId),
        });
      }
    } catch (err) {
      console.error("Error writing document: ", err);
      // Rollback optimistic update if it fails
      setEntries((prev) => prev.filter(e => e.id !== entryWithId.id));
      alert("Failed to save entry to database. Check your internet connection.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <WorkoutForm onAdd={handleAddEntry} />
      </section>

      <section>
        <WorkoutList entries={entries} />
      </section>
    </div>
  );
}
