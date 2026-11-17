import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatAxisValue(value) {
  return value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`;
}

function IncomeTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-lg">
      <p className="mb-2 text-xs font-semibold text-slate-500">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-semibold text-slate-800">
          <span
            className="mr-2 inline-block size-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: {currency.format(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function MonthlyIncomeChart({ data, growth }) {
  const trend = `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`;

  return (
    <section className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Monthly Income</h2>
          <p className="mt-1 text-xs text-slate-500">
            Income by month, compared with the previous period
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            growth >= 0
              ? "bg-brand/5 text-brand"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {trend} vs previous
        </span>
      </div>

      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
              tickFormatter={formatAxisValue}
              width={48}
            />
            <Tooltip content={<IncomeTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              height={28}
              wrapperStyle={{ fontSize: "11px", color: "#64748B" }}
            />
            <Line
              type="monotone"
              dataKey="income"
              name="Selected period"
              stroke="var(--color-brand)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, fill: "var(--color-brand)", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="previousIncome"
              name="Previous period"
              stroke="#94A3B8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
