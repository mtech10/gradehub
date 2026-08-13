// import { createContext, useContext, useState, useEffect } from "react";
// import semesterService from "../services/admin/semesterService";
// import sessionService from "../services/admin/sessionService";

// const AcademicContext = createContext();

// export const AcademicProvider = ({ children }) => {
//   const [currentSession, setCurrentSession] = useState(null);
//   const [currentSemester, setCurrentSemester] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchActiveTerms = async () => {
//     try {
//       setIsLoading(true);

//       const sessionRes = await sessionService.getSessions();
//       const activeSession = sessionRes.data?.find((s) => s.isCurrent);
//       setCurrentSession(activeSession || null);

//       if (activeSession) {
//         // Fetch semesters for this active session and find the current one
//         const semesterRes = await semesterService.getSemesters({
//           sessionId: activeSession.id,
//         });
//         const activeSemester = semesterRes.data?.find((sem) => sem.isCurrent);
//         setCurrentSemester(activeSemester || null);
//       }
//     } catch (error) {
//       console.error("Failed to load global academic terms:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Load once when the app mounts
//   useEffect(() => {
//     fetchActiveTerms();
//   }, []);

//   return (
//     <AcademicContext.Provider
//       value={{ currentSession, currentSemester, fetchActiveTerms, isLoading }}
//     >
//       {children}
//     </AcademicContext.Provider>
//   );
// };

// export const useAcademic = () => useContext(AcademicContext);

import { createContext, useContext, useState, useEffect } from "react";
import semesterService from "../services/admin/semesterService";
import sessionService from "../services/admin/sessionService";
import { useAuth } from "./AuthContext"; // 1. Import useAuth

const AcademicContext = createContext();

export const AcademicProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Get authentication status
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

  // 3. Only run this if the user is authenticated!
  useEffect(() => {
    if (isAuthenticated) {
      fetchActiveTerms();
    } else {
      // Clear them out if the user logs out
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
