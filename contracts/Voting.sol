// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {
    mapping(address => bool) public registered;
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => uint256) public votes;
    bytes32[] public options;
    bool public votingOpen;

    constructor(bytes32[] memory _options) {
        require(_options.length >= 2, "Need at least 2 options");
        options = _options;
        votingOpen = true;
    }

    function register() external {
        require(!registered[msg.sender], "Already registered");
        registered[msg.sender] = true;
    }

    function castVote(bytes32 option) external {
        require(votingOpen, "Voting closed");
        require(registered[msg.sender], "Not registered");
        require(!hasVoted[msg.sender], "Already voted");
        votes[option] += 1;
        hasVoted[msg.sender] = true;
    }

    function close() external {
        votingOpen = false;
    }
}
