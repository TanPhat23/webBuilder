import React from "react";
import { useEditorStore } from "@/lib/store/editorStore";

/**
 * A component that provides visual feedback during optimistic updates
 * Shows loading spinner and error messages when applicable
 */
const OptimisticFeedback: React.FC = () => {
  const { isLoading, error } = useEditorStore();

  if (!isLoading && !error) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isLoading && (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Saving...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default OptimisticFeedback;
