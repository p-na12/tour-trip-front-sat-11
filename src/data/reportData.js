const FIRST_NAMES = [
  "Sokha", "Sopheak", "Srey", "Vanna", "Dara", "Pisey", "Chenda", "Rith",
  "Nita", "Channary", "Vicheka", "Kiri", "Bopha", "Sothea", "Vuthy",
  "Makara", "Sreymom", "Chantha", "Samnang", "Lina", "Chanmony", "Nary",
  "Vannak", "Sophea", "Ratha", "Mony", "Kunthea", "Sovan", "Borey",
  "Sovann", "Sokun", "Kimsan",
];

const LAST_NAMES = [
  "Chan", "Sok", "Chea", "Heng", "Kim", "Lim", "Ouk", "Touch", "Keo",
  "San", "Ly", "Phan", "Tep", "Khun", "Mao", "Ros", "Noun", "Vong",
  "Eang", "Chhun", "Bun", "Hay", "Meas", "Chhay", "Pich", "Yim", "Ek",
  "Sar", "Srun", "Ty", "Yin", "Chum",
];

export const REPORT_TOURS = [
  { name: "Angkor Wat Sunrise", basePrice: 68 },
  { name: "Koh Rong Island", basePrice: 125 },
  { name: "Phnom Penh City Tour", basePrice: 42 },
  { name: "Kampot Countryside", basePrice: 76 },
  { name: "Siem Reap Cultural Tour", basePrice: 94 },
  { name: "Tonle Sap Floating Village", basePrice: 58 },
  { name: "Battambang Bamboo Train", basePrice: 72 },
  { name: "Kep Coastal Escape", basePrice: 88 },
  { name: "Cardamom Mountains Trek", basePrice: 165 },
  { name: "Bokor National Park", basePrice: 110 },
  { name: "Royal Palace & Silver Pagoda", basePrice: 36 },
  { name: "Phnom Kulen Waterfall", basePrice: 98 },
  { name: "Banteay Srei Temple", basePrice: 82 },
  { name: "Preah Vihear Discovery", basePrice: 210 },
  { name: "Kirirom Nature Retreat", basePrice: 135 },
  { name: "Koh Rong Samloem Snorkeling", basePrice: 145 },
  { name: "Silk Island Cycling", basePrice: 48 },
  { name: "Kampong Cham Riverside", basePrice: 65 },
  { name: "Mondulkiri Elephant Sanctuary", basePrice: 185 },
  { name: "Ratanakiri Lake Adventure", basePrice: 172 },
  { name: "Oudong Heritage Day Trip", basePrice: 54 },
  { name: "Koh Ker Temple Circuit", basePrice: 155 },
  { name: "Prasat Preah Khan", basePrice: 79 },
  { name: "Phnom Sampeau Sunset", basePrice: 62 },
  { name: "Kampong Khleang Village", basePrice: 92 },
  { name: "Koh Tonsay Island Day", basePrice: 115 },
  { name: "Sihanoukville Beach Hopping", basePrice: 108 },
  { name: "Phnom Penh Food Walk", basePrice: 44 },
  { name: "Siem Reap Night Market", basePrice: 32 },
  { name: "Angkor Grand Circuit", basePrice: 120 },
  { name: "Kbal Spean River of a Thousand Lingas", basePrice: 105 },
  { name: "Banteay Chhmar Expedition", basePrice: 195 },
  { name: "Kampot Pepper Farm", basePrice: 56 },
  { name: "Kep Crab Market & National Park", basePrice: 69 },
  { name: "Kratie Dolphin Watching", basePrice: 138 },
  { name: "Mekong Island Sunset Cruise", basePrice: 72 },
  { name: "Phnom Penh Architecture Walk", basePrice: 40 },
  { name: "Prek Toal Bird Sanctuary", basePrice: 130 },
  { name: "Koh Ta Kiev Eco Getaway", basePrice: 158 },
  { name: "Angkor Sunrise Photography", basePrice: 88 },
  { name: "Cambodian Countryside Homestay", basePrice: 145 },
  { name: "Sambor Prei Kuk Temples", basePrice: 125 },
];

const CURRENT_YEAR_BOOKINGS = 1284;
const PREVIOUS_YEAR_BOOKINGS = 1190;
const MOCK_CUSTOMER_COUNT = 856;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createYearBookings(year, count, dayCount, seed, tourCount, customerCount) {
  const bookings = [];

  for (let index = 0; index < count; index += 1) {
    const dayOffset = (index * 37 + seed) % dayCount;
    const date = new Date(year, 0, 1 + dayOffset);
    const popularityBucket = (index * 37 + seed * 11) % 100;
    let tourIndex;

    if (popularityBucket < 18) tourIndex = 0;
    else if (popularityBucket < 31) tourIndex = 1;
    else if (popularityBucket < 42) tourIndex = 2;
    else if (popularityBucket < 51) tourIndex = 3;
    else if (popularityBucket < 58) tourIndex = 4;
    else tourIndex = 5 + ((index * 11 + seed) % (tourCount - 5));

    const tour = REPORT_TOURS[tourIndex];
    const customerIndex = (index * 43 + seed * 19) % customerCount;
    const customerName = `${FIRST_NAMES[customerIndex % FIRST_NAMES.length]} ${
      LAST_NAMES[Math.floor(customerIndex / FIRST_NAMES.length) % LAST_NAMES.length]
    }`;
    const statusValue = (index * 13 + seed * 7) % 100;
    const status =
      statusValue < 13
        ? "Pending"
        : statusValue < 48
          ? "Confirmed"
          : statusValue < 91
            ? "Completed"
            : "Cancelled";
    const paymentStatus =
      status === "Cancelled"
        ? "Refunded"
        : (index * 17 + seed) % 100 < 84
          ? "Paid"
          : "Pending";
    const groupMultiplier = 1 + ((index * 7 + seed) % 5) * 0.2;
    const amount = Math.round(tour.basePrice * groupMultiplier);

    bookings.push({
      id: `BK-${year}-${String(index + 1).padStart(4, "0")}`,
      customerName,
      tourName: tour.name,
      bookingDate: formatLocalDate(date),
      amount,
      paymentStatus,
      status,
    });
  }

  return bookings;
}

const today = new Date();
today.setHours(0, 0, 0, 0);
const currentYearStart = new Date(today.getFullYear(), 0, 1);
const currentYearDays = Math.floor((today - currentYearStart) / DAY_IN_MS) + 1;

export const REPORT_BOOKINGS = [
  ...createYearBookings(
    today.getFullYear(),
    CURRENT_YEAR_BOOKINGS,
    currentYearDays,
    today.getFullYear(),
    REPORT_TOURS.length,
    MOCK_CUSTOMER_COUNT,
  ),
  ...createYearBookings(
    today.getFullYear() - 1,
    PREVIOUS_YEAR_BOOKINGS,
    currentYearDays,
    today.getFullYear() - 1,
    REPORT_TOURS.length - 3,
    MOCK_CUSTOMER_COUNT - 96,
  ),
].sort((a, b) => b.bookingDate.localeCompare(a.bookingDate) || b.id.localeCompare(a.id));
