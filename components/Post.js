import { gql, useQuery, NetworkStatus } from "@apollo/client";
import React from "react";
import PostUpvoter from "./PostUpvoter";

export const personQuery = gql`
  query person($id: Int!) {
    person(id: $id) @rest(type: "Person", path: "people/{args.id}/") {
      name
    }
  }
`;

const Post = ({ number, post }) => {
  const { loading, error, data } = useQuery(personQuery, {
    variables: { id: number },
  });

  return (
    <li>
      <div>
        <img src={post.profile} />
        <span>{number}</span>
        <a href={post.url}>{post.title}</a>
        {error && <span className="error">error</span>}
        {loading && <span>Loading...</span>}
        {data && data.person && data.person.name && (
          <span>{data.person.name}</span>
        )}
        <PostUpvoter id={post.id} votes={post.votes} />
      </div>
      <style jsx>{`
        img {
          border-radius: 50%;
          margin-right: 10px;
          height: 30px;
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
        span.error {
          color: red;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
      `}</style>
    </li>
  );
};

export default Post;
