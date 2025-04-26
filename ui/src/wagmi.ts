import { http, createConfig } from "wagmi";
import { hardhat } from "wagmi/chains";

// hardhat chain = localhost:8545
export const config = createConfig({
  chains: [hardhat],
  transports: { [hardhat.id]: http() },
});