import * as React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive"
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  let base =
    "px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2"
  let variantClass = ""

  switch (variant) {
    case "secondary":
      variantClass = "bg-gray-200 text-gray-900 hover:bg-gray-300"
      break
    case "destructive":
      variantClass = "bg-red-600 text-white hover:bg-red-700"
      break
    default:
      variantClass = "bg-blue-600 text-white hover:bg-blue-700"
  }

  return (
    <button className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  )
}
