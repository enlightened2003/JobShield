function StatsCard({ title, value }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">

            <h3 className="text-gray-500 text-lg">
                {title}
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-3">
                {value}
            </p>

        </div>
    );
}

export default StatsCard;