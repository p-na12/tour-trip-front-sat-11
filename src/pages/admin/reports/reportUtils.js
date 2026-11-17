const DAY_IN_MS = 24 * 60 * 60 * 1000;
const BOOKING_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function parseDateInput(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}

function daysBetween(start, end) {
  return Math.round((end - start) / DAY_IN_MS) + 1;
}

function previousInterval(start, end) {
  const previousEnd = addDays(start, -1);
  return {
    start: addDays(previousEnd, -(daysBetween(start, end) - 1)),
    end: previousEnd,
  };
}

export function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getReportDateRanges(period, customStart, customEnd, currentDate = new Date()) {
  const today = startOfDay(currentDate);
  let start;
  let end = today;
  let previous;

  if (period === "custom") {
    start = parseDateInput(customStart);
    end = parseDateInput(customEnd);

    if (!start || !end || start > end) {
      return {
        current: null,
        previous: null,
        error: "Choose a valid start and end date.",
      };
    }

    previous = previousInterval(start, end);
  } else if (period === "today") {
    start = today;
    previous = { start: addDays(today, -1), end: addDays(today, -1) };
  } else if (period === "week") {
    const weekday = (today.getDay() + 6) % 7;
    start = addDays(today, -weekday);
    previous = { start: addDays(start, -7), end: addDays(end, -7) };
  } else if (period === "month") {
    start = new Date(today.getFullYear(), today.getMonth(), 1);
    const previousMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const previousMonthLastDay = new Date(
      previousMonthStart.getFullYear(),
      previousMonthStart.getMonth() + 1,
      0,
    ).getDate();
    const previousMonthEnd = new Date(
      previousMonthStart.getFullYear(),
      previousMonthStart.getMonth(),
      Math.min(today.getDate(), previousMonthLastDay),
    );
    previous = { start: previousMonthStart, end: previousMonthEnd };
  } else {
    start = new Date(today.getFullYear(), 0, 1);
    const previousYearStart = new Date(today.getFullYear() - 1, 0, 1);
    const previousYearLastDay = new Date(
      today.getFullYear() - 1,
      today.getMonth() + 1,
      0,
    ).getDate();
    previous = {
      start: previousYearStart,
      end: new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        Math.min(today.getDate(), previousYearLastDay),
      ),
    };
  }

  return { current: { start, end }, previous, error: "" };
}

export function filterBookingsByRange(bookings, range) {
  if (!range) return [];

  return bookings.filter((booking) => {
    const bookingDate = parseDateInput(booking.bookingDate);
    return bookingDate >= range.start && bookingDate <= range.end;
  });
}

export function getPeriodLabel(period, customStart, customEnd) {
  const labels = {
    today: "Today",
    week: "This Week",
    month: "This Month",
    year: "This Year",
  };
  if (period !== "custom") return labels[period] || "This Year";
  return `${customStart} to ${customEnd}`;
}

function sumIncome(bookings) {
  return bookings.reduce((total, booking) => total + booking.amount, 0);
}

export function getReportMetrics(bookings) {
  return {
    tours: new Set(bookings.map((booking) => booking.tourName)).size,
    bookings: bookings.length,
    customers: new Set(bookings.map((booking) => booking.customerName)).size,
    income: sumIncome(bookings),
  };
}

export function getGrowth(currentValue, previousValue) {
  if (previousValue === 0) return currentValue === 0 ? 0 : 100;
  return ((currentValue - previousValue) / previousValue) * 100;
}

export function getMonthlyIncomeData(currentBookings, previousBookings) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlySums = Array.from({ length: 12 }, (_, index) => ({
    month: monthNames[index],
    income: 0,
    previousIncome: 0,
  }));

  currentBookings.forEach((booking) => {
    const monthIndex = Number(booking.bookingDate.slice(5, 7)) - 1;
    monthlySums[monthIndex].income += booking.amount;
  });

  previousBookings.forEach((booking) => {
    const monthIndex = Number(booking.bookingDate.slice(5, 7)) - 1;
    monthlySums[monthIndex].previousIncome += booking.amount;
  });

  return monthlySums;
}

export function getPopularToursData(bookings) {
  const counts = new Map();
  bookings.forEach((booking) => {
    counts.set(booking.tourName, (counts.get(booking.tourName) || 0) + 1);
  });

  const total = bookings.length;
  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      percentage: total ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export function getBookingStatusData(bookings) {
  const total = bookings.length;
  return BOOKING_STATUSES.map((status) => {
    const count = bookings.filter((booking) => booking.status === status).length;
    return {
      status,
      count,
      percentage: total ? (count / total) * 100 : 0,
    };
  });
}
