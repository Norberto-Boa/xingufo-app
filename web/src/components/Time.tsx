"use client";

import { Clock } from "phosphor-react";
import { formatTime } from "../utils/FormatDate";

interface TimeProps {
  gameTime: Date | string;
}

export default function Time({ gameTime }: TimeProps) {
  return (
    <div className="flex items-center gap-2">
      <Clock size={24} className="text-emerald-500" />
      {formatTime(gameTime)}
    </div>
  );
}
