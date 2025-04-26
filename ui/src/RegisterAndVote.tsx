import { useAccount, useConnect, useDisconnect, useContractWrite } from "wagmi";
import { injected } from "wagmi/connectors";
import { VOTING_ADDRESS, VOTING_ABI } from "./voting";
import { ethers } from "ethers";

export function RegisterAndVote() {
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const { write: register } = useContractWrite({
    address: VOTING_ADDRESS,
    abi: VOTING_ABI,
    functionName: "register",
  });

  const { write: castVote } = useContractWrite({
    address: VOTING_ADDRESS,
    abi: VOTING_ABI,
    functionName: "castVote",
  });

  if (!isConnected)
    return <button onClick={() => connect()}>Connect Wallet</button>;

  return (
    <div className="space-y-2">
      <div>Connected as {address}</div>
      <button onClick={() => register()}>Register</button>
      <button
        onClick={() =>
          castVote({ args: [ethers.encodeBytes32String("Yes")] })
        }
      >
        Vote “Yes”
      </button>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
