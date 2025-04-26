/// <reference types="vite/client" />     // enables JSON import

import frontend from "../../frontend.json";   // ← two dots!

export const VOTING_ADDRESS = frontend.address as `0x${string}`;
export const VOTING_ABI = frontend.abi;