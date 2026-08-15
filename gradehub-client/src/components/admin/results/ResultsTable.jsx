import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import DropdownMenu from "../../ui/DropdownMenu";
import ConfirmModal from "../../ui/ConfirmModal";

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

  // Modal State for row-level actions
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    actionType: null,
    resultId: null,
  });

  // --- CONSISTENT ROW HANDLERS ---
  const executeAction = async () => {
    const { actionType, resultId } = confirmConfig;

    // Close modal immediately for smooth UX
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

      onRefresh?.(); // Refresh the table data silently
    } catch (error) {
      addToast({
        title: "Action Failed",
        message: error.message || `Failed to ${actionType} result.`,
        type: "error",
      });
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
          text: "Are you sure you want to suspend this student's result? It will not be visible to them.",
          btn: "Suspend",
          isDestructive: true,
        };
      case "delete":
        return {
          title: "Delete Result",
          text: "Are you sure you want to permanently delete this result? This action cannot be undone.",
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
                onClick: () => navigate(`/admin/results/${result.id}`),
              },
              {
                label: "Edit Result",
                onClick: () => navigate(`/admin/results/${result.id}/edit`),
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
    </>
  );
}

export default ResultsTable;
