import React, { useState, useRef } from "react";
import { FiUploadCloud, FiFileText, FiX, FiCheck, FiAlertCircle } from "react-icons/fi";
import { BsFileEarmarkPdf, BsFileEarmarkText } from "react-icons/bs";
import Button from "../common/Button";
import toast from "react-hot-toast";

function UploadCard({ onFileSelect, selectedFile, onClearFile, isUploading }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const validateFile = (file) => {
        if (!file) return false;

        const allowedTypes = ["application/pdf", "text/plain"];
        const allowedExtensions = [".pdf", ".txt"];
        const fileName = file.name.toLowerCase();

        const isValidExtension = allowedExtensions.some((ext) => fileName.endsWith(ext));
        const isValidMime = allowedTypes.includes(file.type);

        if (!isValidExtension && !isValidMime) {
            toast.error("Invalid file format. Only PDF and TXT files are supported.");
            return false;
        }

        // Max file size: 15 MB
        const maxSizeMB = 15;
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`File size exceeds maximum limit of ${maxSizeMB}MB.`);
            return false;
        }

        return true;
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        if (isUploading) return;

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (validateFile(file)) {
                onFileSelect(file);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isUploading) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (validateFile(file)) {
                onFileSelect(file);
            }
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getFileIcon = (file) => {
        if (!file) return <FiFileText size={32} />;
        if (file.name.endsWith(".pdf")) {
            return <BsFileEarmarkPdf size={36} className="text-rose-500" />;
        }
        return <BsFileEarmarkText size={36} className="text-blue-500" />;
    };

    return (
        <div className="w-full">
            {/* Hidden Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileInputChange}
                className="hidden"
                disabled={isUploading}
            />

            {!selectedFile ? (
                /* Dropzone Area */
                <div
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
                        isDragOver
                            ? "border-blue-500 bg-blue-50/50 shadow-md scale-[1.01]"
                            : "border-slate-300 bg-slate-50/60 hover:border-blue-400 hover:bg-slate-50"
                    }`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm transition-transform duration-200 group-hover:scale-110">
                        <FiUploadCloud size={32} />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-slate-800">
                        Drag and drop your document here
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500">
                        Supports <strong className="text-slate-700">PDF</strong> or <strong className="text-slate-700">TXT</strong> files up to 15MB
                    </p>

                    <div className="mt-6">
                        <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            disabled={isUploading}
                        >
                            Browse File
                        </Button>
                    </div>
                </div>
            ) : (
                /* Selected File Preview Box */
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">
                                {getFileIcon(selectedFile)}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">
                                    {selectedFile.name}
                                </h4>
                                <p className="mt-1 text-xs text-slate-500 flex items-center gap-2">
                                    <span>{formatFileSize(selectedFile.size)}</span>
                                    <span>•</span>
                                    <span className="uppercase font-medium text-blue-600">
                                        {selectedFile.name.split(".").pop()}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {!isUploading && (
                            <button
                                type="button"
                                onClick={onClearFile}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                                title="Remove file"
                            >
                                <FiX size={18} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadCard;
