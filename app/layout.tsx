import "./globals.css";
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// Load the Icons plugin
UIkit.use(Icons);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">

      <body className="lap:h-screen tab:min-h-screen mob:min-h-screen bg-[#123] antialiased no-scrollbar scrollbar-hide">

        {children}

      </body>

    </html>
  );
}


