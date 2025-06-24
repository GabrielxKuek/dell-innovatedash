// src/components/analytics/ChartComponents.jsx - Fixed Chart Library (No Conflicts)
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart as RechartsAreaChart, Area, ScatterChart, Scatter, 
  RadarChart as RechartsRadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, formatter, labelFormatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg border-gray-200">
        <p className="font-medium text-gray-900 mb-2">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            <span className="font-medium">{entry.name}:</span> {' '}
            {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Trend Line Chart
export const TrendChart = ({ data, title, height = 300, lines, formatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="year" 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <Tooltip 
          content={<CustomTooltip formatter={formatter} />}
        />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: line.color, strokeWidth: 2 }}
            name={line.name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Stacked Bar Chart
export const StackedBarChart = ({ data, title, height = 300, bars, formatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <Tooltip 
          content={<CustomTooltip formatter={formatter} />}
        />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.key}
            stackId="a"
            fill={bar.color}
            name={bar.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Donut Chart
export const DonutChart = ({ data, height = 300, title, centerText, showPercentage = true }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6 relative">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          content={<CustomTooltip formatter={(value) => showPercentage ? `${value}%` : value} />}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
    {centerText && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{centerText.value}</div>
          <div className="text-sm text-gray-600">{centerText.label}</div>
        </div>
      </div>
    )}
  </div>
);

// Horizontal Bar Chart
export const HorizontalBarChart = ({ data, height = 400, title, valueFormatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          type="number" 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          dataKey="name" 
          type="category" 
          width={120} 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <Tooltip 
          content={<CustomTooltip formatter={valueFormatter} />}
        />
        <Bar dataKey="total" fill="#3b82f6" name="Total" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Custom Area Chart (renamed to avoid conflict)
export const CustomAreaChart = ({ data, title, height = 300, areas, formatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <Tooltip 
          content={<CustomTooltip formatter={formatter} />}
        />
        <Legend />
        {areas.map((area, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={area.key}
            stackId="1"
            stroke={area.color}
            fill={area.color}
            fillOpacity={0.6}
            name={area.name}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  </div>
);

// Scatter Plot
export const ScatterPlot = ({ data, title, height = 300, xKey, yKey, formatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey={xKey} 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          dataKey={yKey} 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <Tooltip 
          content={<CustomTooltip formatter={formatter} />}
        />
        <Scatter dataKey={yKey} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  </div>
);

// Comparison Bar Chart (Side by side)
export const ComparisonBarChart = ({ data, title, height = 300, categories, formatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <Tooltip 
          content={<CustomTooltip formatter={formatter} />}
        />
        <Legend />
        {categories.map((category, index) => (
          <Bar
            key={index}
            dataKey={category.key}
            fill={category.color}
            name={category.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Multi-line Trend Chart with dual Y-axis
export const DualAxisChart = ({ data, title, height = 300, leftAxis, rightAxis, formatter }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          yAxisId="left"
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
        />
        <Tooltip 
          content={<CustomTooltip formatter={formatter} />}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey={leftAxis.key}
          stroke={leftAxis.color}
          strokeWidth={2}
          dot={{ fill: leftAxis.color, strokeWidth: 2, r: 4 }}
          name={leftAxis.name}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={rightAxis.key}
          stroke={rightAxis.color}
          strokeWidth={2}
          dot={{ fill: rightAxis.color, strokeWidth: 2, r: 4 }}
          name={rightAxis.name}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Progress Bar Chart (for targets vs actual)
export const ProgressChart = ({ data, title, height = 300 }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <div className="space-y-6" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
            <div className="text-right">
              <span className="text-sm font-semibold text-gray-900">
                {item.current}/{item.target}
              </span>
              <span className="text-xs text-gray-500 block">
                {Math.round((item.current / item.target) * 100)}%
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-300 ${
                  (item.current / item.target) >= 1 ? 'bg-green-500' :
                  (item.current / item.target) >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
              ></div>
              {/* Target line */}
              <div 
                className="absolute top-0 w-0.5 h-4 bg-gray-800"
                style={{ left: '100%' }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Current: {item.current}</span>
            <span>Target: {item.target}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Custom Radar Chart (renamed to avoid conflict)
export const CustomRadarChart = ({ data, title, height = 300, dataKey }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <RechartsRadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis 
          dataKey="subject" 
          fontSize={12}
          className="text-gray-600"
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]}
          fontSize={10}
          className="text-gray-500"
        />
        <Radar
          dataKey={dataKey}
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip 
          content={<CustomTooltip formatter={(value) => `${value}%`} />}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  </div>
);

// Heat Map Chart (using styled divs since recharts doesn't have heatmap)
export const HeatMapChart = ({ data, title, height = 300, colorScale }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <div className="grid grid-cols-7 gap-1" style={{ height }}>
      {data.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="rounded flex items-center justify-center text-xs font-medium"
            style={{
              backgroundColor: colorScale ? colorScale(cell.value) : `hsl(220, 70%, ${100 - cell.value}%)`,
              color: cell.value > 50 ? 'white' : 'black'
            }}
            title={`${cell.label}: ${cell.value}`}
          >
            {cell.display || cell.value}
          </div>
        ))
      )}
    </div>
  </div>
);

// Gauge Chart
export const GaugeChart = ({ value, title, max = 100, segments, height = 200 }) => {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
      <div className="relative flex flex-col items-center" style={{ height }}>
        <div className="relative w-32 h-16 mb-4">
          {/* Background arc */}
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path
              d="M 10,45 A 35,35 0 0,1 90,45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Value arc */}
            <path
              d="M 10,45 A 35,35 0 0,1 90,45"
              stroke={segments?.find(s => value >= s.min && value <= s.max)?.color || "#3b82f6"}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(percentage / 100) * 126} 126`}
            />
          </svg>
          {/* Needle */}
          <div 
            className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gray-800 origin-bottom transform -translate-x-1/2"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
          ></div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">out of {max}</div>
        </div>
      </div>
    </div>
  );
};

// Simple Pie Chart (alternative to donut)
export const SimplePieChart = ({ data, title, height = 300 }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

// Mini Chart for cards
export const MiniChart = ({ data, type = 'line', color = '#3b82f6', height = 60 }) => (
  <ResponsiveContainer width="100%" height={height}>
    {type === 'line' ? (
      <LineChart data={data}>
        <Line 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2} 
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    ) : (
      <BarChart data={data}>
        <Bar dataKey="value" fill={color} />
      </BarChart>
    )}
  </ResponsiveContainer>
);

// // Export all components
// export {
//   CustomTooltip,
//   TrendChart,
//   StackedBarChart,
//   DonutChart,
//   HorizontalBarChart,
//   CustomAreaChart,        // Renamed from AreaChart
//   ScatterPlot,
//   ComparisonBarChart,
//   DualAxisChart,
//   ProgressChart,
//   CustomRadarChart,       // Renamed from RadarChart
//   HeatMapChart,
//   GaugeChart,
//   SimplePieChart,
//   MiniChart
// };