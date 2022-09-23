import {
  useAccount,
  useConnect,
  useDisconnect,
  ConnectorNotFoundError,
  UserRejectedRequestError,
  useSendTransaction,
} from "wagmi";

import { useCallback } from "react";

const Transaction = ({ transaction }: { transaction?: any }) => {
  const { login } = useAuth();
  const { address, isConnected } = useAccount();

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    mode: "recklesslyUnprepared",
    request: {
      from: address || "",
      to: transaction?.to || "",
      data: transaction?.data || "",
      value: transaction?.value || "",
    },
  });

  return (
    <div>
      {!isConnected && (
        <>
          <h3>👮🏻‍♂️ Login: </h3>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            {connectors.map((item) => (
              <button
                key={item.connectorId}
                onClick={() => login(item.connectorId)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </>
      )}

      {isConnected && !transaction && (
        <div style={{ textAlign: "left" }}>
          <p> Logged as {address}</p>
          <p>Waiting for transaction from ZapFarm...</p>
          <p>Click to 'Invest' button</p>
        </div>
      )}

      {sendTransaction && transaction && (
        <div style={{ textAlign: "left" }}>
          <p>Logged as {address}</p>
          <button
            style={{
              margin: 20,
              fontSize: 20,
              fontFamily: "Arial",
              padding: 20,
            }}
            onClick={() => sendTransaction?.()}
          >
            Send Transaction from DEX{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Transaction;

const constants = {
  DEFAULT_CHAIN_ID: "137",
  TOAST_DURATION: 3000, // 3s
};

function useAuth() {
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const login = useCallback(
    async (connectorID: string) => {
      const findConnector = connectors.find((c) => c.id === connectorID);
      try {
        await connectAsync({ connector: findConnector });
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          console.error({
            title: "An error occurred when connect to wallet",
            description: "No provider was found",
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: "error",
          });
          return;
        }
        if (error instanceof UserRejectedRequestError) {
          console.error({
            title: "An error occurred when connect to wallet",
            description: "User rejected request",
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: "error",
          });
          return;
        }
        if (error instanceof Error) {
          console.error({
            title: "An error occurred when connect to wallet",
            description: error.message,
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: "error",
          });
        }
      }
    },
    [connectors, connectAsync]
  );

  const logout = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return { login, logout };
}

const connectors = [
  {
    title: "Metamask",
    icon: "",
    connectorId: "metaMask",
    priority: 1,
    href: "https://metamask.app.link/dapp/example.com/",
  },

  {
    title: "WalletConnect",
    icon: "",
    connectorId: "walletConnect",
    priority: 4,
  },
];
