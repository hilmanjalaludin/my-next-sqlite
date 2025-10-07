import  NextResponse  from "next/server"
import prisma from "@/lib/prisma"

// ✅ DELETE /api/posts/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)
  console.log(`[DELETE /api/posts/${id}] Mulai hapus...`)

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
  }

  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    })

    console.log(`[DELETE /api/posts/${id}] Berhasil dihapus.`)
    return NextResponse.json({ message: "Post deleted", deletedPost })
  } catch (error: any) {
    console.error(`[DELETE /api/posts/${id}] Gagal:`, error)

    if (error.code === "P2025") {
      // Prisma error kalau record tidak ditemukan
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
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)

  try {
    const body = await req.json()
    const data: {
      title?: string
      content?: string | null
      published?: boolean
    } = {}

    if (typeof body.title === "string") data.title = body.title.trim()
    if (typeof body.content === "string")
      data.content = body.content.trim() || null
    if (typeof body.published === "boolean")
      data.published = body.published

    const updated = await prisma.post.update({
      where: { id },
      data,
    })

    return NextResponse.json(updated)
  } catch (err: any) {
  
    if (err.code === "P2025") {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: err.message || "Failed to update post" },
      { status: 500 }
    )
  }
}
