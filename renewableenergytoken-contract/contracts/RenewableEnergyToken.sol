// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RenewableEnergyToken is ERC721 {
    
    address owner;
    
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
        uint price;
        Status status;
    }

    uint public recCount;
    mapping(uint => REC) recs;
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
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "Only registered users can call this");
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
			return "none";
		}
	}

    //ERC721 methods
    /*
    function ownerOf(uint256 assetId) public view returns (address) {
        address owner = recOwner[assetId];
        require(owner != address(0), "NoAssetExists");
        return owner;
    }
    
    function transferFrom(address payable from, uint256 recId) public payable {
        require(isApprovedOrOwner(msg.sender, recId), "NotAnApprovedOwner");
        require(ownerOf(rectId) == from, "NotTheassetOwner");
        clearApproval(recId,getApproved(recId));
        ownedAssetsCount[from]--;
        ownedAssetsCount[msg.sender]++;
        assetOwner[assetId] = msg.sender;
        from.transfer(assetMap[recId].price * 1000000000000000000);
        emit Transfer(from, msg.sender, recId);
    }

    function approve(address to,uint256 assetId) public {
        address owner = ownerOf(assetId);
        require(to != owner, "CurrentOwnerApproval");
        require(msg.sender == owner,"NotTheAssetOwner");
        assetApprovals[assetId] = to;
        emit Approval(owner, to, assetId);
    }

    function getApproved(uint256 assetId) public view returns (address) {
        require(exists(assetId), "ERC721: approved query for nonexistent token");
        return assetApprovals[assetId];
    }
    */

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
    function generateREC(string memory name, uint quantity, uint price, address sellerAddress) public onlyDistributor payable {
        require(bytes(name).length > 0 && quantity > 0 && price > 0 && sellerAddress!=address(0), "Invalid input parameters");

        recs[recCount] =  REC(recCount, name, quantity, price, Status.Available);
        
        mint(sellerAddress,recCount);
        recCount = recCount+1;
    }

    /*
    function getCertificatesOfUser() public view onlyRegistered returns (REC[] memory) {
        return users[msg.sender].certificates;
    }

    function getAllCertificates() public view onlyRegistered returns (REC[] memory) {
        uint totalCertificates;
        for (uint i = 0; i < addressList.length; i++) {
            totalCertificates += users[addressList[i]].certificates.length;
        }

        REC[] memory allCertificates = new REC[](totalCertificates);
        uint currentIndex = 0;
        for (uint i = 0; i < addressList.length; i++) {
            REC[] memory userCertificates = users[addressList[i]].certificates;
            for (uint j = 0; j < userCertificates.length; j++) {
                allCertificates[currentIndex] = userCertificates[j];
                currentIndex++;
            }
        }

        return allCertificates;
    }

    function getCertificate(string memory id) public view onlyRegistered returns (string memory, string memory, uint, uint, address, Status) {
        REC memory rec = recs[id];
        return (id, rec.name, rec.quantity, rec.price, rec.status);
    }
    */

    function verifyREC(uint id) public view onlyRegistered returns (bool) {
        require(id>=0, "Invalid input parameter");

        REC storage rec = recs[id];
        require(id<recCount, "REC not found");

        User storage user = users[msg.sender];
        require(user.balance >= rec.price, "Insufficient balance");
        return true;
    }


    function buyREC(uint id) public onlyRegistered payable {
        REC storage rec = recs[id];
        require(id>=0 && id<recCount, "REC not found");
        require(rec.status == Status.Available, "REC not available for purchase");

        User storage buyer = users[msg.sender];
        require(buyer.balance >= rec.price, "Insufficient balance");

        User storage seller = users[recOwner[id]];
        seller.balance += rec.price;

        buyer.balance -= rec.price;
        buyer.certificates.push(rec);
        rec.status = Status.Sold;
        recOwner[id] = msg.sender;
    }

    function sellREC(uint id, uint price) public onlyRegistered {
        REC storage rec = recs[id];
        require(id>=0 && id<recCount, "REC not found");
        require(rec.status == Status.Available, "Cannot update price for sold REC");
        require(recOwner[id] == address(0) || recOwner[id] == msg.sender, "Only seller can update price");

        rec.price = price;
        recOwner[id] = msg.sender;
        rec.status = Status.Available;
    }

    function approveDistributor(address userAddress) public onlyOwner {
        User storage user = users[userAddress];
        require(bytes(user.id).length > 0, "User not found");
        require(!user.isRegistered, "User is already Distributor");

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
        user.balance = 0; 
        user.isDistributor = false;
        addressList.push((userAddress));
    }

    function topupBalance() public onlyRegistered payable {
        User storage user = users[msg.sender];
        require(bytes(user.id).length != 0, "User not registered");
        require(msg.value >= 0, "Invalid balance");

        user.balance += msg.value;
    }
}