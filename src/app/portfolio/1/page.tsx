
 
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>Hello, Blog Post Page! {params.slug || 'error'}</h1>
}