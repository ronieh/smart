contract Smart {
    address private myOwner;
    uint private myVar;

	function Smart(address iOwner, uint iVar) {
        myOwner = iOwner;
        myVar = iVar;
	}
    
    // Getters
    function getMyOwner() public constant returns ( address ) {
        return myOwner;
    }
    
    function getMyVar() public constant returns ( uint ) {
        return myVar;
	}

    // Setters
    function setMyOwner(address iAdd) public {
        myOwner = iAdd;
    }
    
	function setMyVar(uint iVar) public {
        myVar = iVar;
    }

    /* suicide transfers the contract balance to the address supplied, before removing the contract */
	function destroy() {
        if (msg.sender == myOwner) {
            suicide(myOwner);
        }
    }
}