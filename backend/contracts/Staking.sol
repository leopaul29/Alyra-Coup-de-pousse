// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
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

contract CDPStaking is Ownable(msg.sender) {
    CoupDePousseToken private /*immutable*/ rewardToken;
    uint256 totalSupply;
    uint256 public cdpPerShare = 10;
    uint256 public startBlock;

constructor(address _rewardToken) {
    rewardToken = CoupDePousseToken(_rewardToken);
}

    PoolInfo[] public poolInfo;
    struct PoolInfo {
        IERC20 token;           // Address of LP token contract.
        uint256  totalSupply; // balance?     // How many allocation points assigned to this pool. CAKEs to distribute per block.
        uint256 rewardTokenPerShare;  // Last block number that CAKEs distribution occurs.
        // uint256 accCakePerShare; // Accumulated CAKEs per share, times 1e12. See below.
    }
    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }
    function createPool(IERC20 _token) external onlyOwner() {
        // shouldnot create a pool with an existing token
        // comment faire ? check si la balance de l'address du contrat est > 0
        // ça veut dire qu'une pool exist ET est déjà rempli
        //uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;

        // required rewardTokenPerShare < cdpPerBlock
        poolInfo.push(PoolInfo({
            token: _token,
            totalSupply:0,
            rewardTokenPerShare: 100
        }));
    }
    mapping(address => uint256) public rewards;

    struct UserInfo {
        uint256  lpToken; // total staked token
        uint256  blockStart; // begining of the staking
        uint256  rewards; // cumulate reward updated in updateReward function
    }
    mapping (uint256 => mapping (address => UserInfo)) public userInfo;

    // check uint256 is really necessary
    modifier updateReward(uint256 _pid, address _account) {
        // get count of CDP token for a pool
        // uint256 rewardPerPool = cdpPerShare / poolInfo.length;

        // get user alloc of the pool
        // PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        // uint256 alloc = user.lpToken / pool.totalSupply;

        // update nb reward total in rewards mapping
        user.rewards += 10;
        _;
    }

    function stake(uint256 _pid, uint256 _amount) external updateReward(_pid, msg.sender) {
        require(_amount > 0, "_amount = 0");
        PoolInfo storage pool = poolInfo[_pid];
        pool.totalSupply += _amount; // = balance
        
        UserInfo storage user = userInfo[_pid][msg.sender];
        user.lpToken += _amount; // = balance
        user.blockStart = block.number;

        pool.token.transferFrom(msg.sender, address(this), _amount);
        //event stake
    }

    function withdraw(uint256 _pid, uint256 _amount) external updateReward(_pid, msg.sender) {
        // faire un withdraw all only pour ne pas avoir de residu
        require(_amount > 0, "amount = 0");
        PoolInfo storage pool = poolInfo[_pid];
        pool.totalSupply -= _amount; // = balance
        
        UserInfo storage user = userInfo[_pid][msg.sender];
        user.lpToken -= _amount; // = balance
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
            UserInfo memory user = userInfo[pid][msg.sender];
            rewardToken.mint(msg.sender, user.rewards);
            user.rewards=0;
        }
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

contract CDPStaking2 is Ownable(msg.sender) {
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
uint256 public truc1;
uint256 public truc2;
    // check uint256 is really necessary
    modifier updateReward(uint256 _pid, address _account) {
        if (totalSupply != 0) {
            // get count of CDP token for a pool
            PoolInfo memory pool = poolInfo[_pid];
            UserInfo storage user = userInfo[msg.sender];
            uint256 rewardAllocPerBloc = user.lpToken / totalSupply;
truc1=rewardAllocPerBloc;
            // get user alloc of the pool
            // PoolInfo storage pool = poolInfo[_pid];
            // uint256 alloc = user.lpToken / pool.totalSupply;
            uint256 nbBlock = block.number - user.blockStart;
truc2=nbBlock;
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