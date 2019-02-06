import React from "react";
import { Helmet } from "react-helmet";

export default ({ currentUrl, siteName, ...yoast }) => {
  let {
    canonical_url = currentUrl,
    og_description,
    og_image,
    og_title,
    seo_metadesc,
    seo_title
  } = yoast;

  // still need:
  // og:locale
  // fb:app_id

  return (
    <Helmet>
      {/* general seo */}
      {seo_title !== "" && <title>{seo_title}</title>}
      {seo_metadesc !== "" && (
        <meta name="description" content={seo_metadesc} />
      )}
      {canonical_url !== "" && <link rel="canonical" href={canonical_url} />}

      {/* Facebook OG */}
      <meta property="og:type" content="website" />
      {og_description !== "" && (
        <meta
          property="og:description"
          content={og_description ? og_description : seo_metadesc}
        />
      )}
      {og_image !== "" && <meta property="og:image" content={og_image} />}
      {!!siteName && <meta property="og:site_name" content={siteName} />}
      {!!currentUrl && <meta property="og:url" content={currentUrl} />}
      {og_title !== "" && (
        <meta property="og:title" content={og_title ? og_title : seo_title} />
      )}
      {og_title !== "" && <meta property="" content={og_title} />}

      {/* twitter */}
      <meta name="twitter:card" content="summary" />
      {og_image !== "" && <meta property="twitter:image" content={og_image} />}
      {og_title !== "" && (
        <meta
          property="twitter:title"
          content={og_title ? og_title : seo_title}
        />
      )}
    </Helmet>
  );
};
