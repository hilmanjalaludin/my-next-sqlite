"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ClientPost } from "./posts-client"
import { useState } from "react"
import PostForm from "./post-form"

type Props = {
  posts: ClientPost[]
  onChanged?: () => void
}

export default function PostList({ posts, onChanged }: Props) {
  const [editing, setEditing] = useState<ClientPost | null>(null)

  async function remove(id: number) {
    if (!confirm("Hapus post ini?")) return
    console.log("Hapus post", id)
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" })
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}))
      alert(msg?.message || "Gagal menghapus")
    } else {
      onChanged?.()
    }
  }

  async function togglePublished(post: ClientPost) {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    })
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}))
      alert(msg?.message || "Gagal memperbarui")
    } else {
      onChanged?.()
    }
  }

  return (
    <div className="grid gap-4">
      {editing && (
        <PostForm
          initial={editing}
          onSuccess={() => {
            setEditing(null)
            onChanged?.()
          }}
        />
      )}

      {posts.length === 0 ? (
        <p className="text-muted-foreground">Belum ada post.</p>
      ) : (
        posts.map((p) => (
          <Card key={p.id}>
            <CardContent className="flex items-start justify-between gap-4 p-4">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{p.title}</h3>
                  {p.published ? (
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                      Published
                    </span>
                  ) : (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">Draft</span>
                  )}
                </div>
                {p.content && <p className="text-sm text-muted-foreground">{p.content}</p>}
                <p className="text-xs text-muted-foreground">
                  ID: {p.id} • {new Date(p.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Button variant="secondary" onClick={() => setEditing(p)}>
                  Edit
                </Button>
                <Button variant="outline" onClick={() => togglePublished(p)}>
                  {p.published ? "Unpublish" : "Publish"}
                </Button>
                <Button variant="destructive" onClick={() => remove(p.id)}>
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
