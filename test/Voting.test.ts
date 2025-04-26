// test/Voting.test.ts
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Voting", () => {
  it("registered voter can cast exactly one vote", async () => {
    const [alice] = await ethers.getSigners();
    const opts = ["Yes", "No"].map(ethers.encodeBytes32String);

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(opts);
    await voting.waitForDeployment();              // <-- v6 helper

    await voting.connect(alice).register();
    await voting.connect(alice).castVote(opts[0]);

    expect(await voting.votes(opts[0])).to.equal(1n);  // returns bigint

    // second vote should revert
    await expect(
      voting.connect(alice).castVote(opts[1])
    ).to.be.revertedWith("Already voted");
  });
});
