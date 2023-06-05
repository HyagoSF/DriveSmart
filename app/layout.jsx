import './globals.css';
import { Inter } from 'next/font/google';

import { Open_Sans } from 'next/font/google';
import Footer from './Footer';

import QueryWrapper from './auth/QueryWrapper';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import NavBarLogged from './auth/NavBarLogged';
import { useRouter } from 'next/navigation';

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

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			{/* When I use openSans.classname will change all my pages font to opensans, if I use variable, just those who I add the font-open-sans will render */}
			<body
				className={`${openSans.className} bg-gray-200 md:mx-48 xl:mx-96 `}>
				<QueryWrapper>
					{/* NavBar here */}
					{session?.user && <NavBarLogged session={session} />}

					{children}

					{session?.user && <Footer />}
				</QueryWrapper>
			</body>

			{/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpMEKoIbnf0FIGlcl9-mM8WyNeCfJB7Js&libraries=places"></script> */}
		</html>
	);
}

// function MyApp({ Component, pageProps }) {
// 	const router = useRouter();
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		const userInfo = GET_USER_FROM_LS;
// 		if (router.pathname !== '/login' && !userInfo) {
// 			router.push('/login');
// 		} else {
// 			setIsLoading(false);
// 		}
// 	}, []);

// 	if (isLoading) {
// 		return <YourLoadingComponent />;
// 	}

// 	return YOUR_DEFAULT_RETURN;
// }
