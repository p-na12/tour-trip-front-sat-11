import { CalendarDays, FileSpreadsheet, FileText } from "lucide-react";

const DATE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
  { value: "custom", label: "Custom Range" },
];

export default function ReportHeader({
  period,
  onPeriodChange,
  customStart,
  customEnd,
  onCustomStartChange,
  onCustomEndChange,
  dateError,
  onExportPdf,
  onExportExcel,
  canExport,
}) {
  return (
    <header className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
          <CalendarDays size={14} />
          Performance overview
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Reports &amp; Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor your tourism business performance.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-44">
          <label
            htmlFor="report-period"
            className="mb-1.5 block text-xs font-semibold text-slate-500"
          >
            Report period
          </label>
          <select
            id="report-period"
            value={period}
            onChange={(event) => onPeriodChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
          >
            {DATE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {period === "custom" && (
          <div className="flex flex-wrap items-end gap-2">
            <div>
              <label
                htmlFor="report-start-date"
                className="mb-1.5 block text-xs font-semibold text-slate-500"
              >
                From
              </label>
              <input
                id="report-start-date"
                type="date"
                value={customStart}
                max={customEnd}
                onChange={(event) => onCustomStartChange(event.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
              />
            </div>
            <div>
              <label
                htmlFor="report-end-date"
                className="mb-1.5 block text-xs font-semibold text-slate-500"
              >
                To
              </label>
              <input
                id="report-end-date"
                type="date"
                value={customEnd}
                min={customStart}
                onChange={(event) => onCustomEndChange(event.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
              />
            </div>
          </div>
        )}

        <div>
          <p className="mb-1.5 text-xs font-semibold text-slate-500">
            Export report
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onExportPdf}
              disabled={!canExport}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileText size={16} />
              PDF
            </button>
            <button
              type="button"
              onClick={onExportExcel}
              disabled={!canExport}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileSpreadsheet size={16} />
              Excel
            </button>
          </div>
        </div>
      </div>

      {dateError && (
        <p role="alert" className="text-sm font-medium text-rose-600 xl:basis-full">
          {dateError}
        </p>
      )}
    </header>
  );
}
