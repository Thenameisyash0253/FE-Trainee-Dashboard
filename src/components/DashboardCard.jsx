
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardCard({ title, total, data, children, extraClass }) {
  const hasChart = data && data.length > 0;
  return (
    <div className={`card ${extraClass || ""}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-content">
        {/* Pie / Donut Chart */}
        {hasChart ? (
          <div className="chart-row">
            <div className="chart-box">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={55}
                    paddingAngle={3}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  {/* ✅ Center text inside pie */}
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    {total}
                  </text>
                  <text
                    x="50%"
                    y="62%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: "12px", fill: "#6b7280" }}
                  >
                    Total
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* ✅ Legend right side */}
            <ul className="legend">
              {data.map((entry, i) => (
                <li key={i}>
                  <span
                    className="legend-dot"
                    style={{ background: entry.color }}
                  ></span>
                  {entry.name} ({entry.value})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}


