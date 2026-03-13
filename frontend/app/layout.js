import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GetSentiment - Product Review Analyzer",
  description: "Analyze product reviews using Machine Learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}

