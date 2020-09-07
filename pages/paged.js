import App from "../components/App";
import PostList2, {
  ALL_POSTS_QUERY2,
  allPostsQueryVars2,
} from "../components/PostList2";
import { initializeApollo } from "../lib/apolloClient";
import Menu from "../components/Menu";

const Paged = () => (
  <App>
    <Menu />
    <PostList2 />
  </App>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_POSTS_QUERY2,
    variables: allPostsQueryVars2,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default Paged;
