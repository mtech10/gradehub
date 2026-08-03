import CGPAChart from "../dashboard/CGPAChart";

import { getCgpaProgress } from "../../utils/transcriptUtils";
import { getCurrentStudentTranscript } from "../../utils/currentStudentTranscript";

function CgpaProgress() {
  const student = getCurrentStudentTranscript();

  const progress = getCgpaProgress(student.sessions);

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
