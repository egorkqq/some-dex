import "./styles.css";
import { MinimaxSDK } from "./MmxSDK/mmx-sdk";
import Transaction from "./Transaction";
import { useState } from "react";
import { WidgetEventTypes, ITransactionForSignerEvent } from "./MmxSDK/types";
import { useAccount } from "wagmi";

export default function App() {
  const [transactionEvent, setTransactionEvent] = useState<ITransactionForSignerEvent>();
  const { address } = useAccount();

  const handleClick = () => {
    new MinimaxSDK({
      swapAsset: "ETH",
      userAddress: address,
      hostAppName: "Some DEX",
      hostLogoUrl: "https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png",
      // url: 'https://ri-widget-staging-ropsten.firebaseapp.com/'
    })
      .show()
      .on(WidgetEventTypes.TRANSACTION_FOR_SIGNER, (event: ITransactionForSignerEvent) => setTransactionEvent(event));
  };

  return (
    <div className="App">
      <h2>SOME DEX Application👀</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Transaction transaction={transactionEvent?.payload} />

        <div>
          <p>Powered by ZapFarmSDK🧠 </p>
          <button style={{ margin: 20, fontSize: 20, fontFamily: "Arial", padding: 20 }} onClick={handleClick}>
            Invest to vault
          </button>
        </div>
      </div>
    </div>
  );
}
