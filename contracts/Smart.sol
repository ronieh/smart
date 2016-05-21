contract Smart {
    address myOwner;
    uint private myVar;

	function Smart() {
        myOwner = msg.sender; // msg.sender being the address which created the contract.
        myVar = 0;
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