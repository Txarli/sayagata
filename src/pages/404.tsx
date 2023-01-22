import * as React from "react";
import { RandomPageRedirect } from "../components/RandomPageRedirect/RandomPageRedirect";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <RandomPageRedirect />

      <main>
        <h1>Page not found</h1>

        <p>We are redirecting you to some beatiful generative art 🤗</p>
      </main>
    </>
  );
};

export default NotFoundPage;
