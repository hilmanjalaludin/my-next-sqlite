import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
   console.error("GET data")
  try {
    const posts = await prisma.post.findMany({
      orderBy: { id: "desc" },
    })
    return NextResponse.json(posts)
  } catch (err) {
   
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  
  try {
    const body = await req.json()
    console.log("[POST /api/posts] Body diterima:", body)

    const { title, content, published } = body

    if (!title?.trim()) {
      return NextResponse.json({ message: "Title wajib diisi" }, { status: 400 })
    }
    console.log("🔥 Prisma object sekarang:", prisma)
    const newPost = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content?.trim() || null,
        published: !!published,
      },
    })

    console.log("✅ Post berhasil dibuat:", newPost)
    return NextResponse.json(newPost)
  } catch (err) {
    console.error("🔥 Error di POST /api/posts:", err)
    return NextResponse.json({ message: "Gagal menyimpan post" }, { status: 500 })
  }
}

// ✅ DELETE /api/posts/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)
  console.log(`[DELETE /api/posts/${id}] Mulai hapus...`)

  try {
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
    console.error("🔥 Error PUT /api/posts/[id]:", err)

    if (err.code === "P2025") {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: err.message || "Failed to update post" },
      { status: 500 }
    )
  }
}