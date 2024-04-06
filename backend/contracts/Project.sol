// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CDPProject {
    // VARIABLES
    uint256 balanceTotal;
    struct Project {
        string title;
        address[] adherents;
        address owner;
    }

    Project[] public projectInfo;
    modifier projectExist(uint256 _pid) {
        require(_pid<projectInfo.length,"project id does not exist");
        _;
    }
    modifier  projectExistIsOwnerOngoing(uint256 _pid) {
        require(_pid<projectInfo.length,"project id does not exist");
        require(projectInfo[_pid].owner == msg.sender,"you are not the owner of this project");
        _;
    }

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
        // event createproject
    }

    function addAdherent(uint _pid, address _adherent) external  projectExistIsOwnerOngoing(_pid){
        address[] storage adherents = projectInfo[_pid].adherents;
        adherents.push(_adherent);
        //event add adherent
    }
}