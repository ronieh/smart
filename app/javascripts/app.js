/* General Javascript to add element on the fly */
function addElement(parentId, elementTag, elementId, html) {
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function getSmartContract() {
  var ABI  = [{"constant":true,"inputs":[],"name":"getMyOwner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"iAdd","type":"address"}],"name":"setMyOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"iVar","type":"uint256"}],"name":"setMyVar","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getMyVar","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}];
  
  var theSmart = web3.eth.contract(ABI).at('0x8456b53bd716bf085de533bc54683d61f4365795');
  return theSmart;
}

function getSmartAddress() {
  var theSmart = getSmartContract();
  var theSmartAddress = theSmart.address;
  return theSmartAddress;
};

function getSmartBalance() {
  var theSmartAddress = getSmartAddress();
  var theSmartBalance = web3.fromWei(web3.eth.getBalance(theSmartAddress));
  return theSmartBalance;
};

function getSmartOwner() {
  var theSmart = getSmartContract();
  var theSmartOwner = theSmart.getMyOwner.call();
  return theSmartOwner;
};

function getSmartVar() {
  var theSmart = getSmartContract();
  var theSmartVar = theSmart.getMyVar.call();
  return theSmartVar;
};

function setSmartOwner() {
  var theSmart = getSmartContract();
  var theSmartOwner = document.getElementById("iSmartOwner").value;
  theSmart.setMyOwner.sendTransaction(theSmartOwner, {from: web3.eth.coinbase, gas: 1000000});
};

function setSmartVar() {
  var theSmart = getSmartContract();
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

window.onload = function() {

  var theSmartAddress = getSmartAddress();
  var theSmartBalance = getSmartBalance();
  var theSmartOwner = getSmartOwner();
  var theSmartVar = getSmartVar();

  $("#theSmartAddress").html(theSmartAddress);
  $("#theSmartBalance").html(theSmartBalance.toNumber());
  $("#theSmartOwner").html(theSmartOwner);
  $("#theSmartVar").html(theSmartVar.toNumber());
  refreshBalances();
    
};
