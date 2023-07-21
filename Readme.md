
Renewable Energy Trading with Blockchain and NFTs

**Team Members:**

1. Sandeep Kunusoth - <skunusot@buffalo.edu> -  50465621
1. Ashwin Ashok – <aashok3@buffalo.edu> - 50478913

**Abstract:**

The following possible problems with conventional ways of selling renewable energy certificates (RECs) might reduce their efficacy in encouraging renewable energy:

1. Lack of market transparency: One problem with conventional REC sales is the lack of market openness. It might be challenging for purchasers to confirm the legitimacy and caliber of the RECs they are buying. This may result in a lack of faith and trust in the system, which may eventually deter customers from taking part.
1. Restricted geographic reach: Conventional REC sales frequently concentrate on particular geographic areas, which may restrict the market for renewable energy. Due to this, accessing RECs may be challenging for purchasers in regions with weak renewable energy markets.
1. Absence of standardization: The issuance and tracking of RECs are not yet standardized. This might make it challenging for purchasers to compare various RECs and assess how well they promote renewable energy.

The market for renewable energy is expanding quickly, and Renewable Energy Certificates (RECs) are a crucial instrument for businesses and utilities to satisfy their objectives for renewable energy and legal obligations. Unfortunately, the existing tracking and trading mechanism for RECs is convoluted and vulnerable to fraud, which might damage the market's credibility and transparency. With the help of blockchain technology and smart contracts, this project suggests using Non-Fungible Tokens (NFTs) as a more efficient, transparent, and safe way to track and exchange RECs. By doing so, the market's liquidity may improve, and transaction costs may be decreased.

**Digital Asset, Tokenization and Reasoning:**

Digital Asset: Renewable Energy Certificate (REC)

Tokenization: ERC721 ethereum token standard

Reasoning: ERC721: ERC721 is a non-fungible token standard on the Ethereum network. Unlike ERC20 tokens, each ERC721 token is unique and cannot be replaced by another token. This makes ERC721 tokens suitable for applications such as digital collectibles, gaming items, and other assets that have unique properties. ERC721 tokens are often used to represent assets that have real-world value and can be traded in digital marketplaces.


**Use Case diagram:**

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.001.png)











**ER Diagram:**

![Diagram

Description automatically generated with medium confidence](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.002.png)

**Contract diagram:**

![Graphical user interface, text, application

Description automatically generated](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.003.png)

**UI Wireframe:**

` `![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.004.png)

Homepage: The main page of the DApp which will be available for an end user

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.005.png)

The webpage when the user is logged in as Distributor

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.006.png)

Webpage is shown as above when user is logged in as Normal user role.










**Sequence Diagram:**

![Diagram, engineering drawing

Description automatically generated](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.007.png)

1. The Owner of the smart contract deploys the contract for the users to interact with the contract.
1. The users register to interact with the contract. (SelfRegister)
1. The owner then approves a user to act as a distributor (Approve Distributor)
1. All other users are approved by the distributor to become a registered user (ApproveUser)
1. The distributor can create REC (GenerateREC)
1. Any registered user can query to get all certificates, get a particular certificate and get certificates of user. (GetAllCertificates, GetCertificate, GetCertificateofUser)
1. The registered users can verify, sell or buy tokens. (VerifyREC, SellREC, BuyREC)
1. The distributor has the permission to appreciate or depreciate the value of the tokens (Appreciate/Depreciate)
1. Here, the owner can perform all the operations that any registered user can.








**Architecture Diagram:**

![Diagram, schematic

Description automatically generated](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.008.png)

1. The owner deploys the smart contract and Dapp to a server (here, localhost)
1. The users will register themselves to the application with the wallet.
1. The owner approves the distributor and the distributor approved all the users who have registered
1. The actors then interact with the contract through the UI where the App.js file clues the front-end with the smart contract with the functions available for its role
1. The server code (app.js) interacts with the offchain data to fetch the more details of the users/certificates and populate the UI with the tokens

**OffChain/OnChain Data:**

The Users will fetch offchain data like user details like username, certificate details like quantity, certificatename from external datasource by using identifiers fetched from blockchain like certificateId, userAddress. The external datasource contains mapping from userAddress to userDetails and  certificateId to certificateDetails.

**Aprecciation/ Depreciation of Assets:**

Renewable energy certificates (RECs) can appreciate or depreciate in value based on various factors, including market demand, renewable energy generation levels, regulatory changes, and public perception. Distributors can appreciate, depreciate certificate value based on these factors.

**Steps of deployment:**

1. **Tools:** Install the required tools for the development of the Dapp: solidity, node, truffle, javascript, Ganache, digital wallet (ex: Metamask), 
1. **Develop:** First, you need to develop and test your smart contract in remix to ensure it functions properly and developing the front-end interface and integrating any necessary third-party tools or services.
1. **Test framework:** Choose a test Blockchain test platform. Once the dapp is ready, choose Ganache test platform to deploy and test.
1. Install npm packages in both folders **renewableenergytoken-app** and **renewableenergytoken-contract** like below.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.009.png)

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.010.png)

1. **Contract deployment by executing truffle migrate –reset in** renewableenergytoken-**contract folder:**

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.011.png)

1. **Running Application by executing npm run start in** renewableenergytoken-**app folder:**

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.012.png)

**Working:**

We have attached the working screenshots attached below.

Initial view as viewed by the Owner:

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.013.png)

Self register Flow for Distributor, Seller, Buyer:

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.014.png)

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.015.png)

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.016.png)

After all users self register, request is sent to owner, distributor for approval. All users will not be able to perform any actions until owner or distributor approves their reqquest. They will see screen as below.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.017.png)

Owner Approving Distributor:

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.018.png)

Distributor approving Seller and buyer:

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.019.png)

Distributor will be able to generate Renewable energy certificate:

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.020.png)

Seller view of Get certificates of user where he can see the certificates of him assigned by the distributor. Certificates contain information about asset name, id, owner and approved buyer addresses.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.021.png)

By using Sell Renewable Energy Certificate functionality Seller will be able to make Buyer approved Buyer to Asset 0 as shown below.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.022.png)

After above transaction, buyer can buy asset 0 as buyer address is approved by seller of asset 0.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.023.png)

Buyer can use Buy Renewable Energy Certificate page to buy certificate from seller as shown below.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.024.png)

After Buyer buys Asset 0, owner id of asset 0 will be changed to address of buyer as shown below.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.025.png)

Buyer can verify certificate by using very certificate page.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.026.png)

Distributor can appreciate/ depreciate value of asset by using appreciate depreciate certificate page.

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.027.png)

Screenshot of NFT in Metamask wallet:

![](images/Aspose.Words.2b1e9bb5-cab4-44c8-9801-672f7d81368b.028.png)


**References:**

1. “Blockchain In Action” Textbook – Chapters 1 - 4
1. [Renewable Energy Certificates (RECs) | US UPA](https://www.epa.gov/green-power-markets/renewable-energy-certificates-recs)
1. [ERC721 vs ERC1155](https://101blockchains.com/erc-1155-vs-erc-721/)
1. [Openzepplin ERC721](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721)
