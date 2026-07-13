"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Props { score: number; size?: number; }

const getColor = (s: number) =>
  s >= 80 ? "#21B76B" : s >= 65 ? "#5244E3" : s >= 50 ? "#F4A825" : "#FE6B52";

export default function HealthScoreRing({ score, size = 100 }: Props) {
  const color = getColor(score);
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  return (
    <div style={{ width: size, height: size }} className="relative flex-shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.33}
            outerRadius={size * 0.46}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={color} />
            <Cell fill="rgba(148,163,184,0.15)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading font-bold text-brand-dark" style={{ fontSize: size * 0.24 }}>
          {score}
        </span>
      </div>
    </div>
  );
}
