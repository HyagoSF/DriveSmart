import './globals.css';
import { Inter } from 'next/font/google';

import { Open_Sans } from 'next/font/google';

// Adding the font to the page
const openSans = Open_Sans({
	weight: '400',
	style: 'normal',
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-family-open-sans',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			{/* When I use openSans.classname will change all my pages font to opensans, if I use variable, just those who I add the font-open-sans will render */}
			<body className={openSans.className}>{children}</body>
		</html>
	);
}
