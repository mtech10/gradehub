import ResultsTable from "../results/ResultsTable";

function StudentResultsTable({ results }) {
  return (
    <ResultsTable
      results={results}
      currentPage={1}
      onPageChange={() => {}}
      pageSize={10}
      selectable={false}
      selectedRows={[]}
      onRowSelect={() => {}}
      onSelectAll={() => {}}
      sortKey=""
      sortDirection="asc"
      onSort={() => {}}
    />
  );
}

export default StudentResultsTable;
