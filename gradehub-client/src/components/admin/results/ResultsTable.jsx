// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Badge from "../../ui/Badge";
// import DataTable from "../../ui/DataTable";
// import DropdownMenu from "../../ui/DropdownMenu";
// import ConfirmModal from "../../ui/ConfirmModal";
// import Modal from "../../ui/Modal";
// import Button from "../../ui/Button";

// import resultUploadService from "../../../services/admin/resultUploadService";
// import { useToast } from "../../../context/ToastContext";

// function ResultsTable({
//   columns,
//   results,
//   onRefresh,
//   totalItems,
//   totalPages,
//   currentPage,
//   onPageChange,
//   pageSize,
//   loading,
//   sortKey,
//   sortDirection,
//   onSort,
//   selectable,
//   selectedRows,
//   onRowSelect,
//   onSelectAll,
// }) {
//   const navigate = useNavigate();
//   const { addToast } = useToast();

//   // Modal State for row-level actions
//   const [confirmConfig, setConfirmConfig] = useState({
//     isOpen: false,
//     actionType: null,
//     resultId: null,
//   });

//   // NEW: State for viewing result details in a modal
//   const [selectedResult, setSelectedResult] = useState(null);

//   // --- CONSISTENT ROW HANDLERS ---
//   const executeAction = async () => {
//     const { actionType, resultId } = confirmConfig;

//     // Close modal immediately for smooth UX
//     setConfirmConfig({ isOpen: false, actionType: null, resultId: null });

//     try {
//       if (actionType === "approve") {
//         await resultUploadService.approveResult(resultId);
//         addToast({
//           title: "Approved",
//           message: "Result approved successfully!",
//           type: "success",
//         });
//       } else if (actionType === "suspend") {
//         await resultUploadService.deactivateResult(resultId);
//         addToast({
//           title: "Suspended",
//           message: "Result suspended successfully!",
//           type: "warning",
//         });
//       } else if (actionType === "delete") {
//         await resultUploadService.deleteResult(resultId);
//         addToast({
//           title: "Deleted",
//           message: "Result deleted successfully!",
//           type: "success",
//         });
//       }

//       onRefresh?.(); // Refresh the table data silently
//     } catch (error) {
//       addToast({
//         title: "Action Failed",
//         message: error.message || `Failed to ${actionType} result.`,
//         type: "error",
//       });
//     }
//   };

//   const getModalText = () => {
//     switch (confirmConfig.actionType) {
//       case "approve":
//         return {
//           title: "Approve Result",
//           text: "Are you sure you want to approve this student's result?",
//           btn: "Approve",
//           isDestructive: false,
//         };
//       case "suspend":
//         return {
//           title: "Suspend Result",
//           text: "Are you sure you want to suspend this student's result? It will not be visible to them.",
//           btn: "Suspend",
//           isDestructive: true,
//         };
//       case "delete":
//         return {
//           title: "Delete Result",
//           text: "Are you sure you want to permanently delete this result? This action cannot be undone.",
//           btn: "Delete",
//           isDestructive: true,
//         };
//       default:
//         return { title: "", text: "", btn: "", isDestructive: false };
//     }
//   };

//   const modalDetails = getModalText();

//   const renderCell = (result, column) => {
//     switch (column.key) {
//       case "studentName":
//         return (
//           <div>
//             <p className="font-semibold text-slate-900">
//               {result.studentName || "Unknown"}
//             </p>
//             <p className="text-sm text-slate-500">
//               {result.matricNumber || "-"}
//             </p>
//           </div>
//         );

//       case "courseCode":
//         return (
//           <div>
//             <p className="font-medium text-blue-600">{result.code || "-"}</p>
//             <p className="text-sm text-slate-500">{result.course || "-"}</p>
//           </div>
//         );

//       case "score":
//         return <span className="font-medium">{result.score ?? "-"}</span>;

//       case "grade":
//         return <span className="font-semibold">{result.grade || "-"}</span>;

//       case "semester":
//         return <span>{result.semester || "-"}</span>;

//       case "session":
//         return <span>{result.session || "-"}</span>;

//       case "status":
//         return (
//           <Badge
//             variant={
//               result.status === "Approved"
//                 ? "success"
//                 : result.status === "Pending"
//                   ? "warning"
//                   : "danger"
//             }
//           >
//             {result.status || "Pending"}
//           </Badge>
//         );

