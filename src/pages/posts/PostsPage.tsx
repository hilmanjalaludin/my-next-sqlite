import PostsClient from "@/components/posts-client"

export const dynamic = "force-dynamic"

export default function PostsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">CRUD sederhana menggunakan Prisma + SQLite.</p>
      </header>
      <PostsClient />
    </main>
  )
}
