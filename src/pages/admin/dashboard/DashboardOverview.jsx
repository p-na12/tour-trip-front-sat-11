import StatCard from "../../../components/admin/StatCard";
import MonthlyIncomeChart from "../../../components/admin/MonthlyIncomeChart";
import PopularTours from "../../../components/admin/PopularTours";
import { STATS_DATA } from "../../../constants/dashboardOverviewData";

export default function DashboardOverview() {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Page Top Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
                        <p className="text-sm text-slate-500 mt-0.5">{today}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition">
                            📅 This month ▾
                        </button>
                        <button className="inline-flex items-center px-4 py-2 bg-green-800 rounded-xl text-sm font-semibold text-white shadow-sm hover:bg-green-900 transition">
                            ⬇ Export report
                        </button>
                    </div>
                </div>
                {/* Top Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS_DATA.map((stat, idx) => (
                        <StatCard
                            key={idx}
                            {...stat}
                            title={["Total tours", "Total bookings", "Total customers", "Total income"][idx]}
                            changeLabel="vs last month"
                        />
                    ))}
                </div>

                {/* Dynamic Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <MonthlyIncomeChart />
                    </div>
                    <div>
                        <PopularTours />
                    </div>
                </div>

            </div>
        </div>
    );
}