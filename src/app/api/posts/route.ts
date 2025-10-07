import  NextResponse  from "next/server"
import  PrismaClient  from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    try {
      if (!prisma || !prisma.post) {
        throw new Error("Prisma client or post model is undefined")
      }

      const posts = await prisma.post.findMany({
        orderBy: { id: "desc" },
      })

      return NextResponse.json(posts)
    } catch (error: any) {
      return NextResponse.json(
        { message: "Gagal mengambil data", error: String(error) },
        { status: 500 }
      )
    }
}


export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, content, published } = body

    if (!title?.trim()) {
      return NextResponse.json({ message: "Title wajib diisi" }, { status: 400 })
    }

    const newPost = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content?.trim() || null,
        published: !!published,
      },
    })

    return NextResponse.json(newPost)
  } catch (err) {
    console.error("🔥 Error di POST /api/posts:", err)
    return NextResponse.json({ message: "Gagal menyimpan post" }, { status: 500 })
  }
}

