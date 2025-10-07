"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ClientPost } from "./posts-client"

type Props = {
  initial?: ClientPost | null
  onSuccess?: () => void
}

export default function PostForm({ initial = null, onSuccess }: Props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initial) {
      setEditingId(initial.id)
      setTitle(initial.title)
      setContent(initial.content ?? "")
      setPublished(initial.published)
    }
  }, [initial])

  const isEditing = useMemo(() => editingId !== null, [editingId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (!title.trim()) {
        alert("Title wajib diisi")
        return
      }
      const payload = { title: title.trim(), content: content.trim(), published }
        console.log(`[POST /api/posts${isEditing ? `/${editingId}` : ""}] Payload:`, payload);
      console.log(`isEditing:`, isEditing);
      
      const res = await fetch(isEditing ? `/api/posts/${editingId}` : "/api/posts", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

    // const res = await fetch("/api/posts", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     title: "Hello World",
    //     content: "Post pertama saya",
    //     published: true
    //   })
    // })  

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}))
        throw new Error(msg?.message || "Gagal menyimpan")
      }
      // reset form
      setEditingId(null)
      setTitle("")
      setContent("")
      setPublished(false)
      onSuccess?.()
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty text-lg">{isEditing ? "Edit Post" : "Tambah Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="title">
              Title
            </label>
            <Input id="title" placeholder="Judul tulisan" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm" htmlFor="content">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Isi ringkas"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="published"
              type="checkbox"
              className="h-4 w-4"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <label className="text-sm" htmlFor="published">
              Published
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? (isEditing ? "Menyimpan..." : "Menambah...") : isEditing ? "Simpan Perubahan" : "Tambah"}
            </Button>
            {isEditing && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditingId(null)
                  setTitle("")
                  setContent("")
                  setPublished(false)
                }}
              >
                Batal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
