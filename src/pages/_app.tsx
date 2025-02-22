import 'tailwindcss/tailwind.css'
import client from '@/lib/apollo'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { APP_NAME, IS_MAINNET } from '@/lib/consts'
import ProfileContext from '@/context/ProfileContext'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

// console.log(process.env.NEXT_PUBLIC_INFURA_ID)

const wagmiClient = createClient(
	getDefaultClient({
		autoConnect: true,
		appName: APP_NAME,
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
		chains: [IS_MAINNET ? chain.polygon : chain.polygonMumbai],
	})
)

const App = ({ Component, pageProps }) => {
	const [profile, setProfile] = useState<{ id: string; handle: string; isDefault: boolean }>(null)

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<WagmiConfig client={wagmiClient}>
			<ConnectKitProvider mode="dark">
				<ApolloProvider client={client}>
					<ProfileContext.Provider value={{ profile, setProfile }}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ProfileContext.Provider>
				</ApolloProvider>
			</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default App
