import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import MainLayout from "../components/Layouts/MainLayout";
import { ThemeProvider, useTheme } from "next-themes";
import { AppProps } from 'next/app';
import { useEffect } from "react";
import { ProductProvider } from "../context/ProductContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="media">
          <MainLayout>
          <ProductProvider>
            <Component {...pageProps} />
          </ProductProvider>
          </MainLayout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;


