import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Layout from "../../components/layout"
import { getPostBySlug, getAllPosts } from "../../lib/api"
import Head from "next/head"
import { CMS_NAME } from "../../lib/constants"
import markdownToHtml from "../../lib/markdownToHtml"
import PostType from "../../types/post"
import { rhythm, scale } from "../../components/utils/typography"
import Bio from "../../components/Bio"

type Props = {
  post: PostType
  morePosts?: PostType[]
  preview?: boolean
}

const Post = (props: Props) => {
  const { post, morePosts, preview } = props;

  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
            <article>
            <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
              </Head>
            <header>
              <h1
                style={{
                  marginTop: rhythm(1),
                  marginBottom: 0,
                }}
              >
                {post.title}
              </h1>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(1),
                }}
              >
                {post.date}
              </p>
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.content }} />
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <footer>
              <Bio />
            </footer>
          </article>
        </>
      )}
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ])
  const content = await markdownToHtml(post.content || "")

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map(posts => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}
