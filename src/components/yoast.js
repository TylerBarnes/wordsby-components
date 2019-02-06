import React from "react";
import { Helmet } from "react-helmet";
import { Location } from "@reach/router";

export default props => (
  <Location>{({ location }) => <Yoast {...props} {...location} />}</Location>
);

const Yoast = ({ ...yoast }) => {
  let {
    canonical_url,
    og_description,
    og_image,
    og_title,
    seo_metadesc,
    seo_title,
    siteName,
    origin,
    href: currentUrl,
    wpUrl
  } = yoast;

  // if there is no canonical URL in yoast, it should be set to the current url
  if (!canonical_url) canonical_url = currentUrl;

  // replace the WP url with gatsby url if necessary
  if (!!canonical_url && canonical_url.includes(wpUrl))
    canonical_url = canonical_url.replace(wpUrl, origin);

  // still need:
  // og:locale
  // fb:app_id

  return (
    <Helmet>
      {/* SEO title */}
      {seo_title !== "" && <title>{seo_title}</title>}

      {/* SEO meta description */}
      {seo_metadesc !== "" && (
        <meta name="description" content={seo_metadesc} />
      )}

      {/* Canonical url */}
      {canonical_url !== "" && <link rel="canonical" href={canonical_url} />}

      {/* OG Site type */}
      <meta property="og:type" content="website" />
      {og_description !== "" && (
        <meta
          property="og:description"
          content={og_description ? og_description : seo_metadesc}
        />
      )}

      {/* OG image */}
      {!!og_image && !!og_image.publicURL && !!origin && (
        <meta property="og:image" content={origin + og_image.publicURL} />
      )}

      {/* OG site name */}
      {!!siteName && <meta property="og:site_name" content={siteName} />}

      {/* OG url */}
      {!!currentUrl && <meta property="og:url" content={currentUrl} />}

      {/* OG title (same as SEO title) */}
      {og_title !== "" && (
        <meta property="og:title" content={og_title ? og_title : seo_title} />
      )}

      {/* twitter */}
      <meta name="twitter:card" content="summary" />

      {/* Twitter image = OG image */}
      {!!og_image && !!og_image.publicURL && !!origin && (
        <meta property="twitter:image" content={origin + og_image.publicURL} />
      )}

      {/* Twitter title = og title or seo title */}
      {og_title !== "" && (
        <meta
          property="twitter:title"
          content={og_title ? og_title : seo_title}
        />
      )}
    </Helmet>
  );
};
