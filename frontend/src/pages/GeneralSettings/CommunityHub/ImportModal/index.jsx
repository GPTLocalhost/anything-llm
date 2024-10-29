import { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { X } from "@phosphor-icons/react";
import Hub from "@/models/hub";
import showToast from "@/utils/toast";

export default function ImportModal({ isOpen, closeModal }) {
  const [importString, setImportString] = useState("");

  const handleImport = async (e) => {
    e.preventDefault();
    const response = await Hub.importByString({ importString });
    if (response.success) {
      showToast("Items imported successfully", "success");
    } else {
      showToast(response.error, "error");
    }
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="relative w-[500px] max-h-[85vh] overflow-y-auto bg-main-gradient rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-500/50">
          <h3 className="text-xl font-semibold text-white">Import from Hub</h3>
          <button
            onClick={closeModal}
            className="transition-all duration-300 text-gray-400 bg-transparent hover:border-white/60 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center bg-sidebar-button hover:bg-menu-item-selected-gradient hover:border-slate-100 hover:border-opacity-50 border-transparent border"
          >
            <X className="text-gray-300 text-lg" />
          </button>
        </div>

        <form onSubmit={handleImport}>
          <div className="p-4 space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Import String
              </label>
              <textarea
                value={importString}
                onChange={(e) => setImportString(e.target.value)}
                placeholder="Paste the import string from AnythingLLM Hub"
                className="bg-zinc-900 text-white placeholder:text-white/20 text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none block w-full p-2.5 min-h-[100px]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-x-4 p-4 border-t border-gray-500/50">
            <button
              type="button"
              onClick={closeModal}
              className="text-white bg-transparent hover:bg-white/10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-black bg-primary-button hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Import
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
