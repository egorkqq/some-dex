import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { WagmiConfig } from "wagmi";

import App from "./App";
import { client } from "./utils/wagmi";

const rootElement = document.getElementById("root")!;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </StrictMode>
);
