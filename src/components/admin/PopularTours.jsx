import { Doughnut } from "react-chartjs-2";
import { POPULAR_TOURS } from "../../constants/dashboardOverviewData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PopularTours() {
    const { t } = useTranslation();
    const tourNameKeys = ["angkorSunrise", "mekongDelta", "kohRongIsland", "siemReapFood"];
    // Convert your POPULAR_TOURS data to Chart.js format
    const data = {
        labels: POPULAR_TOURS.map((_, index) => t(`adminDashboard.${tourNameKeys[index]}`)),

        datasets: [
            {
                label: "Popular Tours",

                data: POPULAR_TOURS.map((tour) => tour.percentage),

                backgroundColor: [
                    "rgb(59, 120, 82)",
                    "rgb(233, 186, 45)",
                    "rgb(107, 114, 128)",
                    "rgb(185, 181, 181)",
                ],

                hoverOffset: 8,

                borderWidth: 3,

                borderColor: "#ffffff",
            },
        ],
    };

    const options = {
        responsive: true,

        maintainAspectRatio: false,

        cutout: "72%",

        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                backgroundColor: "#0f172a",

                padding: 12,

                cornerRadius: 10,

                callbacks: {
                    label: function (context) {
                        return ` ${context.label}: ${context.raw}%`;
                    },
                },
            },
        },
    };

    return (
        <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            {/* ================= HEADER ================= */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">{t("adminDashboard.popularTours")}</h3>

                    <p className="mt-1 text-xs text-slate-400">
                        {t("adminDashboard.popularCategories")}
                    </p>
                </div>

                <button
                    className="
                        flex h-9 w-9 items-center justify-center
                        rounded-lg text-xl font-bold
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-700
                    "
                >
                    ⋮
                </button>
            </div>

            {/* ================= DOUGHNUT ================= */}
            <div className="relative mx-auto my-4 h-56 w-56">
                <Doughnut data={data} options={options} />

                {/* Center Content */}
                <div
                    className="
                        pointer-events-none
                        absolute inset-0
                        flex flex-col
                        items-center
                        justify-center
                    "
                >
                    <span className="text-3xl font-bold text-slate-900">42</span>

                    <span className="mt-1 text-xs font-medium text-slate-400">
                        {t("adminDashboard.activeTours")}
                    </span>

                    <span className="mt-1 text-[10px] font-semibold text-emerald-600">
                        {t("adminDashboard.thisMonthTrend")}
                    </span>
                </div>
            </div>

            {/* ================= TOUR LIST ================= */}
            <div className="mt-4 space-y-3">
                {POPULAR_TOURS.map((tour, idx) => (
                    <div
                        key={idx}
                        className="
                            group flex items-center
                            justify-between rounded-xl
                            px-2 py-2
                            transition
                            hover:bg-slate-50
                        "
                    >
                        <div className="flex items-center gap-3">
                            {/* Number */}
                            <span
                                className="
                                    flex h-7 w-7
                                    items-center justify-center
                                    rounded-lg bg-slate-100
                                    text-xs font-bold
                                    text-slate-500
                                    transition
                                    group-hover:bg-teal-50
                                    group-hover:text-teal-700
                                "
                            >
                                {idx + 1}
                            </span>

                            {/* Color */}
                            <span
                                className={`
                                    h-2.5 w-2.5 rounded-full
                                    ${tour.color.split(" ")[0]}
                                `}
                            />

                            <span className="text-sm font-medium text-slate-600">
                                {t(`adminDashboard.${tourNameKeys[idx]}`)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">
                                {tour.percentage}%
                            </span>

                            <span className="text-xs text-slate-300">→</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= FOOTER ================= */}
            <button
                className="
                    mt-5 w-full rounded-xl
                    border border-slate-200
                    py-2.5 text-xs font-semibold
                    text-slate-600
                    transition-all
                    hover:border-teal-200
                    hover:bg-teal-50
                    hover:text-teal-700
                "
            >
                {t("adminDashboard.viewAllTours")} →
            </button>
        </div>
    );
}
