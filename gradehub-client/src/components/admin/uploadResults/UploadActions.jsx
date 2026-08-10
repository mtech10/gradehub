// import { useNavigate } from "react-router-dom";
// import { RotateCcw, Upload } from "lucide-react";

// import Card from "../../ui/Card";
// import Button from "../../ui/Button";

// // function UploadActions({ formData, onReset, loading }) {
// //   const navigate = useNavigate();

// //   const isDisabled =
// //     !formData.sessionId ||
// //     !formData.semesterId ||
// //     !formData.departmentId ||
// //     !formData.courseId ||
// //     !formData.levelId ||
// //     !formData.file ||
// //     loading;

// //   return (
// //     <Card>
// //       <div className="flex items-center justify-between gap-4">
// //         <Button
// //           type="button"
// //           variant="secondary"
// //           onClick={() => navigate("/admin/results")}
// //         >
// //           Cancel
// //         </Button>

// //         <div className="flex gap-3">
// //           <Button
// //             type="button"
// //             variant="secondary"
// //             onClick={onReset}
// //             disabled={loading}
// //           >
// //             <RotateCcw size={18} />
// //             Reset
// //           </Button>

// //           <Button type="submit">
// //             <Upload size={18} />

// //             {loading
// //               ? "Validating..."
// //               : formData.file
// //                 ? "Validate Results"
// //                 : "Select File to Continue"}
// //           </Button>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // }

// function UploadActions({ onReset, loading, loadingOptions, isValidated }) {
//   return (
//     <div className="flex gap-4">
//       <Button
//         type="button"
//         variant="secondary"
//         onClick={onReset}
//         disabled={loading}
//       >
//         Reset
//       </Button>

//       <Button type="submit" disabled={loading || loadingOptions}>
//         {loading
//           ? "Processing..."
//           : isValidated
//             ? "Upload Result"
//             : "Validate Result"}
//       </Button>
//     </div>
//   );
// }
// export default UploadActions;

import Button from "../../ui/Button";

function UploadActions({ onReset, loading, loadingOptions, isValidated }) {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        variant="secondary"
        onClick={onReset}
        disabled={loading}
      >
        Reset
      </Button>

      <Button type="submit" disabled={loading || loadingOptions}>
        {loading
          ? "Processing..."
          : isValidated
            ? "Upload Result"
            : "Validate Result"}
      </Button>
    </div>
  );
}

export default UploadActions;
