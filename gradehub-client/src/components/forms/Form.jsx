import clsx from "clsx";

function Form({ children, onSubmit, className = "", ...props }) {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx("space-y-6", className)}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
