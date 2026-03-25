import Head from "next/head";
import type { ReactNode } from "react";
import { Quantico } from 'next/font/google';
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Footer from "./Footer";
import AdminHeader from "./admin/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

const quantico = Quantico({
	weight: ["400"],
});

export default function AdminLayout({ children, pageTitle }: AdminLayoutProps) {
	const mainRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	// Focus sur le contenu principal après chaque navigation
	useEffect(() => {
		if (mainRef.current) {
			mainRef.current.focus();
		}
	}, [router.pathname]);

	return (
		<>
			<Head>
				<title>{`CyberQuiz - ${pageTitle}`}</title>
				<meta name="description" content="Administration CyberQuiz" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={`flex flex-col min-h-screen bg-black ${quantico.className}`}>
				{/* Skip to main content link - optionnel mais recommandé */}
				<a 
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#00bb0d] focus:text-black focus:px-4 focus:py-2 focus:rounded"
				>
					Aller au contenu principal
				</a>
				
				<AdminHeader />
				<main 
					id="main-content"
					ref={mainRef}
					className="flex-1 outline-none" 
					tabIndex={-1}
					aria-label="Contenu principal"
				>
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
}
