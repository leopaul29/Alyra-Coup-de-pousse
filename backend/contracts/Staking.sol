// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/// @title CoupDePousseToken ERC20
/// @author Leo-paul MARTIN
/// @dev use mint function as a faucet
contract CoupDePousseToken is ERC20("Coup de pousse Token", "Cdp"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000*1e18);
    }
    // used in faucet or script? else delete
    function mint(address _to, uint256 _amount) external /*onlyOwner*/{
        _mint(_to, _amount);
    }
}
/// @title USDCToken ERC20
/// @author Leo-paul MARTIN
/// @dev use mint function as a faucet
contract USDCToken is ERC20("USDC", "USDC"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000*1e18);
    }
    // used in faucet or script? else delete
    function mint(address _to, uint256 _amount) external /*onlyOwner*/ {
        _mint(_to, _amount);
    }
}
/// @title SecretToken ERC20
/// @author Leo-paul MARTIN
/// @dev use mint function as a faucet
contract SecretToken is ERC20("Secret", "SCRT"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000*1e18);
    }
    // used in faucet or script? else delete
    function mint(address _to, uint256 _amount) external /*onlyOwner*/ {
        _mint(_to, _amount);
    }
}
/// custom errors
error poolAlreadyExist(address);
/// @title CDPStaking ERC20
/// @author Leo-paul MARTIN
/// @dev contract to handle staking functions
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
    mapping(address => uint256) public rewards;
    uint256  lastBlockUpdate; // begining of the staking
    address cdpProject;
    // EVENTS    
    event CreatePool(address _account, address _token, uint256 weight);  
    event Deposited(uint256 pid, address indexed account, uint amount);
    event Withdrawed(uint256 pid, address indexed account, uint amount);
    event RewardClaimed(address indexed account, uint userReward, uint projectReward);

    // CONSTRUCTOR
    /// @dev init staking dapp with reward token
    /// @param _rewardToken is the ERC20 address of the token reward for the dapp
    constructor(address _rewardToken) {
        rewardToken = CoupDePousseToken(_rewardToken);
    }
    /// @dev set the project contract to share and send the reward
    /// @param _cdpProject the contract address
    function setCDPProjectAddress( address _cdpProject) external onlyOwner {
        cdpProject=_cdpProject;
    }
    // MODIFIERS
    modifier updateReward() {
        rewards[msg.sender] += computeCumulateReward();
        lastBlockUpdate = block.number;
        _;
    }
    /// @dev claim the reward cumulated
    function claimReward() external updateReward() {
        uint256 userReward = rewards[msg.sender] / 2;
        uint256 projectReward = rewards[msg.sender] - userReward;
        rewardToken.mint(msg.sender, userReward);
        rewardToken.mint(cdpProject, projectReward);
        rewards[msg.sender]=0;
        emit RewardClaimed(msg.sender, userReward, projectReward);
    }

    // FUNCTIONS
    /// @dev get pool length
    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }
    /// @dev create a pool of staking
    /// @param _token is the ERC20 contract for the pool
    /// @param _weight is the bonus multiplier of the pool
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

    /// @dev stake token
    /// @param _pid poolID
    /// @param _amount amount of token to stake
    function stake(uint256 _pid, uint256 _amount) external updateReward() {
        require(_amount > 0, "_amount = 0");
        PoolInfo storage pool = poolInfo[_pid];
        pool.totalSupply += _amount;
        
        userInfo[_pid][msg.sender]+= _amount;

        pool.token.transferFrom(msg.sender, address(this), _amount);
        emit Deposited(_pid, msg.sender, _amount);
    }

    /// @dev withdraw token
    /// @param _pid poolID
    /// @param _amount amount of token to withdraw
    function withdraw(uint256 _pid, uint256 _amount) external updateReward() {
        require(_amount > 0, "amount = 0");

        require(userInfo[_pid][msg.sender] >= _amount, "Not enough funds");
        userInfo[_pid][msg.sender]-= _amount;

        PoolInfo storage pool = poolInfo[_pid];
        pool.totalSupply -= _amount;

        pool.token.transfer(msg.sender, _amount);
        emit Withdrawed(_pid, msg.sender, _amount);
    }

    /// @dev compute Reward Per Block
    function computeRewardPerBlock() public view returns (uint256) {
        uint256 length = poolInfo.length;
        uint256 points = 0; // use it to calculate reward (pool[allIndex].weigth * lpToken)
        for(uint256 pid = 0; pid < length; ++pid) {
            // rewardToken.mint(msg.sender, user.rewards);
            points += userInfo[pid][msg.sender] * poolInfo[pid].weight;
        }
        return points;
    }

    /// @dev compute Cumulate Reward
    function computeCumulateReward() public view returns (uint256) {
        uint256 nbRewardPerBlock = computeRewardPerBlock();
        uint256 nbBlock = block.number - lastBlockUpdate;
        return nbBlock * nbRewardPerBlock;
    }
}