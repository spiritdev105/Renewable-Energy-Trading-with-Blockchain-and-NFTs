App = {
  web3Provider: null,
  contracts: {},
  names: new Array(),
  url: 'http://127.0.0.1:7545',
  // network_id: 5777,
  chairPerson: null,
  currentAccount: null,
  currentAccountRole: null,

  init: function () {
    console.log("Checkpoint 0");
    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider(App.url);
    }
    web3 = new Web3(App.web3Provider);
    ethereum.enable();
    App.populateAddress();
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('RenewableEnergyToken.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var voteArtifact = data;
      App.contracts.vote = TruffleContract(voteArtifact);
      App.contracts.mycontract = data;
      // Set the provider for our contract
      App.contracts.vote.setProvider(App.web3Provider);
      App.currentAccount = web3.eth.coinbase;
      jQuery('#current_account').text(App.currentAccount);
	  App.getUserRole();
	  
      return App.bindEvents();
    });
  },

  resetNav: function(document) {
	document.getElementById('get-all-certificates-nav-item-li').style.display = "none";
	document.getElementById('get-certificates-of-user-nav-item-li').style.display = "none";
	document.getElementById('get-certificate-nav-item-li').style.display = "none";
	document.getElementById('approve-distributor-nav-item-li').style.display = "none";
	document.getElementById('create-rec-nav-item-li').style.display = "none";
	document.getElementById('approve-user-nav-item-li').style.display = "none";
	document.getElementById('self-register-nav-item-li').style.display = "none";
	document.getElementById('verify-rec-nav-item-li').style.display = "none";
	document.getElementById('sell-rec-nav-item-li').style.display = "none";
	document.getElementById('buy-rec-nav-item-li').style.display = "none";
	document.getElementById('top-up-nav-item-li').style.display = "none";

	if (App.currentAccountRole == 'none') {
		document.getElementById("self-register-nav-item-li").style.display = "block";
	} else if (App.currentAccountRole == 'owner') {
		document.getElementById('get-all-certificates-nav-item-li').style.display = "block";
		document.getElementById('get-certificates-of-user-nav-item-li').style.display = "block";
		document.getElementById('get-certificate-nav-item-li').style.display = "block";
		document.getElementById('approve-distributor-nav-item-li').style.display = "block";
		document.getElementById('verify-REC-page').style.display = "block";
		document.getElementById('create-rec-nav-item-li').style.display = "block";
		document.getElementById('approve-user-nav-item-li').style.display = "block";
		document.getElementById('verify-rec-nav-item-li').style.display = "block";
		document.getElementById('sell-rec-nav-item-li').style.display = "block";
		document.getElementById('buy-rec-nav-item-li').style.display = "block";
		document.getElementById('top-up-nav-item-li').style.display = "block";
	} else if (App.currentAccountRole == 'distributor') {
		document.getElementById('get-all-certificates-nav-item-li').style.display = "block";
		document.getElementById('get-certificates-of-user-nav-item-li').style.display = "block";
		document.getElementById('get-certificate-nav-item-li').style.display = "block";
		document.getElementById('create-rec-nav-item-li').style.display = "block";
		document.getElementById('approve-user-nav-item-li').style.display = "block";
		document.getElementById('verify-rec-nav-item-li').style.display = "block";
		document.getElementById('sell-rec-nav-item-li').style.display = "block";
		document.getElementById('buy-rec-nav-item-li').style.display = "block";
		document.getElementById('top-up-nav-item-li').style.display = "block";
	} else if (App.currentAccountRole == 'registered') {
		document.getElementById('get-all-certificates-nav-item-li').style.display = "block";
		document.getElementById('get-certificates-of-user-nav-item-li').style.display = "block";
		document.getElementById('get-certificate-nav-item-li').style.display = "block";
		document.getElementById('verify-rec-nav-item-li').style.display = "block";
		document.getElementById('sell-rec-nav-item-li').style.display = "block";
		document.getElementById('buy-rec-nav-item-li').style.display = "block";
		document.getElementById('top-up-nav-item-li').style.display = "block";
	}
  },

  resetAll: function(document) {
	document.getElementById('self-register-page').style.display = "none";
	document.getElementById('approve-distributor-page').style.display = "none";
	document.getElementById('create-rec-page').style.display = "none";
	document.getElementById('approve-user-page').style.display = "none";
	document.getElementById('verify-REC-page').style.display = "none";
	document.getElementById('sell-REC-page').style.display = "none";
	document.getElementById('buy-REC-page').style.display = "none";
	document.getElementById('topup-balance-page').style.display = "none";
	document.getElementById('get-certificates-of-user-page').style.display = "none";
	document.getElementById('get-all-certificates-page').style.display = "none";
	document.getElementById('get-certificate-page').style.display = "none";
  },

  bindEvents: function () {
	$(document).on('click', '#submit-approve-distributor', App.handleApproveDistributor);
    $(document).on('click', '#submit-generate-rec', App.handleGenerateREC);
    $(document).on('click', '#submit-approve-user', App.handleApproveUser);
    $(document).on('click', '#submit-get-certificates-of-user', App.handleGetAllCertificatesOfUser);
    $(document).on('click', '#submit-get-all-certificates', App.handleGetAllCertificates);
    $(document).on('click', '#submit-get-certificate', App.handleGetCertificate);
    $(document).on('click', '#submit-verify-rec', App.handleVerifyREC);
    $(document).on('click', '#submit-sell-rec', App.handleSellREC);
    $(document).on('click', '#submit-buy-rec', App.handleBuyREC);
    $(document).on('click', '#submit-top-up', App.handleTopUpBalance);
    $(document).on('click', '#submit-self-register', App.handleRegister);
	
	$('#approve-distributor-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('approve-distributor-page').style.display = "block";
	})

	$('#create-rec-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('create-rec-page').style.display = "block";
	})

	$('#approve-user-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('approve-user-page').style.display = "block";
	})

	$('#self-register-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('self-register-page').style.display = "block";
	})

	$('#verify-rec-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('verify-REC-page').style.display = "block";
	})

	$('#sell-rec-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('sell-REC-page').style.display = "block";
	})

	$('#buy-rec-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('buy-REC-page').style.display = "block";
	})

	$('#top-up-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('topup-balance-page').style.display = "block";
	})

	$('#get-all-certificates-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('get-all-certificates-page').style.display = "block";
	})

	$('#get-certificates-of-user-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('get-certificates-of-user-page').style.display = "block";
	})

	$('#get-certificate-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('get-certificate-page').style.display = "block";
	})
    //$(document).on('click', '#register', function(){ var ad = $('#enter_address').val(); App.handleRegister(ad); });
  },

  populateAddress: function () {
    new Web3(new Web3.providers.HttpProvider(App.url)).eth.getAccounts((err, accounts) => {
      jQuery.each(accounts, function (i) {
        if (web3.eth.coinbase != accounts[i]) {
          var optionElement = '<option value="' + accounts[i] + '">' + accounts[i] + '</option';
          jQuery('#enter_address').append(optionElement);
        }
      });
    });
  },

  getUserRole: function() {
	App.contracts.vote.deployed().then(function(instance) {
		generateRECInstance = instance;
		console.log(instance)
        return generateRECInstance.getUserRole(App.currentAccount, {from:App.currentAccount});
	  }).then(function(result) {
		App.currentAccountRole = result;
		jQuery('#current_account_role').text(App.currentAccountRole);
		App.resetNav(document);
	  })
  },

