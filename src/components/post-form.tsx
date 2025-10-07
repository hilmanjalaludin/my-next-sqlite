import * as React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger"
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded-md text-white transition"
  const variantStyle =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700"
      : variant === "secondary"
      ? "bg-gray-500 hover:bg-gray-600"
      : "bg-red-600 hover:bg-red-700"

  return (
    <button
      {...props}
      className={`${baseStyle} ${variantStyle} ${className ?? ""}`}
    >
      {children}
    </button>
  )
}
