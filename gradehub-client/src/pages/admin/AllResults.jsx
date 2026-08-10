import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import ResultStats from "../../components/admin/results/ResultStats";
import ResultToolbar from "../../components/admin/results/ResultToolbar";
import ResultsTable from "../../components/admin/results/ResultsTable";
import BulkActionBar from "../../components/admin/common/BulkActionBar";

// Make sure you have this service created in your frontend!
import { resultService } from "../../services/admin/resultService";
import { resultFilters } from "../../constants/admin/results";
import { resultColumns } from "../../constants/tables/resultColumns";
import resultUploadService from "../../services/admin/resultUploadService";

function AllResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [resultStats, setResultStats] = useState({
    totalResults: 0,
    approved: 0,
    pending: 0,
    missing: 0,
  });
  const [search, setSearch] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [level, setLevel] = useState(""); // If your backend supports level filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("createdat");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRows, setSelectedRows] = useState([]);

  const pageSize = 8;

  const fetchResults = async () => {
    setLoading(true);
    try {
      const queryParams = {
        page: currentPage,
        limit: pageSize,
        search: search || undefined,
        sessionId: session || undefined,
        semesterId: semester || undefined,
        sort: sortKey,
        order: sortDirection,
      };

      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== undefined),
      );

      const response = await resultService.getResults(cleanParams);

      setResults(response.data || response.results || []);
      if (response.pagination) {
        setPagination(response.pagination);
      }
      const statistics = await resultService.getResultStatistics({
        search: search || undefined,
        sessionId: session || undefined,
        semesterId: semester || undefined,
      });

      setResultStats(statistics);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, session, semester, level, currentPage, sortKey, sortDirection]);

  const handleBulkApprove = async () => {
    if (!selectedRows.length) return;
    if (
      !window.confirm(
        `Are you sure you want to approve ${selectedRows.length} selected results?`,
      )
    )
      return;

    try {
      await resultUploadService.bulkApproveResults(selectedRows);
      alert("Selected results approved successfully!");
      setSelectedRows([]);
      fetchResults();
    } catch (error) {
      alert(error.message || "Failed to bulk approve results.");
    }
  };

  const handleBulkSuspend = async () => {
    if (!selectedRows.length) return;
    if (
      !window.confirm(
        `Are you sure you want to suspend ${selectedRows.length} selected results?`,
      )
    )
      return;

    try {
      await resultUploadService.bulkDeactivateResults(selectedRows);
      alert("Selected results suspended successfully!");
      setSelectedRows([]);
      fetchResults();
    } catch (error) {
      alert(error.message || "Failed to bulk suspend results.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedRows.length) return;
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedRows.length} selected results?`,
      )
    )
      return;

    try {
      await resultUploadService.bulkDeleteResults(selectedRows);
      alert("Selected results deleted successfully!");
      setSelectedRows([]);
      fetchResults();
    } catch (error) {
      alert(error.message || "Failed to bulk delete results.");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [search, session, semester, level]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (pageIds) => {
    const allSelected = pageIds.every((id) => selectedRows.includes(id));
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Results"
        subtitle="Manage and review students' academic results."
      />

      <ResultStats stats={resultStats} />
      <ResultToolbar
        search={search}
        setSearch={setSearch}
        session={session}
        setSession={setSession}
        semester={semester}
        setSemester={setSemester}
        level={level}
        setLevel={setLevel}
        filters={resultFilters}
      />

      {selectedRows.length > 0 && (
        <BulkActionBar
          count={selectedRows.length}
          itemLabel="results"
          onClearSelection={clearSelection}
          onExport={() => console.log("Export")}
          onApprove={handleBulkApprove}
          onSuspend={handleBulkSuspend}
          onDelete={handleBulkDelete}
        />
      )}

      <ResultsTable
        columns={resultColumns}
        results={results}
        loading={loading}
        onRefresh={fetchResults}
        totalItems={pagination.total || 0}
        totalPages={pagination.totalPages || 1}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        selectable
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}

export default AllResults;
