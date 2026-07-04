import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import TextAnalyzer from "../components/TextAnalyzer";
import ImageAnalyzer from "../components/ImageAnalyzer";

function AnalyzeJob() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-8 space-y-8">
                    <h1 className="text-3xl font-bold">
                        Analyze Job
                    </h1>

                    <TextAnalyzer />

                    <ImageAnalyzer />
                </main>
            </div>
        </div>
    );
}

export default AnalyzeJob;