import { useEffect, useState } from "react";
import AnalysisModal from "../components/AnalysisModal";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HistoryCard from "../components/HistoryCard";

import {
    getHistory,
    deleteHistory
} from "../services/historyService";

function History() {

    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);

    const loadHistory = async () => {

        try {

            const data = await getHistory();

            setHistory(data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load history");
        }

    };

    useEffect(() => {

        loadHistory();

    }, []);

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this analysis?")) {
            return;
        }

        try {

           await deleteHistory(id);

toast.success("Analysis deleted successfully");

loadHistory();
        } catch (error) {

            console.error(error);

            toast.error("Failed to delete analysis");

        }

    };

    const filteredHistory = history.filter((item) =>
        item.job_description
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <h1 className="text-3xl font-bold mb-6">

                        Analysis History

                    </h1>

                    <input
                        type="text"
                        placeholder="🔍 Search analyses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-4 rounded-xl border mb-8"
                    />

                    <div className="space-y-6">

                        {filteredHistory.length > 0 ? (

                            filteredHistory.map((item) => (

                               <HistoryCard
                                 key={item.id}
                                item={item}
                                onDelete={handleDelete}
                                onView={setSelectedAnalysis}
                               />

                            ))

                        ) : (

                            <div className="bg-white rounded-xl shadow-md p-8 text-center">

                                <h2 className="text-xl font-semibold">

                                    No analyses found

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Analyze a job posting to see it here.

                                </p>

                            </div>

                        )}

                    </div>
              <AnalysisModal
    analysis={selectedAnalysis}
    onClose={() => setSelectedAnalysis(null)}
/>
                </main>
              
            </div>

        </div>

    );

}

export default History;