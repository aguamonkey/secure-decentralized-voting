import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from:", deployer.address);

  const opts = ["Yes", "No"].map(ethers.encodeBytes32String);
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(opts);
  await voting.waitForDeployment();

  console.log("Voting deployed to:", voting.target);

  // dump address & abi for the front-end
  fs.writeFileSync(
    "./frontend.json",
    JSON.stringify(
      { address: voting.target, abi: Voting.interface.formatJson() },
      null,
      2
    )
  );
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
