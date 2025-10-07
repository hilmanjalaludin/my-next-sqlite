"use client"

import useSWR from "swr"
import PostForm from "./post-form"
import PostList from "./post-list"

export type ClientPost = {
  id: number
  title: string
  content: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Network error")
    return r.json()
  })

export default function PostsClient() {
  const { data, error, isLoading, mutate } = useSWR<ClientPost[]>("/api/posts", fetcher)

  return (
    <section className="grid gap-6">
      <PostForm
        onSuccess={() => {
          mutate() // refresh list setelah create/update
        }}
      />

      {isLoading && <p className="text-muted-foreground">Memuat...</p>}
      {error && <p className="text-destructive">Gagal memuat data.</p>}

      {data && <PostList posts={data} onChanged={() => mutate()} />}
    </section>
  )
}
