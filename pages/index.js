import App from "../components/App";
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from "../components/PostList";
import { initializeApollo } from "../lib/apolloClient";
import Menu from "../components/Menu";

const IndexPage = () => (
  <App>
    <Menu />
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
