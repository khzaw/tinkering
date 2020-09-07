import App from "../components/App";
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from "../components/PostList";
import { initializeApollo } from "../lib/apolloClient";
import Link from "next/link";

const IndexPage = () => (
  <App>
    <Link href="/paged">
      <a>Inner</a>
    </Link>
    <PostList />
  </App>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;
