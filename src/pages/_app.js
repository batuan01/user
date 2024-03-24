import "../styles/globals.css";
import "../styles/atoms.css";
import "../styles/checkout.css";
import "../styles/remixicon.css";
import "../styles/product.css";
import "../styles/header.css";
import "../styles/news.css";
import "../styles/pagination.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../components/contexts/AuthContext";
import { Layout } from "../components/templates/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
