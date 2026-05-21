import { useEffect, useState } from "react";

export function CountdownTimer() {
  const [seconds, setSeconds] = useState(5 * 3600 + 12 * 60 + 45);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>Countdown:</span>
      {[h, m, s].map((part, index) => (
        <span key={`${part}-${index}`} className="price-font rounded bg-navy-950 px-2 py-1 text-white">
          {part}
        </span>
      ))}
    </div>
  );
}
