import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const TOUR_COLORS = ["#008140", "#1D9A69", "#51B689", "#83CCA8", "#B6DEC9"];

function TourTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const tour = payload[0].payload;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-slate-800">{tour.name}</p>
      <p className="mt-0.5 text-xs text-slate-500">
        {tour.count.toLocaleString()} bookings ({tour.percentage.toFixed(1)}%)
      </p>
    </div>
  );
}

export default function PopularToursChart({ data, totalBookings }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-2">
        <h2 className="text-base font-bold text-slate-900">Popular Tours</h2>
        <p className="mt-1 text-xs text-slate-500">
          Top tours by booking volume
        </p>
      </div>

      <div className="relative mx-auto h-52 max-w-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              innerRadius={62}
              outerRadius={86}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((tour, index) => (
                <Cell key={tour.name} fill={TOUR_COLORS[index % TOUR_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<TourTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">
            {totalBookings.toLocaleString()}
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            total bookings
          </span>
        </div>
      </div>

      <ul className="mt-2 space-y-3">
        {data.map((tour, index) => (
          <li key={tour.name} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: TOUR_COLORS[index % TOUR_COLORS.length] }}
              />
              <span className="truncate text-xs font-medium text-slate-600">
                {tour.name}
              </span>
            </div>
            <span className="shrink-0 text-xs font-semibold text-slate-800">
              {tour.count} <span className="font-normal text-slate-400">({tour.percentage.toFixed(0)}%)</span>
            </span>
          </li>
        ))}
        {data.length === 0 && (
          <li className="py-3 text-center text-sm text-slate-400">
            No tour bookings for this period.
          </li>
        )}
      </ul>
    </section>
  );
}
