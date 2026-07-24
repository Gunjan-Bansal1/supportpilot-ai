import React, { useState } from "react";
import UploadCard from "../components/upload/UploadCard";
import UploadProgress from "../components/upload/UploadProgress";
import Button from "../components/common/Button";
import { uploadDocument } from "../services/api";
import toast from "react-hot-toast";
import { FiUploadCloud, FiBookOpen, FiShield, FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import { BsLightningCharge } from "react-icons/bs";

function UploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle' | 'uploading' | 'success' | 'error'
    const [uploadProgress, setUploadProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState("");

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setUploadStatus("idle");
        setUploadProgress(0);
        setStatusMessage("");
    };

    const handleClearFile = () => {
        setSelectedFile(null);
        setUploadStatus("idle");
        setUploadProgress(0);
        setStatusMessage("");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a PDF or TXT file to upload.");
            return;
        }

        setUploadStatus("uploading");
        setUploadProgress(20);
        setStatusMessage("Sending document to assistant knowledge base...");

        // Simulate progress increment for smooth UX during document ingestion
        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 85) {
                    clearInterval(progressInterval);
                    return 85;
                }
                return prev + 15;
            });
        }, 400);

        try {
            const data = await uploadDocument(selectedFile);
            clearInterval(progressInterval);

            setUploadProgress(100);
            setUploadStatus("success");
            const successMsg = data.message || `${selectedFile.name} uploaded successfully.`;
            setStatusMessage(data.status || "Knowledge base updated successfully.");

            toast.success(successMsg);
        } catch (err) {
            clearInterval(progressInterval);
            setUploadStatus("error");
            
            const errorMsg =
                err.response?.data?.detail ||
                err.message ||
                "Failed to upload document and update knowledge base.";
            
            setStatusMessage(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-2 sm:p-4">
            {/* Header Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <FiUploadCloud size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Knowledge Base Management
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                            Upload company documents so the AI assistant can answer customer questions more accurately. 
                            Supported file formats include PDF guidelines, policy manuals, and text documentation.
                        </p>
                    </div>
                </div>
            </div>

            {/* Upload Box */}
            <div className="space-y-4">
                <UploadCard
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    onClearFile={handleClearFile}
                    isUploading={uploadStatus === "uploading"}
                />

                {/* Progress & Status */}
                <UploadProgress
                    status={uploadStatus}
                    progress={uploadProgress}
                    message={statusMessage}
                    fileName={selectedFile?.name || ""}
                />

                {/* Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <BsLightningCharge className="text-amber-500" size={14} />
                        <span>Knowledge base updates automatically after upload</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {uploadStatus === "success" && (
                            <Button
                                variant="outline"
                                onClick={handleClearFile}
                                icon={FiRefreshCw}
                            >
                                Upload Another File
                            </Button>
                        )}

                        <Button
                            variant="primary"
                            onClick={handleUpload}
                            disabled={!selectedFile || uploadStatus === "uploading"}
                            loading={uploadStatus === "uploading"}
                            icon={FiUploadCloud}
                        >
                            {uploadStatus === "uploading" ? "Updating Knowledge Base..." : "Upload & Train Assistant"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Knowledge Base Guidelines */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                        <FiBookOpen className="text-blue-600" size={18} />
                        <span>Supported Documents</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        Upload <strong className="text-slate-700">PDF</strong> or <strong className="text-slate-700">TXT</strong> files containing FAQs, refund rules, and product guides.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                        <FiShield className="text-indigo-600" size={18} />
                        <span>Automatic Ingestion</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        Uploaded content is automatically indexed for seamless customer support answering.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                        <FiCheckCircle className="text-emerald-600" size={18} />
                        <span>Instant Support Answers</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        Customer support queries will immediately incorporate information from your uploaded files.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UploadPage;