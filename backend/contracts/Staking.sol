// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract CoupDePousseToken is ERC20("Coup de pousse Token", "Cdp"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000);
    }
    // used in faucet or script? else delete
    function mint(address _to, uint256 _amount) external /*onlyOwner*/{
        _mint(_to, _amount);
    }
}
contract USDCToken is ERC20("USDC", "USDC"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000);
    }
    // used in faucet or script? else delete
    function mint(address _to, uint256 _amount) external /*onlyOwner*/ {
        _mint(_to, _amount);
    }
}
contract SecretToken is ERC20("Secret", "SCRT"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000);
    }
    // used in faucet or script? else delete
    function mint(address _to, uint256 _amount) external /*onlyOwner*/ {
        _mint(_to, _amount);
    }
}
error poolAlreadyExist(address);
contract CDPStaking is Ownable(msg.sender) {
    // VARIABLES
    CoupDePousseToken private rewardToken;
    PoolInfo[] public poolInfo;
    struct PoolInfo {
        IERC20 token;           // Address of LP token contract.
        uint256 totalSupply;
        uint256 weight;
    }
    mapping(uint256 => mapping (address => uint256)) public userInfo;
    mapping(address=>uint256) public rewards;
    uint256  lastBlockUpdate; // begining of the staking
    address cdpProject;
    // EVENTS    
    event CreatePool(address _account, address _token, uint256 weight);  

    // CONSTRUCTOR
    constructor(address _rewardToken) {
        rewardToken = CoupDePousseToken(_rewardToken);
    }
    function setCDPProjectAddress( address _cdpProject) external onlyOwner {
        cdpProject=_cdpProject;
    }
    // MODIFIERS
    modifier updateReward() {
        rewards[msg.sender] += computeCumulateReward();
        lastBlockUpdate = block.number;
        _;
    }
    function claimReward() external  {
        uint256 userReward = rewards[msg.sender] / 2;
        uint256 projectReward = rewards[msg.sender] - userReward;
        rewardToken.mint(msg.sender, userReward);
        rewardToken.mint(cdpProject, projectReward);
        rewards[msg.sender]=0;
    }

    // FUNCTIONS
    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }
    function createPool(IERC20 _token, uint256 _weight) external onlyOwner() {
        require(_weight > 0, "weight must be greater than 0");
        // pool with this token must not exist already
        uint256 length = poolInfo.length;
        for(uint256 pid = 0; pid < length; ++pid) {
            if(address(poolInfo[pid].token) == address(_token)) {
                revert poolAlreadyExist(address(_token));
            }
        }

        poolInfo.push(PoolInfo({
            token: _token,
            totalSupply:0,
            weight: _weight
        }));
         emit CreatePool(msg.sender,address(_token),_weight);
    }

    function stake(uint256 _pid, uint256 _amount) external updateReward() {
        require(_amount > 0, "_amount = 0");
        PoolInfo storage pool = poolInfo[_pid];
        pool.totalSupply += _amount;
        
        userInfo[_pid][msg.sender]+= _amount;

        pool.token.transferFrom(msg.sender, address(this), _amount);
        //event stake
    }

    function withdraw(uint256 _pid, uint256 _amount) external updateReward() {
        // faire un withdraw all only pour ne pas avoir de residu
        require(_amount > 0, "amount = 0");
        PoolInfo storage pool = poolInfo[_pid];
        pool.totalSupply -= _amount;

        userInfo[_pid][msg.sender]-= _amount;

        pool.token.transfer(msg.sender, _amount);
        // event witdhraw
    }

    function computeRewardPerBlock() public view returns (uint256) {
        uint256 length = poolInfo.length;
        uint256 points = 0; // use it to calculate reward (pool[allIndex].weigth * lpToken)
        for(uint256 pid = 0; pid < length; ++pid) {
            // rewardToken.mint(msg.sender, user.rewards);
            points += userInfo[pid][msg.sender] * poolInfo[pid].weight;
        }
        return points;
    }

    function computeCumulateReward() public view returns (uint256) {
        uint256 nbRewardPerBlock = computeRewardPerBlock();
        uint256 nbBlock = block.number - lastBlockUpdate;
        return nbBlock * nbRewardPerBlock;
    }
}