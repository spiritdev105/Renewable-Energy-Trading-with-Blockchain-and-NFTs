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
        string id;
        string name;
        uint quantity;
        uint price;
        address sellerAddress;
        Status status;
    }

    address[]  addressList;
    
    enum Status {Available, Sold}
    
    mapping(address => User) users;
    mapping(string => REC) recs;

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
        require(users[msg.sender].isDistributor, "Only distributor can call this");
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
        return (rec.id, rec.name, rec.quantity, rec.price, rec.sellerAddress, rec.status);
    }

    function generateREC(string memory id, string memory name, uint quantity, uint price, address sellerAddress) public onlyDistributor {
        require(bytes(id).length > 0 && bytes(name).length > 0 && quantity > 0 && price > 0 && (sellerAddress) != address(0), "Invalid input parameters");

        REC memory rec = REC(id, name, quantity, price, sellerAddress, Status.Available);
        recs[id] = rec;
    }

    function verifyREC(string memory id) public view onlyRegistered returns (bool) {
        require(bytes(id).length > 0, "Invalid input parameter");

        REC storage rec = recs[id];
        require(bytes(rec.id).length > 0, "REC not found");

        User storage user = users[msg.sender];
        require(user.balance >= rec.price, "Insufficient balance");
        return true;
    }


    function buyREC(string memory id) public onlyRegistered payable {
        REC storage rec = recs[id];
        require(bytes(rec.id).length > 0, "REC not found");
        require(rec.status == Status.Available, "REC not available for purchase");

        User storage buyer = users[msg.sender];
        require(buyer.balance >= rec.price, "Insufficient balance");

        User storage seller = users[rec.sellerAddress];
        seller.balance += rec.price;

        buyer.balance -= rec.price;
        buyer.certificates.push(rec);
        rec.status = Status.Sold;
        rec.sellerAddress = msg.sender;
    }

    function sellREC(string memory id, uint price) public onlyRegistered {
        REC storage rec = recs[id];
        require(bytes(rec.id).length > 0, "REC not found");
        require(rec.status == Status.Available, "Cannot update price for sold REC");
        require(rec.sellerAddress == address(0) || rec.sellerAddress == msg.sender, "Only seller can update price");

        rec.price = price;
        rec.sellerAddress = msg.sender;
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
