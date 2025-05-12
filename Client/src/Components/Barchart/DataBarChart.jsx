import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tickFormatter={(str) => {
              const date = new Date(str + "-01");
              return date.toLocaleString("default", { month: "short" });
            }}
          />

          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Donations" fill="#1984c5" />
          <Bar dataKey="Expenses" fill=" #c23728" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
