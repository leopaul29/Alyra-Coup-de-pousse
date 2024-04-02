// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
/*
0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
0x617F2E2fD72FD9D5503197092aC168c91465E7f2

0xEf9f1ACE83dfbB8f559Da621f4aEA72C6EB10eBf
*/

contract CoupDePousseToken is ERC20("Coup de pousse Token", "Cdp"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000);
    }
    function mint(address _to, uint256 _amount) external {
        _mint(_to, _amount);
    }
}
contract USDCToken is ERC20("USDC", "USDC"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000);
    }
    function mint(address _to, uint256 _amount) external {
        _mint(_to, _amount);
    }
}

contract PairStaking is Ownable(msg.sender) {
    using Math for uint256;

    USDCToken private /*immutable*/ usdcToken;
    CoupDePousseToken private /*immutable*/ cdpToken;
    // The block number when Cdp mining starts.
    uint256 public startBlock;
    uint256 public totalUSDCSupply;
    uint256 public totalCDPSupply;
    uint256 public cdpPerBlock;
    // User address => staked amount
    // mettre tout dans une struct apres
    mapping(address => uint256) public balanceOfUSDC;
    mapping(address => uint256) public balanceOfCDP;
    mapping(address => uint256) public blockStart;
    mapping(address => uint256) public rewardPerAllocation;
    mapping(address => uint256) public rewards;
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event

    constructor() {
        usdcToken=USDCToken(address(0x95401dc811bb5740090279Ba06cfA8fcF6113778));
        cdpToken=CoupDePousseToken(address(0x998abeb3E57409262aE5b751f60747921B33613E));
        cdpPerBlock=1000;
        startBlock=0;
        // init pool et kLast ???
        uint256 _amountUSDC = 1000;
        uint256 _amountCdp = 1000;
        usdcToken.mint(address(this), _amountUSDC);
        cdpToken.mint(address(this), _amountCdp);
        totalUSDCSupply += _amountUSDC;
        totalCDPSupply += _amountCdp;
        kLast = _amountUSDC*_amountCdp;
    }

    modifier updateReward(address _account) {
        // update nb reward total in rewards mapping
         
        _;
    }

    function updateRrewardPerAllocation() public view returns(uint256) {
        
        // update reward per allocation
        // mul per blockStart[msg.sender] - block.number
    }
    
    function stake(uint256 _amountUSDC, uint256 _amountCdp) external updateReward(msg.sender) {
        require(_amountUSDC > 0, "_amountUSDC = 0");
        require(_amountCdp > 0, "_amountCdp = 0");
        usdcToken.transferFrom(msg.sender, address(this), _amountUSDC);
        cdpToken.transferFrom(msg.sender, address(this), _amountCdp);
        balanceOfUSDC[msg.sender] += _amountUSDC;
        balanceOfCDP[msg.sender] += _amountCdp;
        totalUSDCSupply += _amountUSDC;
        totalCDPSupply += _amountCdp;
        blockStart[msg.sender] = block.number;
    }

    function withdraw(uint256 _amountUSDC, uint256 _amountCdp) external updateReward(msg.sender) {
        // faire un withdraw all only pour ne pas avoir de residu
        require(_amountUSDC > 0, "amount = 0");
        require(_amountCdp > 0, "amount = 0");
        balanceOfUSDC[msg.sender] -= _amountUSDC;
        balanceOfCDP[msg.sender] -= _amountCdp;
        totalUSDCSupply -= _amountUSDC;
        totalCDPSupply -= _amountCdp;
        usdcToken.transfer(msg.sender, _amountUSDC);
        cdpToken.transfer(msg.sender, _amountCdp);
        // check if blocknumber < currentblocknumber to setreward
        blockStart[msg.sender] = 0;
    }

    function getUSDCValueViaChainLink() external pure returns (uint256) {
        return 1;
    }

    function getCdpValueViaChainLink() external pure returns (uint256) {
        // value qui change suivant la pool ?
        return 1;
    }

    function getReward() external {
        
    }
}