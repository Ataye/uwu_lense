import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

// Easle stop hydration warning (not working)
// function SafeHydrate({ children }) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === 'undefined' ? null : children}
//     </div>
//   )
// }

// function MyApp({ Component, pageProps }) {
//   return <SafeHydrate><Component {...pageProps} /></SafeHydrate>
// }

// ORIGINAL:
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
