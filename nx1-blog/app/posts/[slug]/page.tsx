import { posts } from "@/lib/posts";

// Genera las rutas estáticas en HTML de los posts
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = posts.find((post) => post.slug === slug);
  return post ? (
    <>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </>
  ) : (
    <div>No encontrado</div>
  );
}
