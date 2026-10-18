import { Star, MessageSquare } from "lucide-react";
import ReviewCard from "../../../components/admin/ReviewCard";
import ReviewRow from "../../../components/admin/ReviewRow";

const ReviewsPage = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Reviews
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Manage customer reviews and feedback.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReviewCard
                    title="Review Information"
                    icon={Star}
                    onEdit={() => console.log("Edit review")}
                >
                    <ReviewRow
                        label="Customer"
                        value="John Doe"
                    />

                    <ReviewRow
                        label="Tour"
                        value="Angkor Wat Sunrise"
                    />

                    <ReviewRow
                        label="Rating"
                        value="5 / 5"
                    />

                    <ReviewRow
                        label="Status"
                        value="Published"
                    />
                </ReviewCard>

                <ReviewCard
                    title="Customer Feedback"
                    icon={MessageSquare}
                >
                    <ReviewRow
                        label="Comment"
                        value="Amazing experience!"
                    />

                    <ReviewRow
                        label="Date"
                        value="11 Sep 2026"
                    />
                </ReviewCard>
            </div>
        </div>
    );
};

export default ReviewsPage;