//       case "actions":
//         return (
//           <DropdownMenu
//             items={[
//               {
//                 label: "View Result",
//                 // CHANGED: Instead of navigating, set the selected result to open the modal
//                 onClick: () => setSelectedResult(result),
//               },
//               {
//                 label: "Edit Result",
//                 onClick: () => navigate(`/admin/results/${result.id}/edit`),
//               },
//               {
//                 label: "Approve Result",
//                 onClick: () =>
//                   setConfirmConfig({
//                     isOpen: true,
//                     actionType: "approve",
//                     resultId: result.id,
//                   }),
//               },
//               {
//                 label: "Suspend Result",
//                 onClick: () =>
//                   setConfirmConfig({
//                     isOpen: true,
//                     actionType: "suspend",
//                     resultId: result.id,
//                   }),
//               },
//               {
//                 label: "Delete Result",
//                 onClick: () =>
//                   setConfirmConfig({
//                     isOpen: true,
//                     actionType: "delete",
//                     resultId: result.id,
//                   }),
//               },
//             ]}
//           />
//         );

//       default:
//         return result[column.key] ?? "-";
//     }
//   };

//   const detailsModalFooter = (
//     <Button
//       onClick={() => setSelectedResult(null)}
//       className="w-full justify-center bg-slate-900 text-white hover:bg-slate-800"
//     >
//       Close Details
//     </Button>
//   );

//   return (
//     <>
//       <DataTable
//         columns={columns}
//         data={results}
//         renderCell={renderCell}
//         totalItems={totalItems}
//         totalPages={totalPages}
//         currentPage={currentPage}
//         onPageChange={onPageChange}
//         pageSize={pageSize}
//         serverPagination
//         sortKey={sortKey}
//         loading={loading}
//         sortDirection={sortDirection}
//         onSort={onSort}
//         selectable={selectable}
//         selectedRows={selectedRows}
//         onRowSelect={onRowSelect}
//         onSelectAll={onSelectAll}
//         getRowId={(row) => row.id}
//       />

//       {/* Row-Level Action Confirmation Modal */}
//       <ConfirmModal
//         isOpen={confirmConfig.isOpen}
//         onClose={() =>
//           setConfirmConfig({ isOpen: false, actionType: null, resultId: null })
//         }
//         onConfirm={executeAction}
//         title={modalDetails.title}
//         message={modalDetails.text}
//         confirmText={modalDetails.btn}
//         isDestructive={modalDetails.isDestructive}
//       />

//       {/* --- RESULT DETAILS MODAL --- */}
//       <Modal
//         isOpen={!!selectedResult}
//         onClose={() => setSelectedResult(null)}
//         title="Result Details"
//         subtitle={
//           <>
//             <span className="font-semibold text-blue-600">
//               {selectedResult?.code}
//             </span>
//             <span className="ml-1.5 text-slate-500">
//               — {selectedResult?.course}
//             </span>
//           </>
//         }
//         footer={detailsModalFooter}
//         maxWidth="max-w-sm"
//       >
//         {selectedResult && (
//           <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs sm:text-sm">
//             <div className="flex justify-between border-b border-slate-200 pb-2">
//               <span className="text-slate-600">Student</span>
//               <span className="text-right font-semibold text-slate-900">
//                 {selectedResult.studentName ?? "-"} <br />
//                 <span className="text-xs font-normal text-slate-500">
//                   {selectedResult.matricNumber ?? "-"}
//                 </span>
//               </span>
//             </div>
//             <div className="flex justify-between border-b border-slate-200 pb-2">
//               <span className="text-slate-600">Continuous Assessment (CA)</span>
//               <span className="font-semibold text-slate-900">
//                 {selectedResult.caScore ?? "-"}
//               </span>
//             </div>
//             <div className="flex justify-between border-b border-slate-200 pb-2">
//               <span className="text-slate-600">Examination Score</span>
//               <span className="font-semibold text-slate-900">
//                 {selectedResult.examScore ?? "-"}
//               </span>
//             </div>
//             <div className="flex justify-between pt-1">
//               <span className="font-bold text-slate-900">Total Score</span>
//               <span className="font-bold text-slate-900">
//                 {selectedResult.score ?? "-"}%
//               </span>
//             </div>
//             <div className="flex justify-between pt-1">
//               <span className="font-bold text-slate-900">Final Grade</span>
//               <span className="font-bold text-blue-600">
//                 {selectedResult.grade ?? "-"}
//               </span>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// }

// export default ResultsTable;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import DropdownMenu from "../../ui/DropdownMenu";
import ConfirmModal from "../../ui/ConfirmModal";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

import resultUploadService from "../../../services/admin/resultUploadService";
import { useToast } from "../../../context/ToastContext";

