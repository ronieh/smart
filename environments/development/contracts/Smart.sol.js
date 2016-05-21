// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"getMyOwner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"iAdd","type":"address"}],"name":"setMyOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"iVar","type":"uint256"}],"name":"setMyVar","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getMyVar","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a0319163317815560015560d18060256000396000f3606060405260e060020a6000350463208f1f998114604257806328a65428146054578063324f1f7d146079578063480e2c3614608357806383197ef014608c575b005b60b2600054600160a060020a03165b90565b6000805473ffffffffffffffffffffffffffffffffffffffff19166004351790556040565b6004356001556040565b60c56001546051565b604060005433600160a060020a039081169116141560cf57600054600160a060020a0316ff5b600160a060020a03166060908152602090f35b6060908152602090f35b56",
    unlinked_binary: "606060405260008054600160a060020a0319163317815560015560d18060256000396000f3606060405260e060020a6000350463208f1f998114604257806328a65428146054578063324f1f7d146079578063480e2c3614608357806383197ef014608c575b005b60b2600054600160a060020a03165b90565b6000805473ffffffffffffffffffffffffffffffffffffffff19166004351790556040565b6004356001556040565b60c56001546051565b604060005433600160a060020a039081169116141560cf57600054600160a060020a0316ff5b600160a060020a03166060908152602090f35b6060908152602090f35b56",
    address: "0x8456b53bd716bf085de533bc54683d61f4365795",
    generated_with: "2.0.6",
    contract_name: "Smart"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Smart error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Smart error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Smart error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Smart error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Smart = Contract;
  }

})();
