"use client";

import { MapPin } from "phosphor-react";

interface LocationProps {
  location: string;
}

export default function Location({ location }: LocationProps) {
  return (
    <div className="flex items-center gap-2">
      <MapPin size={24} className="text-emerald-500" />
      {location}
    </div>
  );
}
