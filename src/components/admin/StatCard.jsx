export default function StatCard({ title, value, change, icon }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
                    {icon}
                </div>
                <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-600">
                    ↗ {change}
                </span>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
            </div>
        </div>
    );
}