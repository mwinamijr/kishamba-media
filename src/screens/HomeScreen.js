import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="">
      <Row>
        <Col xs={8}>
          <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
            <div class="col-md-6 px-0">
              <h1 class="display-4 font-italic">
                Title of a longer featured blog post
              </h1>
              <p class="lead my-3">
                Multiple lines of text that form the lede, informing new readers
                quickly and efficiently about what’s most interesting in this
                post’s contents.
              </p>
              <p class="lead mb-0">
                <Link to="#" class="text-white font-weight-bold">
                  Continue reading...
                </Link>
              </p>
            </div>
          </div>
        </Col>
        <Col xs={4}>
          <h1>Most Popular</h1>
          <div className="row">
            <div className="col-sm-1">1</div>
            <div className="col-sm-11 bd-l-1">
              Some random text matchehd dfjkdsjkfsjk sdffhljkgksjdfin
              sngdsgjhsdogijh
            </div>{" "}
            <hr />
            <div className="col-sm-1">1</div>
            <div className="col-sm-11 bd-l-1">
              Some random text matchehd dfjkdsjkfsjk sdffhljkgksjdfin
              sngdsgjhsdogijh
            </div>
            <hr />
            <div className="col-sm-1">1</div>
            <div className="col-sm-11 bd-l-1">
              Some random text matchehd dfjkdsjkfsjk sdffhljkgksjdfin
              sngdsgjhsdogijh
            </div>{" "}
            <hr />
            <div className="col-sm-1">1</div>
            <div className="col-sm-11 bd-l-1">
              Some random text matchehd dfjkdsjkfsjk sdffhljkgksjdfin
              sngdsgjhsdogijh
            </div>{" "}
            <hr />
            <div className="col-sm-1">1</div>
            <div className="col-sm-11 bd-l-1">
              Some random text matchehd dfjkdsjkfsjk sdffhljkgksjdfin
              sngdsgjhsdogijh
            </div>{" "}
            <hr />
            <div className="col-sm-1">1</div>
            <div className="col-sm-11 bd-l-1">
              Some random text matchehd dfjkdsjkfsjk sdffhljkgksjdfin
              sngdsgjhsdogijh
            </div>{" "}
            <hr />
            <div className="col-sm-1">1</div>
            <div className="col-sm-11 bd-l-1">
              Some random text matchehd dfjkdsjkfsjk sdffhljkgksjdfin
              sngdsgjhsdogijh
            </div>{" "}
            <hr />
          </div>
        </Col>
      </Row>
      <br />
      <div className="row mb-2">
        <div className="col-sm-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                World
              </strong>
              <h3 className="mb-0">Featured post</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="stretched-link">
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">
                Design
              </strong>
              <h3 className="mb-0">Post title</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="stretched-link">
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-sm-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                World
              </strong>
              <h3 className="mb-0">Featured post</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="stretched-link">
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">
                Design
              </strong>
              <h3 className="mb-0">Post title</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="stretched-link">
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-3">
          <hr />
          <h3 className="mb-0">Sports</h3>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | football</div>

          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | football</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | football</div>
        </div>

        <div className="col-sm-3">
          <hr />
          <h3 className="mb-0">Bussiness</h3>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Arusha</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Arusha</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Arusha</div>
        </div>
        <div className="col-sm-3">
          <hr />
          <h3 className="mb-0">Fashion</h3>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Congo</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Congo</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Congo</div>
        </div>
        <div className="col-sm-3">
          <hr />
          <h3 className="mb-0">Tech</h3>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Kenya</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Kenya</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Kenya</div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