function ResultsTable({
  columns,
  results,
  onRefresh,
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
  pageSize,
  loading,
  sortKey,
  sortDirection,
  onSort,
  selectable,
  selectedRows,
  onRowSelect,
  onSelectAll,
}) {
  const navigate = useNavigate();
  const { addToast } = useToast();

  // State for Confirmations (Approve, Suspend, Delete)
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    actionType: null,
    resultId: null,
  });

  // State for Viewing Details
  const [selectedResult, setSelectedResult] = useState(null);

  // NEW: State for Editing Result
  const [editConfig, setEditConfig] = useState({
    isOpen: false,
    result: null,
    caScore: "",
    examScore: "",
    isSubmitting: false,
  });

  // --- HANDLERS ---

  const executeAction = async () => {
    const { actionType, resultId } = confirmConfig;
    setConfirmConfig({ isOpen: false, actionType: null, resultId: null });

    try {
      if (actionType === "approve") {
        await resultUploadService.approveResult(resultId);
        addToast({
          title: "Approved",
          message: "Result approved successfully!",
          type: "success",
        });
      } else if (actionType === "suspend") {
        await resultUploadService.deactivateResult(resultId);
        addToast({
          title: "Suspended",
          message: "Result suspended successfully!",
          type: "warning",
        });
      } else if (actionType === "delete") {
        await resultUploadService.deleteResult(resultId);
        addToast({
          title: "Deleted",
          message: "Result deleted successfully!",
          type: "success",
        });
      }
      onRefresh?.();
    } catch (error) {
      addToast({
        title: "Action Failed",
        message: error.message || `Failed to ${actionType} result.`,
        type: "error",
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditConfig((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const { result, caScore, examScore } = editConfig;

      // Look at the flat IDs we just added to the parent mapper
      const payload = {
        studentId: result.studentId, // From Step 1
        courseId: result.courseId, // From Step 1
        sessionId: result.sessionId, // From Step 1
        semesterId: result.semesterId, // From Step 1
        caScore: Number(caScore),
        examScore: Number(examScore),
      };

      // Add a quick check to prevent sending undefined IDs again
      if (!payload.studentId) {
        throw new Error("Missing Student ID. Check frontend data mapping.");
      }

      await resultUploadService.updateResult(result.id, payload);

      addToast({
        title: "Result Updated",
        message: "The scores have been successfully updated.",
        type: "success",
      });

      setEditConfig({
        isOpen: false,
        result: null,
        caScore: "",
        examScore: "",
        isSubmitting: false,
      });
      onRefresh?.();
    } catch (error) {
      addToast({
        title: "Update Failed",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to update the result.",
        type: "error",
      });
      setEditConfig((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const getModalText = () => {
    switch (confirmConfig.actionType) {
      case "approve":
        return {
          title: "Approve Result",
          text: "Are you sure you want to approve this student's result?",
          btn: "Approve",
          isDestructive: false,
        };
      case "suspend":
        return {
          title: "Suspend Result",
          text: "Are you sure you want to suspend this student's result?",
          btn: "Suspend",
          isDestructive: true,
        };
      case "delete":
        return {
          title: "Delete Result",
          text: "Are you sure you want to permanently delete this result?",
          btn: "Delete",
          isDestructive: true,
        };
      default:
        return { title: "", text: "", btn: "", isDestructive: false };
    }
  };

  const modalDetails = getModalText();

  const renderCell = (result, column) => {
    switch (column.key) {
      case "studentName":
        return (
          <div>
            <p className="font-semibold text-slate-900">
              {result.studentName || "Unknown"}
            </p>
            <p className="text-sm text-slate-500">
              {result.matricNumber || "-"}
            </p>
          </div>
        );
      case "courseCode":
        return (
          <div>
            <p className="font-medium text-blue-600">{result.code || "-"}</p>
            <p className="text-sm text-slate-500">{result.course || "-"}</p>
          </div>
        );
      case "score":
        return <span className="font-medium">{result.score ?? "-"}</span>;
      case "grade":
        return <span className="font-semibold">{result.grade || "-"}</span>;
      case "semester":
        return <span>{result.semester || "-"}</span>;
      case "session":
        return <span>{result.session || "-"}</span>;
      case "status":
        return (
          <Badge
            variant={
              result.status === "Approved"
                ? "success"
                : result.status === "Pending"
                  ? "warning"
                  : "danger"
            }
          >
            {result.status || "Pending"}
          </Badge>
        );
      case "actions":
        return (
          <DropdownMenu
            items={[
              {
                label: "View Result",
                onClick: () => setSelectedResult(result),
              },
              {
                label: "Edit Result",
                onClick: () =>
                  setEditConfig({
                    isOpen: true,
                    result: result,
                    caScore: result.caScore ?? 0,
                    examScore: result.examScore ?? 0,
                    isSubmitting: false,
                  }),
              },
              {
                label: "Approve Result",
                onClick: () =>
                  setConfirmConfig({
                    isOpen: true,
                    actionType: "approve",
                    resultId: result.id,
                  }),
              },
              {
                label: "Suspend Result",
                onClick: () =>
                  setConfirmConfig({
                    isOpen: true,
                    actionType: "suspend",
                    resultId: result.id,
                  }),
              },
              {
                label: "Delete Result",
                onClick: () =>
                  setConfirmConfig({
                    isOpen: true,
                    actionType: "delete",
                    resultId: result.id,
                  }),
              },
            ]}
          />
        );
      default:
        return result[column.key] ?? "-";
    }
  };

  const detailsModalFooter = (
    <Button
      onClick={() => setSelectedResult(null)}
      className="w-full justify-center bg-slate-900 text-white hover:bg-slate-800"
    >
      Close Details
    </Button>
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={results}
        renderCell={renderCell}
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        serverPagination
        sortKey={sortKey}
        loading={loading}
        sortDirection={sortDirection}
        onSort={onSort}
        selectable={selectable}
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        onSelectAll={onSelectAll}
        getRowId={(row) => row.id}
      />

      {/* Row-Level Action Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() =>
          setConfirmConfig({ isOpen: false, actionType: null, resultId: null })
        }
        onConfirm={executeAction}
        title={modalDetails.title}
        message={modalDetails.text}
        confirmText={modalDetails.btn}
        isDestructive={modalDetails.isDestructive}
      />

      {/* --- RESULT DETAILS MODAL --- */}
      <Modal
        isOpen={!!selectedResult}
        onClose={() => setSelectedResult(null)}
        title="Result Details"
        subtitle={
          <>
            <span className="font-semibold text-blue-600">
              {selectedResult?.code}
            </span>
            <span className="ml-1.5 text-slate-500">
              — {selectedResult?.course}
            </span>
          </>
        }
        footer={detailsModalFooter}
        maxWidth="max-w-sm"
      >
        {selectedResult && (
          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-600">Student</span>
              <span className="text-right font-semibold text-slate-900">
                {selectedResult.studentName ?? "-"} <br />
                <span className="text-xs font-normal text-slate-500">
                  {selectedResult.matricNumber ?? "-"}
                </span>
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-600">Continuous Assessment (CA)</span>
              <span className="font-semibold text-slate-900">
                {selectedResult.caScore ?? "-"}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-600">Examination Score</span>
              <span className="font-semibold text-slate-900">
                {selectedResult.examScore ?? "-"}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-bold text-slate-900">Total Score</span>
              <span className="font-bold text-slate-900">
                {selectedResult.score ?? "-"}%
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-bold text-slate-900">Final Grade</span>
              <span className="font-bold text-blue-600">
                {selectedResult.grade ?? "-"}
              </span>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={editConfig.isOpen}
        onClose={() =>
          !editConfig.isSubmitting &&
          setEditConfig({
            isOpen: false,
            result: null,
            caScore: "",
            examScore: "",
            isSubmitting: false,
          })
        }
        title="Edit Result"
        subtitle={
          <>
            Editing{" "}
            <span className="font-semibold text-slate-900">
              {editConfig.result?.code}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-slate-900">
              {editConfig.result?.studentName}
            </span>
          </>
        }
        maxWidth="max-w-sm"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Continuous Assessment (CA) Score
            </label>
            <input
              type="number"
              required
              min="0"
              max="30" /* Capped at 30 */
              value={editConfig.caScore}
              onChange={(e) =>
                setEditConfig((prev) => ({ ...prev, caScore: e.target.value }))
              }
              className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="0"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Examination Score
            </label>
            <input
              type="number"
              required
              min="0"
              max="70" /* Capped at 70 */
              value={editConfig.examScore}
              onChange={(e) =>
                setEditConfig((prev) => ({
                  ...prev,
                  examScore: e.target.value,
                }))
              }
              className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="0"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setEditConfig({
                  isOpen: false,
                  result: null,
                  caScore: "",
                  examScore: "",
                  isSubmitting: false,
                })
              }
              disabled={editConfig.isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={editConfig.isSubmitting}>
              {editConfig.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ResultsTable;
