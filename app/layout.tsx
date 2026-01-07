// app/layout.tsx
import './globals.css'; // importiere Tailwind / globale Styles

export const metadata = {
  title: 'Asterix App',
  description: 'CRUD mit Next.js + Tailwind + TypeScript',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
