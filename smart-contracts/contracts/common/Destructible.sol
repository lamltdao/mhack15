pragma solidity ^0.5.16;

import './Ownable.sol';

contract Destructible is Ownable {
    
    constructor() public payable { }

    function destroy() public onlyOwner {
        selfdestruct(msg.sender);
    }
    
    function destroyAndSend(address payable _recipient) public onlyOwner {
        selfdestruct(_recipient);
    }
}