import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetails } from "../../features/news/articleSlice";
import { useParams, Link } from "react-router-dom";
import CommentsSection from "./CommentsSection";
import LeaveCommentForm from "./CommentForm";

const NewsArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { article, loading, error } = useSelector((state) => state.getArticles);

  useEffect(() => {
    dispatch(getArticleDetails(id));
  }, [dispatch, id]);

  if (loading) return <div className="container mt-4">Loading article...</div>;
  if (error)
    return <div className="container mt-4 text-danger">Error: {error}</div>;
  if (!article) return <div className="container mt-4">No article found.</div>;

  // Get content blocks
  const contentBlocks = article.post?.contentBlocks || [];

  // Find first image block, if available
  const firstImageBlock = contentBlocks.find((block) => block.type === "image");

  // Use that image as the main image
  const mainImage = firstImageBlock?.imageUrl || "/img/news-700x435-1.jpg";

  // Remove the first image block when rendering content
  let firstImageUsed = false;

  return (
    <div className="position-relative mb-3">
      <img
        className="img-fluid w-100"
        src={mainImage}
        style={{ objectFit: "cover" }}
        alt="Main news"
      />

      <div className="bg-white border border-top-0 p-4">
        <div className="mb-3">
          <Link
            className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
            to="#"
          >
            {article.category}
          </Link>
          <span className="text-body">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="mb-3 text-secondary text-uppercase font-weight-bold">
          {article.headline}
        </h1>

        {/* Render content blocks except the first image */}
        {contentBlocks.length > 0 ? (
          contentBlocks.map((block, idx) => {
            if (block.type === "paragraph") {
              return <p key={idx}>{block.text}</p>;
            } else if (block.type === "image") {
              // Skip the first image block only once
              if (!firstImageUsed && block.imageUrl === mainImage) {
                firstImageUsed = true;
                return null;
              }
              return (
                <img
                  key={idx}
                  className={`img-fluid w-50 ${
                    block.alignment === "left"
                      ? "float-left mr-4 mb-2"
                      : "float-right ml-4 mb-2"
                  }`}
                  src={block.imageUrl}
                  alt={`block-img-${idx}`}
                />
              );
            }
            return null;
          })
        ) : (
          <p>{article.summary || "No content available."}</p>
        )}
      </div>

      <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle mr-2"
            src="/img/user.jpg"
            width="25"
            height="25"
            alt="User"
          />
          <span>{article.post.author || "Unknown Author"}</span>
        </div>
        <div className="d-flex align-items-center">
          <span className="ml-3">
            <i className="far fa-eye mr-2" />
            {article.views || 0}
          </span>
          <span className="ml-3">
            <i className="far fa-comment mr-2" />
            {article.comments?.length || 0}
          </span>
        </div>
      </div>

      <CommentsSection />
      <LeaveCommentForm />
    </div>
  );
};

export default NewsArticle;
