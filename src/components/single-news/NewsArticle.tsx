import React, { useEffect } from "react";
import { getArticleDetails } from "../../features/news/articleSlice";
import { useParams, Link } from "react-router-dom";
import CommentsSection from "./CommentsSection";
import LeaveCommentForm from "./CommentForm";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type ContentBlock = {
  type: "paragraph" | "image";
  text?: string;
  imageUrl?: string;
  alignment?: "left" | "right";
};

type Article = {
  _id: string;
  category: string;
  createdAt: string;
  headline: string;
  summary?: string;
  post: {
    contentBlocks: ContentBlock[];
    author?: string;
  };
  views?: number;
  comments?: any[];
};

const NewsArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { article, loading, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    if (id) {
      dispatch(getArticleDetails(id));
    }
  }, [dispatch, id]);

  if (loading)
    return <div className="container mt-4 text-center">Loading article...</div>;
  if (error)
    return (
      <div className="container mt-4 text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  if (!article)
    return <div className="container mt-4 text-center">No article found.</div>;

  const contentBlocks = article.post?.contentBlocks || [];
  const firstImageBlock: ContentBlock | undefined = contentBlocks.find(
    (block: ContentBlock): block is ContentBlock & { imageUrl: string } =>
      block.type === "image"
  );
  const mainImage = firstImageBlock?.imageUrl || "/img/news-700x435-1.jpg";

  let firstImageUsed = false;

  return (
    <div className="relative mb-6">
      <img
        src={mainImage}
        alt="Main news"
        className="w-full h-[400px] object-cover"
      />

      <div className="bg-white border border-t-0 p-6 rounded-b-md shadow-md">
        <div className="mb-4 flex items-center space-x-4">
          <Link
            to="#"
            className="bg-blue-600 text-white uppercase font-semibold px-3 py-1 rounded"
          >
            {article.category}
          </Link>
          <span className="text-gray-600">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="mb-6 text-gray-800 uppercase font-extrabold text-3xl">
          {article.headline}
        </h1>

        {contentBlocks.length > 0 ? (
          contentBlocks.map((block, idx) => {
            if (block.type === "paragraph" && block.text) {
              return (
                <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                  {block.text}
                </p>
              );
            } else if (block.type === "image" && block.imageUrl) {
              if (!firstImageUsed && block.imageUrl === mainImage) {
                firstImageUsed = true;
                return null;
              }
              return (
                <img
                  key={idx}
                  src={block.imageUrl}
                  alt={`block-img-${idx}`}
                  className={`w-1/2 mb-4 rounded ${
                    block.alignment === "left"
                      ? "float-left mr-6"
                      : "float-right ml-6"
                  }`}
                />
              );
            }
            return null;
          })
        ) : (
          <p className="text-gray-700">
            {article.summary || "No content available."}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center bg-white border border-t-0 p-4 rounded-b-md shadow-md mt-4">
        <div className="flex items-center space-x-2">
          <img
            src="/img/user.jpg"
            alt="User"
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-gray-700 font-medium">
            {article.post.author || "Unknown Author"}
          </span>
        </div>
        <div className="flex items-center space-x-6 text-gray-600">
          <span className="flex items-center space-x-1">
            <i className="far fa-eye" />
            <span>{article.views ?? 0}</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="far fa-comment" />
            <span>{article.comments?.length ?? 0}</span>
          </span>
        </div>
      </div>

      <CommentsSection />
      <LeaveCommentForm />
    </div>
  );
};

export default NewsArticle;
