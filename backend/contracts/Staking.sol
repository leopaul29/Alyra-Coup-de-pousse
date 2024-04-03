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
    function mint(address _to, uint256 _amount) external /*onlyOwner*/{
        _mint(_to, _amount);
    }
}
contract USDCToken is ERC20("USDC", "USDC"), Ownable(msg.sender) {
    constructor() {
        _mint(msg.sender, 1000);
    }
    function mint(address _to, uint256 _amount) external /*onlyOwner*/ {
        _mint(_to, _amount);
    }
}
contract CDPStaking is Ownable(msg.sender) {
    CoupDePousseToken private /*immutable*/ rewardToken;
    uint256 totalSupply;

    constructor(address _rewardToken) {
        rewardToken = CoupDePousseToken(_rewardToken);
    }

    PoolInfo[] public poolInfo;
    struct PoolInfo {
        IERC20 token;           // Address of LP token contract.
        // uint256  totalSupply; // balance?     // How many allocation points assigned to this pool. CAKEs to distribute per block.
        // uint256 rewardTokenPerShare;  // Last block number that CAKEs distribution occurs.
        // uint256 accCakePerShare; // Accumulated CAKEs per share, times 1e12. See below.
        uint256 weight;
    }
    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }
    function createPool(IERC20 _token, uint256 _weight) external onlyOwner() {
    // chekc min max weight ??? require NEVER 0

        // shouldnot create a pool with an existing token
        // comment faire ? check si la balance de l'address du contrat est > 0
        // ça veut dire qu'une pool exist ET est déjà rempli
        //uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;

        // required rewardTokenPerShare < cdpPerBlock
        poolInfo.push(PoolInfo({
            token: _token,
            // totalSupply:0,
            weight: _weight
            // rewardTokenPerShare: 100
        }));
    }

    struct UserInfo {
        uint256  lpToken; // total staked token
        uint256  blockStart; // begining of the staking
        uint256  rewards; // cumulate reward updated in updateReward function
    }
    mapping (address => UserInfo) public userInfo;
// uint256 public truc1;
// uint256 public truc2;
    // check uint256 is really necessary
    modifier updateReward(uint256 _pid, address _account) {
        if (totalSupply != 0) {
            // get count of CDP token for a pool
            PoolInfo memory pool = poolInfo[_pid];
            UserInfo storage user = userInfo[msg.sender];
            uint256 rewardAllocPerBloc = user.lpToken / totalSupply;
// truc1=rewardAllocPerBloc;
            // get user alloc of the pool
            // PoolInfo storage pool = poolInfo[_pid];
            // uint256 alloc = user.lpToken / pool.totalSupply;
            uint256 nbBlock = block.number - user.blockStart;
// truc2=nbBlock;
            // update nb reward total in rewards mapping
            user.rewards += nbBlock * rewardAllocPerBloc;
        }
        _;
    }

    function stake(uint256 _pid, uint256 _amount) external updateReward(_pid, msg.sender) {
        require(_amount > 0, "_amount = 0");
        PoolInfo memory pool = poolInfo[_pid];
        totalSupply += _amount * pool.weight; // = balance contract
        
        UserInfo storage user = userInfo[msg.sender];
        user.lpToken += _amount * pool.weight; // = balance user
        user.blockStart = block.number;

        pool.token.transferFrom(msg.sender, address(this), _amount);
        //event stake
    }

    function withdraw(uint256 _pid, uint256 _amount) external updateReward(_pid, msg.sender) {
        // faire un withdraw all only pour ne pas avoir de residu
        require(_amount > 0, "amount = 0");
        PoolInfo memory pool = poolInfo[_pid];
        totalSupply -= _amount * pool.weight; // = balance contract
        
        UserInfo storage user = userInfo[msg.sender];
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
        for(uint256 pid = 0; pid < length; ++pid) {
            UserInfo memory user = userInfo[msg.sender];
            rewardToken.mint(msg.sender, user.rewards);
            user.rewards=0;
        }
    }

}