//   getChairperson: function() {
//     App.contracts.vote.deployed().then(function(instance) {
//       return instance.beneficiary();
//     }).then(function(result) {
//       App.chairPerson = result;
//       if(App.currentAccount == App.chairPerson) {
//         $(".chairperson").css("display", "inline");
//         $(".img-chairperson").css("width", "100%");
//         $(".img-chairperson").removeClass("col-lg-offset-2");
//       } else {
//         $(".other-user").css("display", "inline");
//       }
//     })
//   },

handleRegister: function(){ 
	console.log("button clicked");
	var idValue = $("#id-value").val();
    var nameValue = $("#name-value").val();
    var addressValue = App.currentAccount;
      App.contracts.vote.deployed().then(function (instance) {
        appApproveUserInstance = instance;

        return appApproveUserInstance.selfRegister(idValue, nameValue ,addressValue, {from : App.currentAccount}); // added from parameter
      }).then(function (result, err) {
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("User as been Registered", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in approving user. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
      }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
      });
},

  handleGenerateREC: function () {
    event.preventDefault();
    //var idValue = $("#id-value").val();
    var nameValue = $("#name-value").val();
    var addressValue = $("#address-value").val();
    var quantityValue = $("#quantity-value").val();
    var priceValue = $("#price-value").val();
    // removed getting account part as we already have App.currentAccount

      App.contracts.vote.deployed().then(function (instance) {
        generateRECInstance = instance;

        return generateRECInstance.generateREC(nameValue, quantityValue, priceValue, addressValue, {from: App.currentAccount}); // added from parameter
      }).then(function (result, err) {
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("You created an REC!", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in generating REC. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
      }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
      });
  },

  handleApproveDistributor: function () {
    console.log("button clicked");
    var addressValue = $("#approve-distributor-page #address-value").val();

      App.contracts.vote.deployed().then(function (instance) {
        appApproveUserInstance = instance;

        return appApproveUserInstance.approveDistributor(addressValue, {from : App.currentAccount}); // added from parameter
      }).then(function (result, err) {
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("Distributor as been approved", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in approving user. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
      }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
      });
  },

  handleApproveUser: function () {
    console.log("button clicked");
    event.preventDefault();
    var addressValue = $("#address-value").val();

      App.contracts.vote.deployed().then(function (instance) {
        appApproveUserInstance = instance;

        return appApproveUserInstance.approveUser(addressValue, {from : App.currentAccount}); // added from parameter
      }).then(function (result, err) {
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("User as been approved", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in approving user. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
      }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
      });
  },
  
  handleGetAllCertificates: function () {
    console.log("button clicked");
    App.contracts.vote.deployed().then(function (instance) {
      getAllCertificatesInstance = instance;
      return getAllCertificatesInstance.getAllCertificates({from:App.currentAccount});  // added from parameter
    }).then(function (res) {
      console.log(res);
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("Fetched all the certificates", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in fetching all the certificates. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
    }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
    })
  },
  
  handleGetCertificate: function () {
    console.log("button clicked");
    var idValue = $("#id-value").val();
    App.contracts.vote.deployed().then(function (instance) {
      getCertificateInstance = instance;
      return getCertificateInstance.getCertificate(idValue, {from:App.currentAccount});  // added from parameter
    }).then(function (res) {
      console.log(res);
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("Fetched the certificate with the given id", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in fetching the certificate with the given id. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
    }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
    })
  },

  handleGetCertificatesOfUser: function () {
    console.log("button clicked");
    var addressValue = $("#address-value").val();
    App.contracts.vote.deployed().then(function (instance) {
      getCertificatesOfUserInstance = instance;
      return getCertificatesOfUserInstance.getCertificatesOfUser(addressValue, {value:, from:App.currentAccount});  // added from parameter
    }).then(function (res) {
      console.log(res);
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("Fetched the certificates of user", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in fetching the certificates of user. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
    }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
    })
  },

  handleVerifyREC: function () {
    console.log("button clicked");
    var idValue = $("#id-value").val();
    App.contracts.vote.deployed().then(function (instance) {
      verifyRECInstance = instance;
      return verifyRECInstance.verifyREC(idValue, {from:App.currentAccount});  // added from parameter
    }).then(function (res) {
      console.log(res);
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("REC as been verified", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in verifing the REC. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
    }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
    })
  },

  handleSellREC: function () {
    console.log("button clicked");
    var idValue = $("#id-value").val();
    App.contracts.vote.deployed().then(function (instance) {
      sellRECInstance = instance;
      return sellRECInstance.sellREC(idValue, {from:App.currentAccount});  // added from parameter
    }).then(function (res) {
      console.log(res);
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("REC as been verified", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in selling the REC. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
    }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
    })
  },
  
  handleBuyREC: function () {
    console.log("button clicked");
    var idValue = $("#id-value").val();
    App.contracts.vote.deployed().then(function (instance) {
      buyRECInstance = instance;
      return buyRECInstance.buyREC({from:App.currentAccount});  // added from parameter
    }).then(function (res) {
      console.log(res);
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("REC as been verified", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in buying the REC. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
    }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
    })
  },  
  
  handleTopUpBalance: function () {
    console.log("button clicked");
    App.contracts.vote.deployed().then(function (instance) {
      topUpBalanceInstance = instance;
      return topUpBalanceInstance.topUpBalanceREC({from:App.currentAccount});  // added from parameter
    }).then(function (res) {
      console.log(res);
        if (result) {
          console.log(result.receipt.status);
          if (parseInt(result.receipt.status) == 1)
            toastr.info("Balance has been topped up", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in updating balance. Transaction Reverted!");
        } else {
          toastr["error"]("Transaction Failed!");
        }
    }).catch(function (err) {
        toastr["error"]("Transaction Failed!");
    })
  }
}

$(function () {
  $(window).load(function () {
    App.init();
    //Notification UI config
    toastr.options = {
      "showDuration": "1000",
      "positionClass": "toast-top-left",
      "preventDuplicates": true,
      "closeButton": true
    };
  });
});

// code for reloading the page on account change
window.ethereum.on('accountsChanged', function (){
  location.reload();
})
