import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import ResultStats from "../../components/admin/results/ResultStats";
import ResultToolbar from "../../components/admin/results/ResultToolbar";
import ResultsTable from "../../components/admin/results/ResultsTable";

import BulkActionBar from "../../components/admin/common/BulkActionBar";

import {
  enrichResults,
  filterResults,
  sortResults,
} from "../../utils/resultHelpers";
import {
  results,
  resultStatistics,
  resultFilters,
} from "../../constants/admin/results";
import { resultColumns } from "../../constants/tables/resultColumns";

function AllResults() {
  const [search, setSearch] = useState("");

  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [level, setLevel] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedRows, setSelectedRows] = useState([]);

  const pageSize = 8;

  const resultsWithDetails = enrichResults(results);

  const filteredResults = filterResults(resultsWithDetails, {
    search,
    session,
    semester,
    level,
  });

  const sortedResults = sortResults(filteredResults, sortKey, sortDirection);

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

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [search, session, semester, level]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Results"
        subtitle="Manage and review students' academic results."
      />

      <ResultStats stats={resultStatistics} />

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
          onSuspend={() => console.log("Approve")}
          onDelete={() => console.log("Delete")}
        />
      )}

      <ResultsTable
        columns={resultColumns}
        results={sortedResults}
        totalItems={filteredResults.length}
        totalPages={Math.ceil(filteredResults.length / pageSize)}
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
