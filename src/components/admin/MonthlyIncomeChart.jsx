
import { Line } from "react-chartjs-2";
import { MONTHLY_INCOME } from "../../constants/dashboardOverviewData";
import { useTranslation } from "react-i18next";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

export default function MonthlyIncomeChart() {
    const { t } = useTranslation();
    const monthKeys = ["may", "jun", "jul", "aug", "sep", "oct"];
    // Chart Data
    const data = {
        labels: MONTHLY_INCOME.map(
            (_, index) => t(`adminDashboard.months.${monthKeys[index]}`)
        ),

        datasets: [
            {
                label: t("adminDashboard.monthlyIncomeSeries"),

                data: MONTHLY_INCOME.map(
                    (item) => item.value
                ),

                fill: true,

                borderColor: "rgb(15, 118, 110)",

                backgroundColor:
                    "rgba(15, 118, 110, 0.10)",

                borderWidth: 3,

                tension: 0.4,

                pointRadius: 5,

                pointHoverRadius: 8,

                pointBackgroundColor:
                    "rgb(15, 118, 110)",

                pointBorderColor: "#ffffff",

                pointBorderWidth: 2,
            },
        ],
    };
    // Chart Options
    const options = {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            intersect: false,
            mode: "index",
        },

        plugins: {

            legend: {
                display: false,
            },

            tooltip: {

                backgroundColor: "#0f172a",

                padding: 12,

                cornerRadius: 10,

                displayColors: false,

                callbacks: {

                    title: (items) => {
                        return items[0].label;
                    },

                    label: (context) => {
                        return `$${context.raw.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {

            x: {

                grid: {
                    display: false,
                },

                border: {
                    display: false,
                },

                ticks: {
                    color: "#94a3b8",

                    font: {
                        size: 12,
                        weight: "500",
                    },
                },
            },


            y: {

                min: 0,

                max: 50000,

                ticks: {

                    stepSize: 5000,

                    color: "#94a3b8",

                    font: {
                        size: 11,
                    },

                    callback: (value) => {
                        return `$${value / 1000}k`;
                    },
                },

                grid: {

                    color: "rgba(226, 232, 240, 0.7)",

                    drawTicks: false,
                },

                border: {
                    display: false,
                },
            },
        },
    };
    // UI
    return (
        <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {t("adminDashboard.monthlyIncome")}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        {t("adminDashboard.incomeDescription")}
                    </p>
                </div>
                <button
                    className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-lg
                        text-xl font-bold
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-700
                    "
                >
                    ⋮
                </button>
            </div>
            {/* Summary */}
            <div className="mb-5 flex items-end justify-between">

                <div>

                    <p className="text-xs font-medium text-slate-400">
                        Current Income
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-slate-900">
                        $45,200
                    </h4>

                </div>


                <div
                    className="
                        rounded-full
                        bg-emerald-50
                        px-3 py-1
                        text-xs font-semibold
                        text-emerald-600
                    "
                >
                    ↑ 15.2%
                </div>

            </div>


            {/* Chart */}
            <div className="min -h- [280px] flex-1">

                <Line
                    data={data}
                    options={options}
                />

            </div>

        </div>
    );
}
