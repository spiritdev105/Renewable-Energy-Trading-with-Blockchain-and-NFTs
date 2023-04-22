App = {
  web3:null,
  contracts: {},
  names: new Array(),
  url:'http://localhost:7545',
  currentAccount:null,
  transaction:0,
  flag:false,
  receiver:'',
  sender:'',
  web3Provider:null,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      App.web3 = new Web3(web3.currentProvider);
    } else {
      // If no injected web3 instance is detected, fallback to Ganache CLI.
      App.web3Provider = new web3.providers.HttpProvider(App.url);
      App.web3 = new Web3(App.web3Provider);
    }
    ethereum.enable();
    App.populateAddress();
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('SimplePaymentChannel.json', function(data) {
          App.contracts.Payment = TruffleContract(data);
          App.contracts.Payment.setProvider(App.web3Provider);
          return App.bindEvents();
      });
  },
  bindEvents: function() {
      $(document).on('click', '#sign', function(){
          App.handleSignature(jQuery('#receiver').val(),jQuery('#amount').val());
      });
      $(document).on('click', '#transfer', function(){
        App.handleTransfer(jQuery('#receiveramount').val(),jQuery('#signedMessage').val());
      });
  },

  populateAddress : function(){ 
      jQuery('#current_account').text(App.web3.eth.defaultAccount);
      App.web3.eth.getBalance(web3.eth.defaultAccount, function(error, result){
        if(!error){
          jQuery('#current_balance').text(web3.fromWei(result),"ether");
        }
        else{
          console.error(error);
        }
      }); 
      new Web3(new Web3.providers.HttpProvider(App.url)).eth.getAccounts((err, accounts) => {
        App.receiver=accounts[1];
        jQuery('#receiver').val(App.receiver);
      });
  },

  handleSignature:function(receiver,amount){
      var amount=parseFloat(amount)
      if(receiver!=App.receiver){
        alert('Error in reciever addreess')
        return false;
      }
      if(amount<=0){
        alert('Please correct the amount value');
        return false;
      }
      App.contracts.Payment.deployed().then((instance)=>{
        App.signMessage(App.constructPaymentMessage(instance.address, amount),amount);
      });
  },

  constructPaymentMessage:function(contractAddress, amount) {
    return ethereumjs.ABI.soliditySHA3(["address", "uint256"],[contractAddress, amount]);
  },

  signMessage:function (message,amount) {
    web3.personal.sign( "0x" + message.toString("hex"), App.web3.eth.defaultAccount, function(err, signature) {
      if(!err)
      {
        var box='<div class="check">'+
                '<span class="amount">'+amount+' Wei </span>'+
                '<p class="signature">'+signature+'</p>'+
              '</div>';
        // var text="<b>Signature: </b>"+signature;
        jQuery('#allchecks').append(box); 
      } 
      else{
        console.log(err)
      }
    });
  },

  handleTransfer:function(amount,signature){
    var amount=parseFloat(amount)
    App.contracts.Payment.deployed().then((instance)=>{
        return instance.close(amount,signature,{gas: 200000});
    }).then((result)=>{
      if(result){
        console.log(result);
        if(parseInt(result.receipt.status) == 1){
          toastr.success("Funds are transferred to your account");
          App.web3.eth.getBalance(web3.eth.defaultAccount, function(error, result){
            if(!error){
              jQuery('#current_balance').text(web3.fromWei(result),"ether");
            }
            else{
            console.error(error);
            }
          });
        }else{
          toastr["error"]("Error in transfer");
        }
      }
    }).catch((err)=>{
        if(err.message.indexOf('Signature')!=-1){
          toastr["error"]("Error: Not a valid Signature");
          return false;
        }else if(err.message.indexOf('recipient')!=-1){
          toastr["error"]("Error: Not an intended recipient");
          return false;
        }else if(err.message.indexOf('Insufficient')!=-1){
          toastr["error"]("Error: Insufficient funds");
          return false;
        }
    })
  }
};
$(function() {
  $(window).load(function() {
    App.init();
    toastr.options = {
      "showDuration": "1000",
      "positionClass": "toast-top-left",
      "preventDuplicates": true,
      "closeButton": true
  };
  });
});
