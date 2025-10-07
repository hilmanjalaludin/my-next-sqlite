import * as React from "react"

// tipe helper untuk div agar auto melengkapi properti HTML umum
type DivProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
      {...props}
    />
  )
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  )
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
}

export function CardContent({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`p-6 pt-0 ${className}`}
      {...props}
    />
  )
}
