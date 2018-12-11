// import React from "react";
// import { Link } from "gatsby";
// import { Consumer } from "wordsby/context/createWordsbyContext";

// export default ({ slug: propSlug, children, ...rest }) => {
//   if (!propSlug) {
//     return true ? (
//       <Consumer>
//         {({ wpMenu }) => {
//           // console.log(wpMenu);
//           return null;
//           // const menu = wpmenu.edges.filter(
//           //   ({ node }) => node.slug === propSlug
//           // );

//           // const items = menu.length > 0 ? menu[0].node.items : false;
//           // // remove the WP site url from menu links.
//           // for (const item of items) {
//           //   item.url = item.url.replace(url, "");
//           // }

//           // return children ? (
//           //   children(items)
//           // ) : (
//           //   <>
//           //     {items.map(item => (
//           //       <Link key={`menu-item-${item.wordpress_id}`} to={item.url}>
//           //         {item.title}
//           //       </Link>
//           //     ))}
//           //   </>
//           // );
//         }}
//       </Consumer>
//     ) : (
//       <h2>
//         slug="
//         {propSlug}" doesn't return menu items.
//         <br />
//         Maybe you have a spelling error?
//       </h2>
//     );
//   } else {
//     return <h2>Add a WP menu slug to return menu items.</h2>;
//   }
// };
