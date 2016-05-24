import "./Smart.sol";

contract SmartFactory {
    address private myOwner;
    address[] private theSmarts;
    
    function SmartFactory() {
        myOwner = msg.sender;
    }
    
    function createSmart(address iOwner, uint iVar) public {
        address theSmart = new Smart(iOwner, iVar);
        theSmarts[theSmarts.length++] = theSmart;
    }

    function getSmarts() constant returns ( address[] ) {
        return theSmarts;
    }
    
    function destroy() {
        if (msg.sender == myOwner) {
            suicide(myOwner);
        }
    }

}
