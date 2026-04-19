const ErrorIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    className="h-3 w-3 shrink-0"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5V12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
)

const ErrorMessage = ({ message }: { message?: string }) => (
  <div className="mt-1 flex items-center gap-1 text-red-500 text-xs">
    <ErrorIcon />
    <p>{message}</p>
  </div>
)

export { ErrorMessage }
