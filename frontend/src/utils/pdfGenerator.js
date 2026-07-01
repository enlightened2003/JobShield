import { jsPDF } from "jspdf";

export const generatePDF = (result, jobDescription) => {

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("JobShield", 20, 20);

    doc.setFontSize(16);
    doc.text("AI Job Scam Analysis Report", 20, 32);

    doc.setDrawColor(0);
    doc.line(20, 38, 190, 38);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let y = 50;

    doc.text(`Date: ${new Date().toLocaleString()}`, 20, y);
    y += 12;

    doc.text(`Risk Score: ${result.risk_score}`, 20, y);
    y += 12;

    doc.text(`Risk Level: ${result.risk_level}`, 20, y);
    y += 18;

    doc.setFont("helvetica", "bold");
    doc.text("Red Flags", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");

    if (!result.red_flags || result.red_flags.length === 0) {

        doc.text("No suspicious red flags detected.", 30, y);
        y += 10;

    } else {

        result.red_flags.forEach(flag => {
            doc.text(`• ${flag}`, 30, y);
            y += 8;
        });

    }

    y += 12;

    doc.setFont("helvetica", "bold");
    doc.text("Job Description", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(jobDescription, 170);

    doc.text(lines, 20, y);

    doc.save("JobShield_Report.pdf");

};