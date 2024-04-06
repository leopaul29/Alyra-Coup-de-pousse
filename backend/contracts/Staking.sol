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
error poolAlreadyExist(address);
contract CDPStaking is Ownable(msg.sender) {
    // VARIABLES
    CoupDePousseToken private rewardToken;

    PoolInfo[] public poolInfo;
    struct PoolInfo {
        IERC20 token;           // Address of LP token contract.
        uint256 weight;
    }
    struct UserInfo {
        uint256  lpToken; // total staked token
        uint256  blockStart; // begining of the staking
        uint256  rewards; // cumulate reward updated in updateReward function
    }
    mapping(uint256 => mapping (address => UserInfo)) public userInfo;

    // EVENTS    
    event CreatePool(address _account, address _token, uint256 weight);  

    // CONSTRUCTOR
    constructor(address _rewardToken) {
        rewardToken = CoupDePousseToken(_rewardToken);
    }
    
    // MODIFIERS
    modifier updateReward(uint256 _pid) {
            // get count of CDP token for a pool
            PoolInfo memory pool = poolInfo[_pid];
            UserInfo storage user = userInfo[_pid][msg.sender];
            uint256 nbBlock = block.number - user.blockStart;
            // update nb reward total in rewards mapping
            user.rewards += nbBlock * pool.weight;
        _;
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
            weight: _weight
        }));
         emit CreatePool(msg.sender,address(_token),_weight);
    }

    function stake(uint256 _pid, uint256 _amount) external updateReward(_pid) {
        require(_amount > 0, "_amount = 0");
        PoolInfo memory pool = poolInfo[_pid];
        
        UserInfo storage user = userInfo[_pid][msg.sender];
        user.lpToken += _amount * pool.weight; // = balance user
        user.blockStart = block.number;

        pool.token.transferFrom(msg.sender, address(this), _amount);
        //event stake
    }

    function unstake(uint256 _pid, uint256 _amount) external updateReward(_pid) {
        // faire un withdraw all only pour ne pas avoir de residu
        require(_amount > 0, "amount = 0");
        PoolInfo memory pool = poolInfo[_pid];
        
        UserInfo storage user = userInfo[_pid][msg.sender];
        user.lpToken -= _amount * pool.weight; // = balance user
        // check if blocknumber < currentblocknumber to setreward
        if(user.lpToken <= 0) {
            user.blockStart = 0;
        }

        pool.token.transfer(msg.sender, _amount);
        // event witdhraw
    }

    function getReward() external {
        uint256 length = poolInfo.length;
        // uint256 points = 0; // use it to calculate reward (pool[allIndex].weigth * lpToken)
        for(uint256 pid = 0; pid < length; ++pid) {
            UserInfo memory user = userInfo[pid][msg.sender];
            rewardToken.mint(msg.sender, user.rewards);
            user.rewards=0;
        }
    }
}