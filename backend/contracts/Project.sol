// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CDPProject {
    // VARIABLES
    uint256 balanceTotal;
    Project[] public projectInfo;
    struct Project {
        string title;
        address[] adherents;
        address owner;
    }
    
    // EVENTS
    event CreateProject(address _account, string _title);  
    event AddAdherent(uint _pid, address _adherent);
    
    // MODIFIERS
    modifier projectExist(uint256 _pid) {
        require(_pid<projectInfo.length,"project id does not exist");
        _;
    }
    modifier  projectExistIsOwnerOngoing(uint256 _pid) {
        require(_pid<projectInfo.length,"project id does not exist");
        require(projectInfo[_pid].owner == msg.sender,"you are not the owner of this project");
        _;
    }

// FUNCTIONS
    function projectLength() external view returns (uint256) {
        return projectInfo.length;
    }
    function projectAdherents(uint256 _pid) external view projectExist(_pid) returns ( address[] memory){
        return projectInfo[_pid].adherents;
    }
    function createProject(string memory _title/*, uint _minAmountToRaise, uint256 _endBlockNumber*/) external {
        projectInfo.push(Project({
            title:_title,
            adherents:new address[](0),
            owner: msg.sender
        }));
        emit CreateProject(msg.sender,_title);
    }

    function addAdherent(uint _pid, address _adherent) external  projectExistIsOwnerOngoing(_pid){
        address[] storage adherents = projectInfo[_pid].adherents;
        adherents.push(_adherent);
        emit AddAdherent(_pid,_adherent);
    }
}