import { Chain, configureChains, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

export const polygon: Chain = {
  id: 137,
  name: "Polygon",
  network: "polygon",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: "https://polygon-rpc.com",
  },
  blockExplorers: {
    default: {
      name: "PolyScan",
      url: "https://polygonscan.com",
    },
  },
};

export const wagmiChains = [polygon];

export const { provider, chains } = configureChains(wagmiChains, [publicProvider()]);

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: "Hello",
    appLogoUrl: "https://example.com/logo.png",
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
    rpc: {
      137: "https://polygon-rpc.com",
    },
  },
});

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});

export const client = createClient({
  autoConnect: true,
  provider,
  connectors: [metaMaskConnector, injectedConnector, coinbaseConnector, walletConnectConnector],
});
