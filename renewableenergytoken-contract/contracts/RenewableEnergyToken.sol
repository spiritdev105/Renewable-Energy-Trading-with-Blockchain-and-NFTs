// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RenewableEnergyToken is ERC721 {
    
    address public owner;
    
    struct User {
        string id;
        string name;
        uint balance;
        REC[] certificates;
        bool isDistributor;
        bool isRegistered;
    }
    
    struct REC {
        uint id;
        string name;
        uint quantity;
        uint256 price;
        Status status;
    }

    uint public recCount;
    mapping(uint => REC) public recs;
    mapping(uint => address) private recOwner;
    mapping (address => uint256) private ownedAssetsCount;    
    mapping (uint256 => address) public assetApprovals;

    address[]  addressList;
    
    enum Status {Available, Sold}
    
    mapping(address => User) users;

    //Events
    //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    //event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    constructor() ERC721("RenewableEnergyToken", "RET") {
        owner = msg.sender;
		addressList.push(owner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier onlyRegistered() {
        require(msg.sender == owner || users[msg.sender].isRegistered, "Only registered users can call this");
        _;
    }

    modifier onlyDistributor() {
        require(msg.sender == owner || users[msg.sender].isDistributor, "Only distributor can call this");
        _;
    }

	function getUserRole(address user) public view returns (string memory) {
		if (user == owner) {
			return "owner";
		} else if (users[user].isDistributor) {
			return "distributor";
		} else if (users[user].isRegistered) {
			return "registered";
		} else {
			 User storage userObj = users[user];
			if (bytes(userObj.id).length > 0)
				return "not yet verified";
			else 
				return "none";
			}
	}

    //ERC721 methods

	function balanceOf() public view returns (uint256)  {
        require(msg.sender != address(0), "ERC721: balance query for the zero address");

        return ownedAssetsCount[msg.sender];
    }
    
     function ownerOf(uint256 assetId) public view override returns (address) {
         address owner = recOwner[assetId];
         require(owner != address(0), "NoAssetExists");
         return owner;
     }
    
	function appreciate(uint256 assetId,uint256 value) public onlyDistributor{
        recs[assetId].price = recs[assetId].price + value;
    }
    
	function depreciate(uint256 assetId,uint256 value) public onlyDistributor{
        recs[assetId].price = recs[assetId].price - value;
    }
    
    function transferFrom(address payable from, uint256 recId) public payable{
        require(isApprovedOrOwner(msg.sender, recId), "NotAnApprovedOwner");
        require(ownerOf(recId) == from, "NotTheassetOwner");
        clearApproval(recId,getApproved(recId));
        ownedAssetsCount[from]--;
        ownedAssetsCount[msg.sender]++;
        recOwner[recId] = msg.sender;
		from.transfer(msg.value);
        emit Transfer(from, msg.sender, recId);
    }

    function approve(address to,uint256 assetId) public override {
        address owner = ownerOf(assetId);
        require(to != owner, "CurrentOwnerApproval");
        require(msg.sender == owner,"NotTheAssetOwner");
        assetApprovals[assetId] = to;
        emit Approval(owner, to, assetId);
    }

    function getApproved(uint256 assetId) public view override returns (address) {
        require(exists(assetId), "ERC721: approved query for nonexistent token");
        return assetApprovals[assetId];
    }
    
	function clearApproval(uint256 assetId,address approved) public {
        if (assetApprovals[assetId]==approved){
            assetApprovals[assetId] = address(0);
        }
    }

    // Function used internally by other methods
    function mint(address to, uint256 recId) internal {
        require(to != address(0), "ZeroAddressMiniting");
        require(!exists(recId), "AlreadyMinted");
        recOwner[recId] = to;
        ownedAssetsCount[to]++;
        emit Transfer(address(0), to, recId);
    }

    function exists(uint256 assetId) internal view returns (bool) {
        return recOwner[assetId] != address(0);
    }

    function isApprovedOrOwner(address spender, uint256 assetId) internal view returns (bool) {
        require(exists(assetId), "ERC721: operator query for nonexistent token");
        address owner = ownerOf(assetId);
        return (spender == owner || getApproved(assetId) == spender);
    }

    //REC functions
    function generateREC(string memory name, uint quantity, address sellerAddress) public onlyDistributor payable {
        require(bytes(name).length > 0 && quantity > 0 && msg.value > 0 && sellerAddress!=address(0), "Invalid input parameters");

        recs[recCount] =  REC(recCount, name, quantity, msg.value, Status.Available);
        
        mint(sellerAddress,recCount);
        recCount = recCount+1;
    }

	function getAddressList() public view returns (address[] memory) {
        return addressList;
    }

	function getCertificate(uint id) public view onlyRegistered returns (uint, string memory, uint, uint,address, Status) {
        REC memory rec = recs[id];
        return (id, rec.name, rec.quantity, rec.price, recOwner[id], rec.status);
    }

    function verifyREC(uint id) public view onlyRegistered returns (bool) {
        require(id>=0, "Invalid input parameter");

        REC storage rec = recs[id];
        require(id<recCount, "REC not found");

        User storage user = users[msg.sender];
        require(address(this).balance >= rec.price, "Insufficient balance");
        return true;
    }

    function approveDistributor(address userAddress) public onlyOwner {
        User storage user = users[userAddress];
        require(bytes(user.id).length > 0, "User not found");
        require(!user.isDistributor, "User is already Distributor");

        user.isDistributor = true;
        user.isRegistered = true;
    }

    function approveUser(address userAddress) public onlyDistributor {
        User storage user = users[userAddress];
        require(bytes(user.id).length > 0, "User not found");
        require(!user.isRegistered, "User is already Registered");

        user.isRegistered = true;
    }

    function selfRegister(string memory id, string memory name, address userAddress) public {
        require(bytes(id).length > 0 && bytes(name).length > 0, "Invalid input parameters");

        User storage user = users[msg.sender];
        require(bytes(user.id).length == 0, "User already registered");

        user.id = id;
        user.name = name;
        user.balance = address(this).balance; 
        user.isDistributor = false;
		user.isRegistered = false;
        addressList.push((userAddress));
    }

    function topupBalance() public onlyRegistered payable {
        User storage user = users[msg.sender];
        require(bytes(user.id).length != 0, "User not registered");
        require(msg.value >= 0, "Invalid balance");

        user.balance += msg.value;
    }
}