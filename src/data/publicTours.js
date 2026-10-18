import angkorWat from "../assets/images/trips/Angkor-Wat(1).jpg";
import angkorGallery from "../assets/images/trips/angkor-gallery(1).jpg";
import siemReapCity from "../assets/images/trips/Arrival & Siem Reap City.jpg";
import tonleLake from "../assets/images/trips/tonle-lake(1).jpg";
import phnomPenh from "../assets/images/destinations/phnomPenh.jpg";

export const publicTours = [
  {
    id: "angkor-temples",
    slug: "angkor-temples-at-sunrise",
    title: "Angkor Temple & Siem Reap Adventure",
    category: "Cultural",
    type: "culture",
    destination: "Siem Reap",
    location: "Siem Reap, Cambodia",
    duration: "3 days / 2 nights",
    groupSize: "2–12 people",
    rating: 4.9,
    reviewCount: 128,
    price: 69,
    description:
      "Discover the majesty of Angkor at sunrise, explore atmospheric temple ruins, and experience the warm local culture of Siem Reap.",
    image: angkorWat,
    images: [angkorWat, angkorGallery, tonleLake, siemReapCity],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Siem Reap",
        location: "Siem Reap city",
        time: "Afternoon · 4 hours",
        description:
          "Settle in and get your first taste of the city's lively markets and Khmer food.",
        image: siemReapCity,
        activities: ["Meet your local guide", "Explore the Old Market", "Welcome dinner"],
      },
      {
        day: "Day 2",
        title: "Angkor at Sunrise",
        location: "Angkor Archaeological Park",
        time: "Early morning · Full day",
        description:
          "Watch sunrise at Angkor Wat before discovering the temples and jungle-covered ruins nearby.",
        image: angkorWat,
        activities: ["Angkor Wat sunrise", "Bayon Temple", "Ta Prohm"],
      },
      {
        day: "Day 3",
        title: "Tonlé Sap & Farewell",
        location: "Tonlé Sap Lake",
        time: "Morning · 5 hours",
        description:
          "Visit a floating village and see another side of life around Cambodia's great lake.",
        image: tonleLake,
        activities: ["Floating village visit", "Scenic lake cruise", "Local lunch"],
      },
    ],
    highlights: [
      "See Angkor Wat in the soft light of sunrise",
      "Explore Bayon and the atmospheric Ta Prohm temple",
      "Experience local life on Tonlé Sap Lake",
    ],
    included: [
      "English-speaking local guide",
      "Air-conditioned transportation",
      "Hotel pickup and drop-off",
      "Bottled water during the tour",
    ],
    notIncluded: [
      "Angkor pass",
      "Accommodation unless specified",
      "Meals not listed in the itinerary",
      "Personal expenses and gratuities",
    ],
    meetingPoint: "Hotel pickup in central Siem Reap",
    goodToKnow: [
      "Bring a valid photo ID and comfortable walking shoes.",
      "Temple visits require clothing that covers shoulders and knees.",
      "Sunrise departure is early; confirm pickup time after booking.",
    ],
  },
  {
    id: "siem-reap-discovery",
    slug: "siem-reap-city-discovery",
    title: "Siem Reap City Discovery",
    category: "City",
    type: "city",
    destination: "Siem Reap",
    location: "Siem Reap, Cambodia",
    duration: "2 days",
    groupSize: "2–10 people",
    rating: 4.8,
    reviewCount: 86,
    price: 149,
    description:
      "Get to know Siem Reap beyond the temples with a relaxed introduction to its markets, neighborhoods, food, and riverside life.",
    image: siemReapCity,
    images: [siemReapCity, angkorWat, angkorGallery, tonleLake],
    itinerary: [
      {
        day: "Day 1",
        title: "Markets & Local Flavors",
        location: "Central Siem Reap",
        time: "Morning to afternoon · 6 hours",
        description:
          "Walk through the city's colorful markets and sample local favorites with your guide.",
        image: siemReapCity,
        activities: ["Old Market walk", "Local food tasting", "Riverside neighborhood"],
      },
      {
        day: "Day 2",
        title: "Temples & Countryside",
        location: "Siem Reap outskirts",
        time: "Morning · 5 hours",
        description:
          "Enjoy a quieter temple visit and see the green countryside beyond the city.",
        image: angkorGallery,
        activities: ["Small temple visit", "Countryside drive", "Meet local makers"],
      },
    ],
    highlights: [
      "Discover the Old Market with a local guide",
      "Taste regional Cambodian dishes",
      "See the countryside outside the busy center",
    ],
    included: ["Local guide", "City transportation", "Food tastings", "Bottled water"],
    notIncluded: ["Hotel accommodation", "Additional meals", "Personal expenses"],
    meetingPoint: "Old Market entrance, Siem Reap",
    goodToKnow: [
      "Let your guide know about dietary needs before the tour.",
      "Wear comfortable shoes for walking through the markets.",
      "The schedule can be adjusted for weather and local conditions.",
    ],
  },
  {
    id: "tonle-sap",
    slug: "tonle-sap-floating-village",
    title: "Tonlé Sap Floating Village",
    category: "Nature",
    type: "nature",
    destination: "Siem Reap",
    location: "Tonlé Sap Lake, Cambodia",
    duration: "Half day",
    groupSize: "2–8 people",
    rating: 4.8,
    reviewCount: 94,
    price: 45,
    description:
      "Cruise through the waterways of Tonlé Sap and learn how communities have adapted to life on Southeast Asia's largest freshwater lake.",
    image: tonleLake,
    images: [tonleLake, angkorGallery, siemReapCity, angkorWat],
    itinerary: [
      {
        day: "Day 1",
        title: "Life on Tonlé Sap",
        location: "Tonlé Sap Lake",
        time: "Afternoon · 4 hours",
        description:
          "Travel from Siem Reap to the lake and explore its remarkable floating communities by boat.",
        image: tonleLake,
        activities: ["Hotel pickup", "Village boat cruise", "Sunset over the lake"],
      },
    ],
    highlights: [
      "Cruise through the floating village waterways",
      "Learn about the lake's seasonal rhythms",
      "Take in wide-open views across Tonlé Sap",
    ],
    included: ["Hotel pickup and drop-off", "Boat trip", "Local guide", "Drinking water"],
    notIncluded: ["Meals and snacks", "Personal expenses", "Gratuities"],
    meetingPoint: "Pickup from your accommodation in Siem Reap",
    goodToKnow: [
      "Bring sun protection and a light layer for the boat.",
      "Water levels and routes vary with the season.",
      "Please ask before photographing local residents.",
    ],
  },
  {
    id: "phnom-penh-city",
    slug: "phnom-penh-city-highlights",
    title: "Phnom Penh City Highlights",
    category: "Cultural",
    type: "cultural",
    destination: "Phnom Penh",
    location: "Phnom Penh, Cambodia",
    duration: "Full day",
    groupSize: "2–10 people",
    rating: 4.9,
    reviewCount: 72,
    price: 55,
    description:
      "Explore Cambodia's vibrant capital, from its riverside landmarks and royal architecture to lively local markets.",
    image: phnomPenh,
    images: [phnomPenh, siemReapCity, angkorWat, tonleLake],
    itinerary: [
      {
        day: "Day 1",
        title: "Capital City Highlights",
        location: "Phnom Penh",
        time: "Morning to afternoon · 7 hours",
        description:
          "Discover the city's historic landmarks, bustling markets, and scenic riverside with a local guide.",
        image: phnomPenh,
        activities: ["Royal Quarter", "Central Market", "Riverside walk"],
      },
    ],
    highlights: [
      "See the city's landmark royal architecture",
      "Browse the lively Central Market",
      "Enjoy a guided introduction to Phnom Penh",
    ],
    included: ["English-speaking guide", "City transportation", "Hotel pickup", "Drinking water"],
    notIncluded: ["Entrance fees", "Meals", "Personal expenses and gratuities"],
    meetingPoint: "Pickup from your accommodation in central Phnom Penh",
    goodToKnow: [
      "Wear respectful clothing when visiting religious sites.",
      "Traffic can affect the order and timing of stops.",
      "Bring cash for entrance fees and market purchases.",
    ],
  },
];
