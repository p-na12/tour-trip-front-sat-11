import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const STATUS_COLORS = {
  Pending: "#D97706",
  Confirmed: "#008140",
  Completed: "#64748B",
  Cancelled: "#E11D48",
};

function StatusTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-slate-800">{item.status}</p>
      <p className="mt-0.5 text-xs text-slate-500">
        {item.count.toLocaleString()} bookings ({item.percentage.toFixed(1)}%)
      </p>
    </div>
  );
}

export default function BookingStatusChart({ data, totalBookings }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-2">
        <h2 className="text-base font-bold text-slate-900">
          Booking Status Analytics
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Distribution of bookings by status
        </p>
      </div>

      <div className="relative mx-auto h-52 max-w-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              outerRadius={84}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.status} fill={STATUS_COLORS[item.status]} />
              ))}
            </Pie>
            <Tooltip content={<StatusTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">
            {totalBookings.toLocaleString()}
          </span>
          <span className="text-[11px] font-medium text-slate-500">bookings</span>
        </div>
      </div>

      <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-3">
        {data.map((item) => (
          <li key={item.status} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[item.status] }}
              />
              <span className="truncate text-xs font-medium text-slate-600">
                {item.status}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-800">
              {item.percentage.toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
