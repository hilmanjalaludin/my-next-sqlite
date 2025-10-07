import { NextResponse, type NextRequest } from "next/server"
import prisma from "@/lib/prisma"

// ✅ DELETE /api/posts/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    const deletedPost = await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Post deleted", deletedPost })
  } catch (error: any) {
    console.error("🔥 Error DELETE /api/posts/[id]:", error)

    if (error.code === "P2025") {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Gagal menghapus data", error: String(error) },
      { status: 500 }
    )
  }
}

// ✅ PUT /api/posts/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    const body = await request.json()
    const data: Record<string, any> = {}

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
    return NextResponse.json(
      { message: err.message || "Failed to update" },
      { status: 500 }
    )
  }
}
