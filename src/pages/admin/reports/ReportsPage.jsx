import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  Compass,
  DollarSign,
  Users,
} from "lucide-react";
import { REPORT_BOOKINGS } from "../../../data/reportData";
import BookingStatusChart from "./components/BookingStatusChart";
import MonthlyIncomeChart from "./components/MonthlyIncomeChart";
import PopularToursChart from "./components/PopularToursChart";
import RecentBookings from "./components/RecentBookings";
import ReportHeader from "./components/ReportHeader";
import StatisticsCard from "./components/StatisticsCard";
import { createExcelWorkbook } from "./reportExportUtils";
import {
  filterBookingsByRange,
  formatDateInput,
  getBookingStatusData,
  getGrowth,
  getMonthlyIncomeData,
  getPeriodLabel,
  getPopularToursData,
  getReportDateRanges,
  getReportMetrics,
} from "./reportUtils";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export default function ReportsPage() {
  const [period, setPeriod] = useState("year");
  const [customDates] = useState(() => {
    const today = new Date();
    return {
      start: formatDateInput(new Date(today.getFullYear(), today.getMonth(), 1)),
      end: formatDateInput(today),
    };
  });
  const [customStart, setCustomStart] = useState(customDates.start);
  const [customEnd, setCustomEnd] = useState(customDates.end);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [notice, setNotice] = useState(null);

  const ranges = useMemo(
    () => getReportDateRanges(period, customStart, customEnd),
    [period, customStart, customEnd],
  );
  const { current: currentRange, previous: previousRange } = ranges;
  const currentBookings = useMemo(
    () => filterBookingsByRange(REPORT_BOOKINGS, currentRange),
    [currentRange],
  );
  const previousBookings = useMemo(
    () => filterBookingsByRange(REPORT_BOOKINGS, previousRange),
    [previousRange],
  );
  const filteredBookings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return currentBookings.filter((booking) => {
      const matchesStatus = status === "All" || booking.status === status;
      const matchesSearch =
        !normalizedSearch ||
        booking.id.toLowerCase().includes(normalizedSearch) ||
        booking.customerName.toLowerCase().includes(normalizedSearch) ||
        booking.tourName.toLowerCase().includes(normalizedSearch);
      return matchesStatus && matchesSearch;
    });
  }, [currentBookings, search, status]);

  const currentMetrics = useMemo(
    () => getReportMetrics(currentBookings),
    [currentBookings],
  );
  const previousMetrics = useMemo(
    () => getReportMetrics(previousBookings),
    [previousBookings],
  );
  const incomeGrowth = getGrowth(currentMetrics.income, previousMetrics.income);
  const monthlyIncome = useMemo(
    () => getMonthlyIncomeData(currentBookings, previousBookings),
    [currentBookings, previousBookings],
  );
  const popularTours = useMemo(
    () => getPopularToursData(currentBookings),
    [currentBookings],
  );
  const bookingStatuses = useMemo(
    () => getBookingStatusData(currentBookings),
    [currentBookings],
  );
  const periodLabel = getPeriodLabel(period, customStart, customEnd);
  const exportRows = useMemo(
    () =>
      filteredBookings.map((booking) => ({
        "Booking ID": booking.id,
        "Customer Name": booking.customerName,
        "Tour Name": booking.tourName,
        "Booking Date": booking.bookingDate,
        Amount: booking.amount,
        "Payment Status": booking.paymentStatus,
        "Booking Status": booking.status,
      })),
    [filteredBookings],
  );

  const statistics = [
    {
      title: "Total Tours",
      value: currentMetrics.tours.toLocaleString(),
      change: getGrowth(currentMetrics.tours, previousMetrics.tours),
      icon: Compass,
    },
    {
      title: "Total Bookings",
      value: currentMetrics.bookings.toLocaleString(),
      change: getGrowth(currentMetrics.bookings, previousMetrics.bookings),
      icon: CalendarCheck,
    },
    {
      title: "Total Customers",
      value: currentMetrics.customers.toLocaleString(),
      change: getGrowth(currentMetrics.customers, previousMetrics.customers),
      icon: Users,
    },
    {
      title: "Total Income",
      value: CURRENCY_FORMATTER.format(currentMetrics.income),
      change: incomeGrowth,
      icon: DollarSign,
    },
  ];

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(null), 4500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  async function handleExportPdf() {
    if (!exportRows.length || ranges.error) return;

    try {
      const [jsPdfModule, autoTableModule] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
      ]);
      const jsPDF = jsPdfModule.jsPDF || jsPdfModule.default?.jsPDF;
      const autoTable =
        autoTableModule.default || autoTableModule.autoTable;
      const document = new jsPDF({ orientation: "landscape" });
      document.setFontSize(16);
      document.text("Tour-Trip Reports & Analytics", 14, 16);
      document.setFontSize(9);
      document.setTextColor(100);
      document.text(`${periodLabel} · ${exportRows.length} bookings`, 14, 23);
      autoTable(document, {
        startY: 29,
        head: [Object.keys(exportRows[0])],
        body: exportRows.map((row) => Object.values(row)),
        styles: { fontSize: 8, cellPadding: 2.5 },
        headStyles: { fillColor: [0, 129, 64] },
        alternateRowStyles: { fillColor: [246, 248, 249] },
      });
      document.save(`tour-trip-report-${period}.pdf`);
      setNotice({
        type: "success",
        message: `PDF report downloaded with ${exportRows.length} bookings.`,
      });
    } catch (error) {
      console.error("Could not export PDF report.", error);
      setNotice({
        type: "error",
        message: "The PDF report could not be exported. Please try again.",
      });
    }
  }

  async function handleExportExcel() {
    if (!exportRows.length || ranges.error) return;

    try {
      const rows = [
        Object.keys(exportRows[0]),
        ...exportRows.map((row) => Object.values(row)),
      ];
      const file = await createExcelWorkbook(rows);
      downloadBlob(
        new Blob([file], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `tour-trip-report-${period}.xlsx`,
      );
      setNotice({
        type: "success",
        message: `Excel report downloaded with ${exportRows.length} bookings.`,
      });
    } catch (error) {
      console.error("Could not export Excel report.", error);
      setNotice({
        type: "error",
        message: "The Excel report could not be exported. Please try again.",
      });
    }
  }

  return (
    <div className="mx-auto min-w-0 max-w-[1440px] space-y-6">
      <ReportHeader
        period={period}
        onPeriodChange={setPeriod}
        customStart={customStart}
        customEnd={customEnd}
        onCustomStartChange={setCustomStart}
        onCustomEndChange={setCustomEnd}
        dateError={ranges.error}
        onExportPdf={handleExportPdf}
        onExportExcel={handleExportExcel}
        canExport={!ranges.error && exportRows.length > 0}
      />

      <section
        aria-label="Performance statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {statistics.map((statistic) => (
          <StatisticsCard key={statistic.title} {...statistic} />
        ))}
      </section>

      <section
        aria-label="Income and popular tours"
        className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-3"
      >
        <div className="min-w-0 xl:col-span-2">
          <MonthlyIncomeChart data={monthlyIncome} growth={incomeGrowth} />
        </div>
        <PopularToursChart
          data={popularTours}
          totalBookings={currentBookings.length}
        />
      </section>

      <section
        aria-label="Booking analytics"
        className="grid grid-cols-1 gap-5 xl:grid-cols-3"
      >
        <div className="xl:col-span-1">
          <BookingStatusChart
            data={bookingStatuses}
            totalBookings={currentBookings.length}
          />
        </div>
        <div className="xl:col-span-2">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-700">
              Booking activity
            </h2>
            <span className="text-xs text-slate-400">{periodLabel}</span>
          </div>
          <RecentBookings
            key={`${period}-${customStart}-${customEnd}`}
            resetKey={`${period}-${customStart}-${customEnd}`}
            bookings={filteredBookings}
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
          />
        </div>
      </section>

      {notice && (
        <div
          role={notice.type === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`fixed bottom-5 right-5 z-50 max-w-sm rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
            notice.type === "error" ? "bg-rose-600" : "bg-slate-900"
          }`}
        >
          {notice.message}
        </div>
      )}
    </div>
  );
}
