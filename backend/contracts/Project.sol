// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CDPProject {
    // VARIABLES
    // IERC20 private rewardToken;
    struct Project {
        string title;
        uint256 minAmountToRaise;
        uint256 amountRaised;
        uint256 endBlockNumber;
        bool finished;
        address[] adherents;
        address owner;
    }

    Project[] public projectInfo;
    // mapping(address => uint256[]) public favoritesProject;

    // CONSTRUCTOR
    // constructor(IERC20 _rewardToken) {
    //     rewardToken = IERC20(_rewardToken);
    // }
    modifier projectExist(uint256 _pid) {
        require(_pid<projectInfo.length,"project id does not exist");
        _;
    }
    // modifier onlyProjectOwner(uint256 _pid) {
    //     require(_pid<projectInfo.length,"project id does not exist");
    //     require(projectInfo[_pid].owner == msg.sender,"you are not the owner of this project");
    //     _;
    // }
    // modifier projectOngoing(uint256 _pid) {
    //     require(_pid<projectInfo.length,"project id does not exist");
    //     require(projectInfo[_pid].finished == false,"the project is finished");
    //     _;
    // }
    modifier  projectExistIsOwnerOngoing(uint256 _pid) {
        require(_pid<projectInfo.length,"project id does not exist");
        require(projectInfo[_pid].owner == msg.sender,"you are not the owner of this project");
        require(projectInfo[_pid].finished == false,"the project is finished");
        _;
    }

    // function favoritesProjectLength(address _account) external view returns (uint256) {
    //     return favoritesProject[_account].length;
    // }
    function projectLength() external view returns (uint256) {
        return projectInfo.length;
    }
    function projectAdherents(uint256 _pid) external view projectExist(_pid) returns ( address[] memory){
        return projectInfo[_pid].adherents;
    }
    function projectAmountRaised(uint256 _pid) external view projectExist(_pid) returns ( uint256){
        return projectInfo[_pid].amountRaised;
    }
    function createProject(string memory _title, uint _minAmountToRaise, uint256 _endBlockNumber) external {
        projectInfo.push(Project({
            title:_title,
            minAmountToRaise:_minAmountToRaise,
            amountRaised:0,
            endBlockNumber:_endBlockNumber,
            finished:false,
            adherents:new address[](0),
            owner: msg.sender
        }));
        // event createproject
    }

    function addAdherent(uint _pid, address _adherent) external projectExistIsOwnerOngoing(_pid){
        address[] storage adherents = projectInfo[_pid].adherents;
        adherents.push(_adherent);
        //event add adherent
    }

    function removeAdherent(uint256 _pid, address _adherent) external projectExistIsOwnerOngoing(_pid){
        uint256 length = projectInfo[_pid].adherents.length;
        //uint256 ??? lower??
        uint256 adherentIndexToBeRemoved = length +1;
        for(uint256 aid = 0; aid < length; ++aid) {
            if(projectInfo[_pid].adherents[aid] == _adherent) {
                adherentIndexToBeRemoved = aid;
                break;
            }
        }
        if(adherentIndexToBeRemoved < length){
            delete projectInfo[_pid].adherents[adherentIndexToBeRemoved];
        }
        //event remove adherent
    }
    // function raiseFund(uint256 _pid, uint256 _amount) external {
        
    //     // event fund raised
    // }

    function finishProject(uint256 _pid) external projectExistIsOwnerOngoing(_pid){
        projectInfo[_pid].finished = true;
        // event project finished
    }

    // function addFavoritesProject(address _account, uint256 _pid) external projectExist(_pid) {
    //     favoritesProject[_account].push(_pid);
    //     //event add fav
    // }

    // function removeFavoritesProject(address _account, uint256 _pid) external projectExist(_pid) {
    //     if (_pid >= favoritesProject[_account].length) return;

    //     for (uint i = _pid; i<favoritesProject[_account].length-1; i++){
    //         favoritesProject[_account][i] = favoritesProject[_account][i+1];
    //     }
    //     favoritesProject[_account].pop();
    //     //event remove fav
    // }
}