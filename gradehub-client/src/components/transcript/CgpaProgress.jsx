import CGPAChart from "../dashboard/CGPAChart";

function CgpaProgress({ progress }) {
  return (
    <CGPAChart
      title="CGPA Progress"
      subtitle="Average GPA across academic sessions"
      data={progress}
      xKey="session"
      yKey="gpa"
    />
  );
}

export default CgpaProgress;
