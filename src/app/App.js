// _app.js (Next.js)
import { SessionProvider } from "api/checkUser/route";

export default function App({ Component, pageProps }) {
    return (
        <SessionProvider>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
