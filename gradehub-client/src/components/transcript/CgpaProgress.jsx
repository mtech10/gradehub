import CGPAChart from "../dashboard/CGPAChart";

import { transcript } from "../../constants/transcript";
import { getCgpaProgress } from "../../utils/transcriptUtils";

function CgpaProgress() {
  const progress = getCgpaProgress(transcript);

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
