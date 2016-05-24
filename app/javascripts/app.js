/* General Javascript to add element on the fly */
function addElement(parentId, elementTag, elementId, html) {
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function getSmartFactory() {
  var ABI  = [{"constant":false,"inputs":[],"name":"destroy","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getSmarts","outputs":[{"name":"","type":"address[]"}],"type":"function"},{"constant":false,"inputs":[{"name":"iOwner","type":"address"},{"name":"iVar","type":"uint256"}],"name":"createSmart","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}];
  
  var theSmartFactory = web3.eth.contract(ABI).at('0x977d28c37d65e9b918d4d734c11a6fadd32064cb');
  return theSmartFactory;
}

function getSmartContract(iAddr) {
  var ABI  = [{"constant":true,"inputs":[],"name":"getMyOwner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"iAdd","type":"address"}],"name":"setMyOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"iVar","type":"uint256"}],"name":"setMyVar","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getMyVar","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}];
  
  var theSmart = web3.eth.contract(ABI).at(iAddr);
  return theSmart;
}

function setSmartOwner() {
  var theSmartAddr = document.getElementById("iSmartAddress").value;
  var theSmart = getSmartContract(theSmartAddr);
  var theSmartOwner = document.getElementById("iSmartOwner").value;
  theSmart.setMyOwner.sendTransaction(theSmartOwner, {from: web3.eth.coinbase, gas: 1000000});
};

function setSmartVar() {
  var theSmartAddr = document.getElementById("iSmartAddress").value;
  var theSmart = getSmartContract(theSmartAddr);
  var theSmartVar = document.getElementById("iSmartVar").value;
  theSmart.setMyVar.sendTransaction(theSmartVar, {from: web3.eth.coinbase, gas: 1000000});  
};

function sendEther() {
  var fromAddress = document.getElementById("iFromAddress").value;
  var toAddress = document.getElementById("iToAddress").value;
  var etherAmount = document.getElementById("iEtherAmount").value;
  web3.eth.sendTransaction({from: fromAddress, to: toAddress, value: web3.toWei(etherAmount, "ether")})
};

function refreshBalances() { 
  var i =0;
  var html;
  var theAccount;
  var theBalance; 
  web3.eth.accounts.forEach( function(e){
    theAccount = web3.eth.accounts[i];
    theBalance = web3.fromWei(web3.eth.getBalance(theAccount), "ether");  
    html = '<h4>Account: ' + theAccount + ' Balance: ' + theBalance + '</h4>';
    addElement('userAccounts', 'p', 'userAccount_' + i, html);
    i++; 
  })
};

function refreshContracts() { 
  var theSmartFactory = getSmartFactory();
  
  var i =0;
  var html;
  var theSmartAddr;
  var theSmart;
  var theSmartOwner;
  var theSmartBalance;
  
  theSmartFactory.getSmarts().forEach( function(e){
    
    theSmartAddr = theSmartFactory.getSmarts()[i];
    theSmart = getSmartContract(theSmartAddr);
    theSmartOwner = theSmart.getMyOwner.call();
    theSmartVar = theSmart.getMyVar.call();
    theSmartBalance = web3.fromWei(web3.eth.getBalance(theSmartAddr));
   
    html = '<h4>Address: ' + theSmartAddr + '</h4>';
    html += '<h4>Balance: ' + theSmartBalance + '</h4>';
    html += '<h4>Owner: ' + theSmartOwner + '</h4>';
    html += '<h4>Variable: ' + theSmartVar + '</h4>';
    addElement('smartContracts', 'p', 'smartContrac_' + i, html);
    i++; 
    
  })
};

function createSmartContract() {
  var theSmartFactory = getSmartFactory();
  var theOwner = document.getElementById("iSmartOwnerCreate").value;
  var theVar = document.getElementById("iSmartVarCreate").value;
  theSmartFactory.createSmart.sendTransaction(theOwner, theVar, {from: web3.eth.coinbase, gas: 1000000});
}

window.onload = function() {
  refreshBalances();
  refreshContracts();    
};
