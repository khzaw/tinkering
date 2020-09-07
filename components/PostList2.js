import { useState } from "react";
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import PostUpvoter from "./PostUpvoter";

const PERPAGE = 10;
export const ALL_POSTS_QUERY2 = gql`
  query allPosts2($first: Int!, $skip: Int!) {
    allPosts(orderBy: { createdAt: desc }, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`;

export const allPostsQueryVars2 = {
  skip: 0,
  first: PERPAGE,
};

export default function PostList2() {
  const [currPage, setCurrPage] = useState(1);
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY2,
    {
      variables: allPostsQueryVars2,
      notifyOnNetworkStatusChange: false,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const loadNewer = () => {
    setCurrPage((prev) => Math.max(1, prev - 1));
    fetchMore({
      variables: {
        skip: PERPAGE * currPage,
      },
      updateQuery: (prev, { fetchMoreResult, ...others }) => {
        console.log("fetchMoreResults", fetchMoreResult, others);
        if (!fetchMoreResult) return prev;
        else {
          return Object.assign(
            {},
            {
              allPosts: fetchMoreResult.allPosts,
            }
          );
        }
      },
    });
  };

  const loadOlder = () => {
    setCurrPage((prev) => prev + 1);
    fetchMore({
      variables: {
        skip: PERPAGE * currPage,
      },
      updateQuery: (prev, { fetchMoreResult, ...others }) => {
        console.log("fetchMoreResults", fetchMoreResult, others);
        if (!fetchMoreResult) return prev;
        else {
          return Object.assign({}, prev, {
            allPosts: fetchMoreResult.allPosts,
          });
        }
      },
    });
  };

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  const { allPosts, _allPostsMeta } = data;
  const areMorePosts = allPosts.length < _allPostsMeta.count;
  console.log("data", data);

  return (
    <section>
      <ul>
        {allPosts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{PERPAGE * (currPage - 1) + (index + 1)}</span>
              <a href={post.url}>{post.title}</a>
              <PostUpvoter id={post.id} votes={post.votes} />
            </div>
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={() => loadNewer()} disabled={loadingMorePosts}>
          {loadingMorePosts ? "Loading ..." : <>&lt; Newer</>}
        </button>
        {areMorePosts && (
          <button onClick={() => loadOlder()} disabled={loadingMorePosts}>
            {loadingMorePosts ? "Loading ..." : <>Older &gt;</>}
          </button>
        )}
      </div>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button {
          margin-right: 1rem;
        }
      `}</style>
    </section>
  );
}
