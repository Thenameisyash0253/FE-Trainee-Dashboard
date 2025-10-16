import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

// Cloud Account Risk Data
const cloudRiskData = [
  { name: "Failed", value: 1689, color: "#EF4444" },
  { name: "Warning", value: 681, color: "#F59E0B" },
  { name: "Not Available", value: 36, color: "#9CA3AF" },
  { name: "Passed", value: 7253, color: "#10B981" },
];

export default function Dashboard() {
  return (
    <div className="dashboard-grid">
      {/* Cloud Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Cloud Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="big-number">2</div>
          <p className="muted">Connected (2)</p>
        </CardContent>
      </Card>

      {/* Cloud Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Cloud Account Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-box" style={{ width: "100%", height: 250}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie 
             
                  data={cloudRiskData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {cloudRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="muted center">9659 Total</p>
        </CardContent>
      </Card>

      {/* Registry Scan */}
      <Card>
        <CardHeader>
          <CardTitle>Image Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="bold">1470 Total Vulnerabilities</p>
          <div className="progress-bar">
            <div className="critical" style={{ width: "10%" }}></div>
            <div className="high" style={{ width: "20%" }}></div>
            <div className="medium" style={{ width: "30%" }}></div>
            <div className="low" style={{ width: "40%" }}></div>
        </div>
       </CardContent>
     </Card>
     
     </div>
  );
}



