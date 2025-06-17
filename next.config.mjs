/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
/***  possibiliter futur pour le projet a etudier si besoin ***/
    
    // swcMinify: true,

    //   images: {
    // domains: ["cdn.sanity.io", "images.unsplash.com"],
    // },

//       i18n: {
//     locales: ["fr", "en"],
//     defaultLocale: "fr",
//   },

/*** utile pour rediriger le lien avec status definitif ou temporaire maintenance ***/

// redirects() {
//   return [
//     {
//       source: "/coach",
//       destination: "/maintenance",
//       permanent: false,  ⛔ redirection temporaire (code HTTP 307 ou 302)Impact SEO	Google ne modifie rien
//       permanent: true,      redirection définitif (ex: SEO, code HTTP 301) Impact SEO	Google met à jour l’indexation 
//     },
//   ];
// }

/*** permet d'ajouter des métadonnées, renforcer la sécurité ***/

// async headers() {
//     return [
//       {
//         // ⬅️ Appliquer à toutes les routes de l'application
//         source: "/(.*)",

//         headers: [
//           // ✅ Header personnalisé
//           {
//             key: "X-Powered-By",
//             value: "Next.js 15 💪 Coaching Pro",
//           },

//           // 🔐 Sécurité : Empêche le site d'être affiché dans une iframe
//           {
//             key: "X-Frame-Options",
//             value: "DENY",
//           },

//           // 🔐 Sécurité : Active le blocage de contenus mixtes
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },

//           // 🔐 Sécurité : Active le mode HTTPS strict
//           {
//             key: "Strict-Transport-Security",
//             value: "max-age=63072000; includeSubDomains; preload",
//           },

//           // 🔐 Sécurité : Empêche les attaques XSS simples
//           {
//             key: "X-XSS-Protection",
//             value: "1; mode=block",
//           },

//           // 🔐 Sécurité : Politique de contenu pour éviter les scripts externes malveillants
//           {
//             key: "Content-Security-Policy",
//             value:
//               "default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src * data:;",
//           },

//           // 🕵️‍♂️ Anti-tracking (désactivation de FLoC - Google)
//           {
//             key: "Permissions-Policy",
//             value: "interest-cohort=()",
//           },
//         ],
//       },
//     ];
//   },


};

export default nextConfig;
