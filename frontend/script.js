/* ===============================
   PDFCOMPRESS – SAFE SCRIPT
   =============================== */

console.log("JS LOADED SUCCESSFULLY");

/* ---------- ELEMENT SAFE GET ---------- */
function $(id) {
    return document.getElementById(id);
}

/* ---------- BASIC ELEMENT CHECK ---------- */
window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM READY");

    if (!$("fileInput")) console.warn("fileInput not found");
    if (!$("compressBtn")) console.warn("compressBtn not found");
    if (!$("output")) console.warn("output not found");
});

/* ---------- FILE HANDLING ---------- */
let selectedFile = null;

const fileInput = $("fileInput");
if (fileInput) {
    fileInput.addEventListener("change", (e) => {
        selectedFile = e.target.files[0];

        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            alert("Please select a PDF file only");
            fileInput.value = "";
            selectedFile = null;
            return;
        }

        $("output").innerText =
            "Selected File: " + selectedFile.name;
    });
}

/* ---------- COMPRESS BUTTON ---------- */
const compressBtn = $("compressBtn");
if (compressBtn) {
    compressBtn.addEventListener("click", () => {
        if (!selectedFile) {
            alert("Please upload a PDF first");
            return;
        }

        simulateCompression();
    });
}

/* ---------- FAKE COMPRESSION (UI SAFE) ---------- */
function simulateCompression() {
    const output = $("output");
    if (!output) return;

    output.innerText = "Compressing PDF... ⏳";

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        output.innerText = `Compressing... ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            compressionDone();
        }
    }, 200);
}

/* ---------- AFTER COMPRESSION ---------- */
function compressionDone() {
    const output = $("output");
    if (!output) return;

    output.innerHTML = `
        ✅ Compression Complete!<br><br>
        <button id="downloadBtn">Download PDF</button>
    `;

    const downloadBtn = $("downloadBtn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            alert("This is a demo. Backend needed for real compression.");
        });
    }
}

/* ---------- GLOBAL ERROR SAFETY ---------- */
window.onerror = function (msg, src, line, col, err) {
    console.error("JS ERROR:", msg, "Line:", line);
    alert("Something went wrong in script.js. Check console.");
};
