import React, { useRef } from 'react';

interface DataPersistenceProps {
  onImport: (data: any) => void;
  onExport: () => void;
}

const DataPersistence: React.FC<DataPersistenceProps> = ({ onImport, onExport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error("File is not readable");
        }
        const data = JSON.parse(text);
        onImport(data);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        alert("Failed to import data. The file may be corrupt or in the wrong format.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <section className="my-6 bg-white p-4 rounded-3xl shadow-lg flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h3 className="text-xl font-bold text-slate-800">Data Management</h3>
                <p className="text-sm text-slate-500">Save your data to a file or load it from a previous backup.</p>
            </div>
            <div className="flex gap-3">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".json"
                    className="hidden"
                    aria-hidden="true"
                />
                <button onClick={handleImportClick} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition">
                    Import
                </button>
                <button onClick={onExport} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition">
                    Export
                </button>
            </div>
        </div>
    </section>
  );
};

export default DataPersistence;