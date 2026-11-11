    import { useMemo, useState } from "react";
    import { useTranslation } from "react-i18next";
    import angkorHero from "../../../assets/images/trips/Angkor-Wat(1).jpg";
    import angkorGallery from "../../../assets/images/trips/angkor-gallery(1).jpg";
    import oldMarket from "../../../assets/images/trips/Arrival & Siem Reap City.jpg";
    import tonleLake from "../../../assets/images/trips/tonle-lake(1).jpg";
    import lilyAvatar from "../../../assets/images/avatars/Lina.jpg";
    import linaAvatar from "../../../assets/images/avatars/Lily.jpg";
    import danielAvatar from "../../../assets/images/avatars/Daniel.jpg";
    import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock3,
    MapPin,
    Plane,
    Star,
    Users,
    Utensils,
    X,
    } from "lucide-react";
    import { localizeTripDetail } from "../../../i18n/localizeContent";

    const TRIP = {
    title: "Angkor Temple & Siem Reap Adventure",
    category: "Cultural Trip",
    price: 299,
    rating: 4.9,
    reviewCount: 128,
    duration: "3 Days / 2 Nights",
    destination: "Siem Reap",
    groupSize: "2-12 people",
    description:
        "Discover the majestic Angkor temples, experience local culture, and enjoy the beauty of Tonlé Sap Lake. This 3-day adventure is designed for travelers who want to experience the best of Siem Reap in one memorable journey.",
    images: [
        angkorHero,
        oldMarket,
        tonleLake,
    ],
    itinerary: [
        {
        day: "Day 1",
        title: "Arrival & Siem Reap City",
        image: oldMarket,
        activities: [
            "Airport pickup",
            "Hotel check-in",
            "Explore the Old Market",
            "Dinner at a local restaurant",
        ],
        },
        {
        day: "Day 2",
        title: "Angkor Temple Tour",
        image: angkorGallery,
        activities: [
            "5:00 AM - Angkor Wat sunrise",
            "8:00 AM - Breakfast",
            "9:00 AM - Bayon Temple",
            "11:00 AM - Ta Prohm",
            "1:00 PM - Lunch",
            "3:00 PM - Free time",
            "7:00 PM - Dinner",
        ],
        },

        {
        day: "Day 3",
        title: "Tonlé Sap & Departure",
        image: tonleLake,
        activities: [
            "8:00 AM - Breakfast",
            "9:00 AM - Tonlé Sap Lake",
            "12:00 PM - Lunch",
            "2:00 PM - Free time",
            "4:00 PM - Airport transfer",
        ],
        },
    ],
    included: [
        "Hotel accommodation",
        "Daily breakfast",
        "English-speaking tour guide",
        "Private transportation",
        "Entrance tickets",
        "Airport pickup & drop-off",
    ],
    excluded: [
        "International flights",
        "Personal expenses",
        "Travel insurance",
        "Lunch and dinner unless specified",
        "Tips for guide and driver",
    ],

    info: [
        ["Duration", "3 Days / 2 Nights", Clock3],
        ["Destination", "Siem Reap", MapPin],
        ["Group Size", "2-12 people", Users],
        ["Difficulty", "Easy", Star],
        ["Language", "English", Utensils],
        ["Best Time", "Nov - Mar", CalendarDays],
        ["Departure", "Daily", Plane],
    ],
    
    reviews: [
        {
        name: "Lily",
        rating: 5,
        text: "Amazing experience! The temples were beautiful and our guide was very helpful.",
        avatar: lilyAvatar,
        },
        {
        name: "Lina",
        rating: 5,
        text: "Everything was well organized from airport pickup to the temple tour.",
        avatar: linaAvatar,
        },
        {
        name: "Daniel",
        rating: 5,
        text: "A great balance of temples, local culture and relaxing free time.",
        avatar: danielAvatar,
        },
    ],
    };

    function Stars({ value = 5 }) {
    const { t } = useTranslation();
    return (
        <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label={t("tripDetail.starsOutOf", { value })}>
        {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={15} fill="currentColor" strokeWidth={1.5} />
        ))}
        </span>
    );
    }

    function SectionTitle({ children, action }) {
    return (
        <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">{children}</h2>
        {action}
        </div>
    );
    }

    export default function TripDetailPage() {
    const { t, i18n } = useTranslation();
    const language = i18n.resolvedLanguage || i18n.language;
    const trip = useMemo(() => localizeTripDetail(TRIP, language), [language]);
    const [activeImage, setActiveImage] = useState(0);
    const [activeDay, setActiveDay] = useState(0);
    const [reviewStart, setReviewStart] = useState(0);

    const visibleReviews = useMemo(() => {
        const result = [];
        for (let i = 0; i < Math.min(2, trip.reviews.length); i += 1) {
        result.push(trip.reviews[(reviewStart + i) % trip.reviews.length]);
        }
        return result;
    }, [reviewStart, trip.reviews]);

    const nextImage = () => setActiveImage((current) => (current + 1) % trip.images.length);
    const previousImage = () => setActiveImage((current) => (current - 1 + trip.images.length) % trip.images.length);

    return (
        <div className="min-h-screen bg-white text-slate-800">
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 lg:px-8">                 
            <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="order-2 lg:order-1">
                
               <h1
                    className="mt-0 max-w-2xl text-3xl leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[46px]"
                    style={{ fontFamily: '"Mongolian Baiti", serif' }}>
                
                    {trip.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
                    <Star size={17} fill="currentColor" className="text-amber-400" /> {trip.rating}
                </span>
                <span>({t("tripDetail.reviewsCount", { count: trip.reviewCount })})</span>
                <span className="hidden h-4 w-px bg-slate-200 sm:block" />
                <span className="inline-flex items-center gap-1.5"><Clock3 size={16} /> {trip.duration}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin size={16} /> {trip.destination}</span>
                <span className="inline-flex items-center gap-1.5"><Users size={16} /> {trip.groupSize}</span>
                </div>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-600">{trip.description}</p>
            </div>

            <div className="order-1 lg:order-2">
                <div className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200">
                <img
                    src={trip.images[activeImage]}
                    alt={trip.title}
                    className="h-[330px] w-full object-cover transition duration-500 sm:h-[410px] lg:h-[450px]"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                    <span className="rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    {activeImage + 1} / {trip.images.length}
                    </span>
                    <div className="flex gap-2">
                    <button onClick={previousImage} className="grid size-9 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white" aria-label={t("tour.previousImage")}>
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={nextImage} className="grid size-9 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white" aria-label={t("tour.nextImage")}>
                        <ChevronRight size={18} />
                    </button>
                    </div>
                </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                {trip.images.map((image, index) => (
                    <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    className={`overflow-hidden rounded-xl ring-2 transition ${activeImage === index ? "ring-indigo-500" : "ring-transparent hover:ring-slate-200"}`}
                    aria-label={t("tripDetail.imageNumber", { index: index + 1 })}
                    >
                    <img src={image} alt="" className="h-20 w-full object-cover sm:h-24" />
                    </button>
                ))}
                </div>
            </div>
            </section>

            
            <section className="mt-14">
            <SectionTitle>{t("tour.itinerary")}</SectionTitle>
            <div className="mb-6 flex gap-7 overflow-x-auto border-b border-slate-200">
                {trip.itinerary.map((item, index) => (
                <button
                    key={item.day}
                    onClick={() => setActiveDay(index)}
                    className={`relative shrink-0 pb-3 text-sm font-semibold transition ${activeDay === index ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"}`}
                >
                    {item.day}
                    {activeDay === index && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-indigo-600" />}
                </button>
                ))}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {trip.itinerary.map((item, index) => (
                <article
                    key={item.day}
                    className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${activeDay === index ? "border-indigo-200 shadow-md" : "border-slate-200"}`}
                >
                    <div className="relative">
                    <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
                    <span className="absolute left-3 top-3 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">{item.day}</span>
                    </div>
                    <div className="p-5">
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                        {item.activities.map((activity) => (
                        <li key={activity} className="flex gap-2 leading-5">
                            <Check size={16} className="mt-0.5 shrink-0 text-indigo-600" />
                            <span>{activity}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                </article>
                ))}
            </div>
            </section>

            
            <section className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
                <h2 className="flex items-center gap-3 text-lg font-bold text-slate-900">
                <span className="grid size-8 place-items-center rounded-full bg-emerald-500 text-white"><Check size={17} /></span>
                {t("tripDetail.included")}
                </h2>
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {trip.included.map((item) => (
                    <li key={item} className="flex gap-3"><Check size={17} className="mt-0.5 shrink-0 text-emerald-600" /> {item}</li>
                ))}
                </ul>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-rose-50/45 p-6">
                <h2 className="flex items-center gap-3 text-lg font-bold text-slate-900">
                <span className="grid size-8 place-items-center rounded-full bg-rose-500 text-white"><X size={17} /></span>
                {t("tripDetail.notIncluded")}
                </h2>
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {trip.excluded.map((item) => (
                    <li key={item} className="flex gap-3"><X size={17} className="mt-0.5 shrink-0 text-rose-500" /> {item}</li>
                ))}
                </ul>
            </div>
            </section>

           
            <section className="mt-12">
            <SectionTitle>{t("tripDetail.tourInformation")}</SectionTitle>
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-4 lg:grid-cols-7">
                {trip.info.map(([label, value, Icon], index) => (
                <div key={label} className={`p-5 ${index > 0 ? "border-l border-slate-200" : ""} ${index >= 2 ? "border-t md:border-t-0" : ""}`}>
                    <Icon size={19} className="text-indigo-600" />
                    <p className="mt-3 text-xs font-medium text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
                </div>
                ))}
            </div>
            </section>

        
            <section className="mt-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <SectionTitle>{t("tripDetail.reviews")}</SectionTitle>
                <div className="mb-5 flex items-center gap-3 text-sm">
                <span className="font-bold text-slate-900">{trip.rating} / 5</span>
                <Stars value={5} />
                <span className="text-slate-500">{t("tripDetail.reviewsCount", { count: trip.reviewCount })}</span>
                </div>
            </div>

            <div className="relative grid gap-5 md:grid-cols-2">
                {visibleReviews.map((review) => (
                <article key={`${review.name}-${review.text}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="size-11 rounded-full object-cover ring-2 ring-slate-100" />
                    <div>
                        <h3 className="text-sm font-bold text-slate-900">{review.name}</h3>
                        <div className="mt-1 flex items-center gap-2"><Stars value={review.rating} /><span className="text-xs font-medium text-slate-500">5.0</span></div>
                    </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{review.text}</p>
                </article>
                ))}

                <button
                type="button"
                onClick={() => setReviewStart((current) => (current - 1 + trip.reviews.length) % trip.reviews.length)}
                className="absolute -left-4 top-1/2 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-indigo-600 md:grid"
                aria-label={t("tripDetail.previousReviews")}
                >
                <ArrowLeft size={17} />
                </button>
                <button
                type="button"
                onClick={() => setReviewStart((current) => (current + 1) % trip.reviews.length)}
                className="absolute -right-4 top-1/2 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-indigo-600 md:grid"
                aria-label={t("tripDetail.nextReviews")}
                >
                <ArrowRight size={17} />
                </button>
            </div>

            <div className="mt-5 flex justify-center gap-1.5">
                {trip.reviews.map((review, index) => (
                <button
                    key={review.name}
                    onClick={() => setReviewStart(index)}
                    className={`h-1.5 rounded-full transition-all ${index === reviewStart ? "w-6 bg-indigo-600" : "w-1.5 bg-slate-300"}`}
                    aria-label={t("tripDetail.showReview", { index: index + 1 })}
                />
                ))}
            </div>
            </section>
        
        </main>
        </div>
    );
    }
