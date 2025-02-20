import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Cambiamos a Inter por ahora
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gestión de Usuarios",
  description: "Sistema de gestión de usuarios con Next.js y NestJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}