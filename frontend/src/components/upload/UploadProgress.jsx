import React from "react";
import { FiCheckCircle, FiAlertCircle, FiDatabase, FiFileText, FiRefreshCcw } from "react-icons/fi";

function UploadProgress({ status = "idle", progress = 0, message = "", fileName = "" }) {
    if (status === "idle") return null;

    const isUploading = status === "uploading";
    const isSuccess = status === "success";
    const isError = status === "error";

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {isUploading && (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiRefreshCcw className="animate-spin" size={20} />
                        </div>
                    )}

                    {isSuccess && (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <FiCheckCircle size={22} />
                        </div>
                    )}

                    {isError && (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                            <FiAlertCircle size={22} />
                        </div>
                    )}

                    <div>
                        <h4 className="text-sm font-semibold text-slate-800">
                            {isUploading && "Processing Document & Updating Knowledge Base..."}
                            {isSuccess && "Knowledge Base Updated Successfully!"}
                            {isError && "Document Upload Failed"}
                        </h4>
                        <p className="mt-0.5 text-xs text-slate-500">
                            {message || (isUploading ? `Ingesting ${fileName} into assistant knowledge base` : "")}
                        </p>
                    </div>
                </div>

                {isUploading && (
                    <span className="text-xs font-bold text-blue-600">
                        {progress}%
                    </span>
                )}
            </div>

            {/* Progress Bar */}
            {isUploading && (
                <div className="mt-4">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                            <FiFileText size={12} /> Reading File
                        </span>
                        <span className="flex items-center gap-1">
                            <FiRefreshCcw size={12} /> Processing Content
                        </span>
                        <span className="flex items-center gap-1">
                            <FiDatabase size={12} /> Knowledge Indexing
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadProgress;
