import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// ✅ DELETE /api/posts/:id
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = Number(context.params.id)
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    const deleted = await prisma.post.delete({ where: { id } })
    return NextResponse.json({ message: "Post deleted", deleted })
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }
    console.error("🔥 Error DELETE /api/posts/[id]:", error)
    return NextResponse.json({ message: "Failed to delete", error: String(error) }, { status: 500 })
  }
}

// ✅ PUT /api/posts/:id
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = Number(context.params.id)
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    const body = await request.json()
    const data: any = {}

    if (typeof body.title === "string") data.title = body.title.trim()
    if (typeof body.content === "string") data.content = body.content.trim()
    if (typeof body.published === "boolean") data.published = body.published

    const updated = await prisma.post.update({
      where: { id },
      data,
    })

    return NextResponse.json(updated)
  } catch (err: any) {
    if (err?.code === "P2025") {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }
    console.error("🔥 Error PUT /api/posts/[id]:", err)
    return NextResponse.json({ message: err.message || "Failed to update" }, { status: 500 })
  }
}
