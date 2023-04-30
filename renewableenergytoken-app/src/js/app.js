App = {
  web3: null,
  contracts: {},
  names: new Array(),
  url: 'http://127.0.0.1:7545',
  network_id: 5777,
  chairPerson: null,
  currentAccount: null,
  currentAccountRole: null,

  init: function () {
    console.log("Checkpoint 0");
    return App.initWeb3();
  },

  initWeb3: function () {
	if (typeof web3 !== 'undefined') {
        App.web3 = new Web3(Web3.givenProvider);
      } else {
        App.web3 = new Web3(App.url);
      }
	  
      ethereum.enable();   
	  App.populateAddress();   
      return App.initContract();
  },

  initContract: async function () {
	App.currentAccount = await ethereum.request({method: 'eth_accounts'});  
	$.getJSON('RenewableEnergyToken.json', function(data) {      
	  App.contracts.vote = new App.web3.eth.Contract(data.abi, data.networks[App.network_id].address, {});
	  App.contracts.vote.methods.owner()
	  .call()
	  .then((r)=>{
		App.chairPerson=r;
	  })
	  App.contracts.vote.methods.balanceOf()
	  .call({from:App.currentAccount[0]})
	  .then((receipt)=>{
		jQuery('#get-certificates-of-user-assets-balance').html(" Number of token owned by the current account: "+ receipt)
	  })
	  jQuery('#current_account').text(App.currentAccount[0]);

		App.getUserRole();
      	App.handleGetAllCertificates();
		return App.bindEvents();
	  
	}) 
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
	jQuery('#apreciate-depreciate-nav-text').text("");
	document.getElementById('appreciate-depreciate-form').style.display = "none";


	if (App.currentAccountRole == 'none') {
		document.getElementById("self-register-nav-item-li").style.display = "block";
	} else if (App.currentAccountRole == 'owner') {
		document.getElementById('get-all-certificates-nav-item-li').style.display = "block";
		document.getElementById('get-certificates-of-user-nav-item-li').style.display = "block";
		document.getElementById('get-certificate-nav-item-li').style.display = "block";
		document.getElementById('approve-distributor-nav-item-li').style.display = "block";
		document.getElementById('get-all-certificates-page').style.display = "block";
		document.getElementById('create-rec-nav-item-li').style.display = "block";
		document.getElementById('approve-user-nav-item-li').style.display = "block";
		document.getElementById('verify-rec-nav-item-li').style.display = "block";
		document.getElementById('sell-rec-nav-item-li').style.display = "block";
		document.getElementById('buy-rec-nav-item-li').style.display = "block";
		document.getElementById('top-up-nav-item-li').style.display = "block";
		jQuery('#apreciate-depreciate-nav-text').text("/ Appreciate / Depreciate");
		document.getElementById('appreciate-depreciate-form').style.display = "block";
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
		document.getElementById('get-all-certificates-page').style.display = "block";
		jQuery('#apreciate-depreciate-nav-text').text("/ Appreciate / Depreciate");
		document.getElementById('appreciate-depreciate-form').style.display = "block";
	} else if (App.currentAccountRole == 'registered') {
		document.getElementById('get-all-certificates-nav-item-li').style.display = "block";
		document.getElementById('get-certificates-of-user-nav-item-li').style.display = "block";
		document.getElementById('get-certificate-nav-item-li').style.display = "block";
		document.getElementById('verify-rec-nav-item-li').style.display = "block";
		document.getElementById('sell-rec-nav-item-li').style.display = "block";
		document.getElementById('buy-rec-nav-item-li').style.display = "block";
		document.getElementById('top-up-nav-item-li').style.display = "block";
		document.getElementById('get-all-certificates-page').style.display = "block";
	}
  },

  resetAll: function(document) {
	document.getElementById('self-register-page').style.display = "none";
	document.getElementById('approve-distributor-page').style.display = "none";
	document.getElementById('create-rec-page').style.display = "none";
	document.getElementById('approve-user-page').style.display = "none";
	document.getElementById('verify-rec-page').style.display = "none";
	document.getElementById('sell-rec-page').style.display = "none";
	document.getElementById('buy-rec-page').style.display = "none";
	document.getElementById('topup-balance-page').style.display = "none";
	document.getElementById('get-certificates-of-user-page').style.display = "none";
	document.getElementById('get-all-certificates-page').style.display = "none";
	document.getElementById('get-certificate-page').style.display = "none";
  },

  bindEvents: function () {
	$(document).on('click', '#submit-approve-distributor', App.handleApproveDistributor);
    $(document).on('click', '#submit-generate-rec', App.handleGenerateREC);
    $(document).on('click', '#submit-approve-user', App.handleApproveUser);
    $(document).on('click', '#submit-get-certificates-of-user',() => {
		location.reload();
		App.handleGetCertificatesOfUser()
	});
    $(document).on('click', '#submit-get-all-certificates', () => {
		location.reload();
		App.handleGetAllCertificates()
	});
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
		document.getElementById('verify-rec-page').style.display = "block";
	})

	$('#sell-rec-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('sell-rec-page').style.display = "block";
	})

	$('#buy-rec-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('buy-rec-page').style.display = "block";
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
		App.handleGetAllCertificates();
	})

	$('#get-certificates-of-user-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('get-certificates-of-user-page').style.display = "block";
		App.handleGetCertificatesOfUser();
	})

	$('#get-certificate-nav-item').click(function(e) {
		e.preventDefault();
		App.resetAll(document);
		document.getElementById('get-certificate-page').style.display = "block";
	})

	$(".nav-item a").on("click", function() {
		$(".nav-item a").removeClass("active");
		$(this).addClass("active");
	  });

	  $(document).on('click', '#appreciate_asset', function(){
        App.AppreciateREC(jQuery('#assess_asset_id').val(),jQuery('#assess_value').val());
      });

      $(document).on('click', '#depreciate_asset', function(){
        App.DepreciateREC(jQuery('#assess_asset_id').val(),jQuery('#assess_value').val());
      });
	// App.populateAddress();
    //$(document).on('click', '#register', function(){ var ad = $('#enter_address').val(); App.handleRegister(ad); });
  },

  populateAddress: function () {
	new Web3(App.url).eth.getAccounts((err, accounts) => {
        // console.log(accounts[0]);
        var option='<option></option>';
        for(var i=0;i<accounts.length;i++){
          option+='<option>'+accounts[i]+'</option>'; 
        }
        jQuery('#asset_owner').append(option);
        jQuery('#sell-rec-to_address').append(option);
		jQuery('#create-rec-address-value').append(option);
        jQuery('#from_address').append(option);
		jQuery('#approve-user-address-value').append(option);
		jQuery('#approve-distributor-address-value').append(option);

      });
  },

  getUserRole: function() {
	App.contracts.vote.methods.getUserRole(App.currentAccount[0]).call().then((result)=>{
		App.currentAccountRole = result;
		jQuery('#current_account_role').text(App.currentAccountRole);
		App.resetNav(document);
	})
  },

