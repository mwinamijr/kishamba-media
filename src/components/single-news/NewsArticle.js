import React from "react";
import { Link } from "react-router-dom";

const NewsArticle = () => {
  return (
    <div className="position-relative mb-3">
      <img
        className="img-fluid w-100"
        src="img/news-700x435-1.jpg"
        style={{ objectFit: "cover" }}
        alt="Main news"
      />

      <div className="bg-white border border-top-0 p-4">
        <div className="mb-3">
          <Link
            className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
            to="#"
          >
            Business
          </Link>
          <Link className="text-body" to="#">
            Jan 01, 2045
          </Link>
        </div>
        <h1 class="mb-3 text-secondary text-uppercase font-weight-bold">
          Lorem ipsum dolor sit amet elit vitae porta diam...
        </h1>
        <p>
          Sadipscing labore amet rebum est et justo gubergren. Et eirmod ipsum
          sit diam ut magna lorem. Nonumy vero labore lorem sanctus rebum et
          lorem magna kasd, stet amet magna accusam consetetur eirmod. Kasd
          accusam sit ipsum sadipscing et at at sanctus et. Ipsum sit gubergren
          dolores et, consetetur justo invidunt at et aliquyam ut et vero clita.
          Diam sea sea no sed dolores diam nonumy, gubergren sit stet no diam
          kasd vero.
        </p>
        <p>
          Voluptua est takimata stet invidunt sed rebum nonumy stet, clita
          aliquyam dolores vero stet consetetur elitr takimata rebum sanctus.
          Sit sed accusam stet sit nonumy kasd diam dolores, sanctus lorem kasd
          duo dolor dolor vero sit et. Labore ipsum duo sanctus amet eos et.
          Consetetur no sed et aliquyam ipsum justo et, clita lorem sit vero
          amet amet est dolor elitr, stet et no diam sit. Dolor erat justo
          dolore sit invidunt.
        </p>{" "}
        <br />
        <h3 className="text-uppercase font-weight-bold mb-3">
          Lorem ipsum dolor sit amet elit
        </h3>
        <img
          className="img-fluid w-50 float-left mr-4 mb-2"
          src="img/news-800x500-1.jpg"
          alt="Left aligned"
        />
        <p>
          Diam dolor est labore duo invidunt ipsum clita et, sed et lorem
          voluptua tempor invidunt at est sanctus sanctus. Clita dolores sit
          kasd diam takimata justo diam lorem sed. Magna amet sed rebum eos.
          Clita no magna no dolor erat diam tempor rebum consetetur, sanctus
          labore sed nonumy diam lorem amet eirmod. No at tempor sea diam kasd,
          takimata ea nonumy elitr sadipscing gubergren erat. Gubergren at lorem
          invidunt sadipscing rebum sit amet ut ut, voluptua diam dolores at
          sadipscing stet. Clita dolor amet dolor ipsum vero ea ea eos. Invidunt
          sed diam dolores takimata dolor dolore dolore sit. Sit ipsum erat amet
          lorem et, magna sea at sed et eos. Accusam eirmod kasd lorem clita
          sanctus ut consetetur et. Et duo tempor sea kasd clita ipsum et.
        </p>{" "}
        <br />
        <h5 className="text-uppercase font-weight-bold mb-3">
          Lorem ipsum dolor sit amet elit
        </h5>
        <img
          className="img-fluid w-50 float-right mr-4 mb-2"
          src="img/news-800x500-2.jpg"
          alt="Right aligned"
        />
        <p>
          Diam dolor est labore duo invidunt ipsum clita et, sed et lorem
          voluptua tempor invidunt at est sanctus sanctus. Clita dolores sit
          kasd diam takimata justo diam lorem sed. Magna amet sed rebum eos.
          Clita no magna no dolor erat diam tempor rebum consetetur, sanctus
          labore sed nonumy diam lorem amet eirmod. No at tempor sea diam kasd,
          takimata ea nonumy elitr sadipscing gubergren erat. Gubergren at lorem
          invidunt sadipscing rebum sit amet ut ut, voluptua diam dolores at
          sadipscing stet. Clita dolor amet dolor ipsum vero ea ea eos. Invidunt
          sed diam dolores takimata dolor dolore dolore sit. Sit ipsum erat amet
          lorem et, magna sea at sed et eos. Accusam eirmod kasd lorem clita
          sanctus ut consetetur et. Et duo tempor sea kasd clita ipsum et.
        </p>
      </div>

      <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle mr-2"
            src="img/user.jpg"
            width="25"
            height="25"
            alt="User"
          />
          <span>John Doe</span>
        </div>
        <div className="d-flex align-items-center">
          <span className="ml-3">
            <i className="far fa-eye mr-2" />
            12345
          </span>
          <span className="ml-3">
            <i className="far fa-comment mr-2" />
            123
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
