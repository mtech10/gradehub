import Button from "../../ui/Button";

function UploadActions({ onReset, loading, loadingOptions, isValidated }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={onReset}
        disabled={loading}
        className="w-full sm:w-auto justify-center"
      >
        Reset
      </Button>

      <Button
        type="submit"
        disabled={loading || loadingOptions}
        className="w-full sm:w-auto justify-center"
      >
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
