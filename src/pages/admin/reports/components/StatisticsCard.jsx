import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatisticsCard({
  title,
  value,
  change,
  icon: Icon,
}) {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const formattedChange = `${Math.abs(change).toFixed(1)}%`;

  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 truncate text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/5 text-brand">
          <Icon size={20} strokeWidth={1.8} />
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
        <span
          className={`inline-flex items-center gap-0.5 font-semibold ${
            isPositive ? "text-brand" : "text-rose-600"
          }`}
        >
          <TrendIcon size={15} />
          {formattedChange}
        </span>
        <span className="text-slate-400">vs previous period</span>
      </div>
    </article>
  );
}
