import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: `Welcome to Catalin's Store`,
  description: "Vindem cele mai bune produse, la cel mai mic pret.",
  keywords: "electrocasnice, cumpara electrocasnice, electrocasnice ieftine",
};

export default Meta;
