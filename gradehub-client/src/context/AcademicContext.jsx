import { createContext, useContext, useState, useEffect } from "react";
import semesterService from "../services/admin/semesterService";
import sessionService from "../services/admin/sessionService";
import { useAuth } from "./AuthContext"; // 1. Import useAuth

const AcademicContext = createContext();

export const AcademicProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useAuth();

  const fetchActiveTerms = async () => {
    try {
      setIsLoading(true);
      const sessionRes = await sessionService.getSessions();
      const activeSession = sessionRes.data?.find((s) => s.isCurrent);
      setCurrentSession(activeSession || null);

      if (activeSession) {
        const semesterRes = await semesterService.getSemesters({
          sessionId: activeSession.id,
        });
        const activeSemester = semesterRes.data?.find((sem) => sem.isCurrent);
        setCurrentSemester(activeSemester || null);
      }
    } catch (error) {
      console.error("Failed to load global academic terms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchActiveTerms();
    } else {
      setCurrentSession(null);
      setCurrentSemester(null);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <AcademicContext.Provider
      value={{ currentSession, currentSemester, fetchActiveTerms, isLoading }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => useContext(AcademicContext);