handleRegister: function(){ 
	console.log("button clicked");
	var idValue = $("#id-value").val();
    var nameValue = $("#name-value").val();
    var addressValue = App.currentAccount[0];
      App.contracts.vote.methods.selfRegister(idValue, nameValue ,addressValue).send({from : App.currentAccount[0]})
	  .on('receipt',(receipt)=>{
		if ((receipt.status) ) {
            toastr.info("New User Request has been sent for approval", "", { "iconClass": 'toast-info notification0' });
			location.reload()
		 } else
            toastr["error"]("Error in approving user. Transaction Reverted!");
        })
	  .on('transactionHash', function(hash){
	  }).on('error',(e)=>{
        toastr["error"]("Transaction Failed!");
	  })
},

  handleGenerateREC: function () {
    event.preventDefault();
    //var idValue = $("#id-value").val();
    var nameValue = $("#create-rec-name-value").val();
    var addressValue = $("#create-rec-address-value").val();
    var quantityValue = $("#create-rec-quantity-value").val();
    var priceValue = $("#create-rec-price-value").val();

	App.contracts.vote.methods.generateREC(nameValue, quantityValue, priceValue, addressValue).send({value:Web3.utils.toWei(priceValue), from : App.currentAccount[0]})
	.on('receipt',(receipt)=>{
		console.log(receipt)
	})
	.on('transactionHash', function(hash){
		if ((hash) ) {
			toastr.info("You created an REC!", "", { "iconClass": 'toast-info notification0' });
			$('#create-rec-page').find('input:text').val('');
			$('#create-rec-page').find('select').val('');
			location.reload()
			App.handleGetAllCertificates()
		}
		else
			toastr["error"]("Error in generating REC. Transaction Reverted!");
	}).on('error',(e)=>{
		toastr["error"]("Transaction Failed!");
	})
  },

  handleApproveDistributor: function () {
    console.log("button clicked");
    var addressValue = $("#approve-distributor-page #approve-distributor-address-value").val();

	App.contracts.vote.methods.approveDistributor(addressValue).send({from : App.currentAccount[0]})
	.on('receipt',(receipt)=>{
		if ((receipt.status) ) {
			toastr.info("Distributor has been approved", "", { "iconClass": 'toast-info notification0' });
			$('#approve-distributor-page').find('input:text').val('');
				$('#approve-distributor-page').find('select').val('');
		} else
			toastr["error"]("Error in approving user. Transaction Reverted!");
		})
	.on('transactionHash', function(hash){
	}).on('error',(e)=>{
		toastr["error"]("Transaction Failed!");
	})
  },

  handleApproveUser: function () {
    console.log("button clicked");
    event.preventDefault();
    var addressValue = $("#approve-user-address-value").val();

      App.contracts.vote.methods.approveUser(addressValue).send({from : App.currentAccount[0]})
		.on('receipt',(receipt)=>{
			if ((receipt.status) ) {
            	toastr.info("User has been approved", "", { "iconClass": 'toast-info notification0' });
				$('#approve-user-page').find('input:text').val('');
				$('#approve-user-page').find('select').val('');
			} else
				toastr["error"]("Error in approving user. Transaction Reverted!");
			})
		.on('transactionHash', function(hash){
		}).on('error',(e)=>{
			toastr["error"]("Transaction Failed!");
		})

  },
  
  handleGetAllCertificates: function () {
    console.log("button clicked");
	$('#assets').empty();
	App.contracts.vote.methods.recCount().call().then((length)=>{        
			for(var i=0;i<length;i++){
				App.contracts.vote.methods.recs(i).call()
					.then((r)=>{
						App.contracts.vote.methods.ownerOf(r.id).call().then((result)=>{
							App.contracts.vote.methods.assetApprovals(r.id).call().then((res)=>{
								var card='';
								if(res==0){
								res='None'
								card='<div class="col-lg-3"><div class="card text-white bg-primary">'+
								'<div class="card-header">'+ r.name+'</div>' +
								'<div class="card-body">'+
								'<h6 class="card-title">Asset # '+r.id+'</h6>'+
								'<p class="card-text">Price: '+r.price+' ETH </p></div>'+              
								'<div class="card-footer">'+'<small><b>Owner:</b> '+result+'<br><b>Approved:</b> '+res+'</small></div>' +
								'</div></div>';         
								} else {
									card='<div class="col-lg-3"><div class="card text-white bg-success">'+
									'<div class="card-header">'+ r.name+'</div>' +
									'<div class="card-body">'+
									'<h6 class="card-title">Asset # '+r.id+'</h6>'+
									'<p class="card-text">Price: '+r.price+' ETH </p></div>'+              
									'<div class="card-footer">'+'<small><b>Owner:</b> '+result+'<br><b>Approved:</b> '+res+'</small></div>' +
									'</div></div>'; 
								}
								
								   
							$('#assets').append(card);
							})  
						})
					})
			}

			jQuery('#get-all-certificates-balance').html(" Number of total tokens: " + length)
		  })
  },

  AppreciateREC:function(assetId,appreciationValue){
	App.contracts.vote.methods.appreciate(parseInt(assetId),parseInt(appreciationValue))
	.send({from:App.currentAccount[0]})
	.on('receipt',(r)=>{
		document.getElementById("get-certificate-page-name-value").value = '';
		document.getElementById("get-certificate-page-address-value").value = '';
		document.getElementById("get-certificate-page-quantity-value").value = '';
		document.getElementById("get-certificate-page-price-value").value  ='';
		
	//   handleGetCertificate();
	$('#submit-get-certificate').click();
	})
  },
  DepreciateREC:function(assetId,depreciationValue){
	App.contracts.vote.methods.depreciate(parseInt(assetId),parseInt(depreciationValue))
	.send({from:App.currentAccount[0]})
	.on('receipt',(r)=>{
		document.getElementById("get-certificate-page-name-value").value = '';
		document.getElementById("get-certificate-page-address-value").value = '';
		document.getElementById("get-certificate-page-quantity-value").value = '';
		document.getElementById("get-certificate-page-price-value").value  ='';
		// handleGetCertificate();
		$('#submit-get-certificate').click();
	})
  },
  
  handleGetCertificate: function () {
	console.log("button clicked");
	var idValue = $("#get-certificate-pageid-value").val();

	App.contracts.vote.methods.getCertificate(idValue).call({from:App.currentAccount[0]}).then((rec)=>{  
		document.getElementById("get-certificate-page-name-value").value = rec[1];
		document.getElementById("get-certificate-page-address-value").value = rec[4];
		document.getElementById("get-certificate-page-quantity-value").value = rec[2];
		document.getElementById("get-certificate-page-price-value").value = rec[3];
		toastr.info("Fetched the certificate with the given id", "", { "iconClass": 'toast-info notification0' });
	}).catch(function (err) {
        toastr["error"]("Transaction Failed!");
    });
  },

  handleGetCertificatesOfUser: function () {
	console.log("button clicked");
	$('#get-certificates-of-user-assets').empty();
	App.contracts.vote.methods.recCount().call().then((length)=>{        
			for(var i=0;i<length;i++){
				App.contracts.vote.methods.recs(i).call()
					.then((r)=>{
						App.contracts.vote.methods.ownerOf(r.id).call().then((result)=>{
							if (result.toLowerCase() == App.currentAccount[0]) {
							App.contracts.vote.methods.assetApprovals(r.id).call().then((res)=>{
								var card='';
								if(res==0){
								res='None'
								card='<div class="col-lg-3"><div class="card text-white bg-primary">'+
								'<div class="card-header">'+ r.name+'</div>' +
								'<div class="card-body">'+
								'<h6 class="card-title">Asset # '+r.id+'</h6>'+
								'<p class="card-text">Price: '+r.price+' ETH </p></div>'+              
								'<div class="card-footer">'+'<small><b>Owner:</b> '+result+'<br><b>Approved:</b> '+res+'</small></div>' +
								'</div></div>';         
								} else {
									card='<div class="col-lg-3"><div class="card text-white bg-success">'+
									'<div class="card-header">'+ r.name+'</div>' +
									'<div class="card-body">'+
									'<h6 class="card-title">Asset # '+r.id+'</h6>'+
									'<p class="card-text">Price: '+r.price+' ETH </p></div>'+              
									'<div class="card-footer">'+'<small><b>Owner:</b> '+result+'<br><b>Approved:</b> '+res+'</small></div>' +
									'</div></div>'; 
								}
								
								   
							$('#get-certificates-of-user-assets').append(card);
							})  
						}
						})
					})
			}
	
		  })
  },

  handleVerifyREC: async function () {
    console.log("button clicked");
    var idValue = $("#verify-rec-id-value").val();

      var option={from:App.currentAccount[0], gasLimit: "1000000"};
      App.contracts.vote.methods.verifyREC(idValue)
      .send(option)
        .on('receipt',(receipt)=>{
			if (receipt.status)
            toastr.info("REC has been verified", "", { "iconClass": 'toast-info notification0' });
          else
            toastr["error"]("Error in verifing the REC. Transaction Reverted!");
        })
      .on('transactionHash',(hash)=>{
        
      }).on('error',(e)=>{
        toastr["error"]("Transaction Failed!");
      })
  },

  handleSellREC: async function () {	
    console.log("button clicked");
    var idValue = $("#sell-rec-id-value").val();
	var toAddress = jQuery('#sell-rec-to_address').val()
	App.currentAccount = await ethereum.request({method: 'eth_accounts'});
      var option={from:App.currentAccount[0], gasLimit: "1000000"};
      App.contracts.vote.methods.approve(toAddress,parseInt(idValue))
      .send(option)
        .on('receipt',(receipt)=>{
			console.log(receipt)
		  
        })
      .on('transactionHash',(hash)=>{
        if (hash) {
            toastr.info("REC has been sent to Buyer", "", { "iconClass": 'toast-info notification0' });
			location.reload()
      		App.handleGetAllCertificates();
		  }else
            toastr["error"]("Error in selling the REC. Transaction Reverted!");
      }).on('error',(e)=>{
        console.log(e)
      })
  },
  
  handleBuyREC: async function () {
	App.currentAccount = await ethereum.request({method: 'eth_accounts'});
    console.log("button clicked");
    var assetId = $("#buy-rec-id-value").val();
	var fromAddress = jQuery('#from_address').val()

	App.contracts.vote.methods.recs(assetId)
      .call()
      .then((r)=>{
        console.log(r);
        var option= r.price.toString();
        assetId=parseInt(assetId);
        App.contracts.vote.methods.transferFrom(fromAddress,assetId)
        .send({from:App.currentAccount[0],value: Web3.utils.toWei(option)})
        .on('receipt',(receipt)=>{
          console.log(receipt)
        })
        .on('transactionHash',(hash)=>{
			if (hash) {
				toastr.info("REC has been bought", "", { "iconClass": 'toast-info notification0' });
				location.reload()
				  App.handleGetAllCertificates();
			  }else
			  	toastr["error"]("Error in buying the REC. Transaction Reverted!");          
        }).on('error',(e)=>{
          console.log(e)
		  toastr["error"]("Transaction Failed!");

        })
      })
  },  
  
  handleTopUpBalance: function () {
    console.log("button clicked");
    var priceValue = $("#top-up-price-value").val();
    App.contracts.vote.methods.topupBalance().send({from:App.currentAccount[0], value: priceValue})
	.on('receipt',(receipt)=>{
        if (receipt) {
          if (receipt.status)
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
