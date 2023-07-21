
Renewable Energy Trading with Blockchain and NFTs

**Team Members:**

1. Sandeep Kunusoth - <skunusot@buffalo.edu> -  50465621
1. Ashwin Ashok – <aashok3@buffalo.edu> – 50478913

**Phase1:**

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

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.001.png)











**ER Diagram:**

![Diagram

Description automatically generated with medium confidence](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.002.png)

**Contract diagram:**

![Graphical user interface, text, application

Description automatically generated](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.003.png)

**UI Wireframe:**

` `![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.004.png)

Homepage: The main page of the DApp which will be available for an end user

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.005.png)

The webpage when the user is logged in as Distributor

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.006.png)

Webpage is shown as above when user is logged in as Normal user role.











**Phase 2:**

**Sequence Diagram:**

![Diagram, engineering drawing

Description automatically generated](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.007.png)

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

Description automatically generated](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.008.png)

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
1. **Develop:** First, you need to develop and test the smart contract in remix to ensure it functions properly and developing the front-end interface and integrating any necessary third-party tools or services.
1. **Test framework:** Choose a test Blockchain test platform. Once the dapp is ready, choose Ganache test platform to deploy and test.
1. Install npm packages in both folders **renewableenergytoken-app** and **renewableenergytoken-contract** like below.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.009.png)

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.010.png)

1. **Contract deployment by executing truffle migrate –reset in** renewableenergytoken-**contract folder:**

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.011.png)

1. **Running Application by executing npm run start in** renewableenergytoken-**app folder:**

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.012.png)

**Working:**

We have attached the working screenshots attached below.

Initial view as viewed by the Owner:

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.013.png)

Self register Flow for Distributor, Seller, Buyer:

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.014.png)

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.015.png)

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.016.png)

After all users self register, request is sent to owner, distributor for approval. All users will not be able to perform any actions until owner or distributor approves their reqquest. They will see screen as below.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.017.png)

Owner Approving Distributor:

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.018.png)

Distributor approving Seller and buyer:

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.019.png)

Distributor will be able to generate Renewable energy certificate:

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.020.png)

Seller view of Get certificates of user where he can see the certificates of him assigned by the distributor. Certificates contain information about asset name, id, owner and approved buyer addresses.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.021.png)

By using Sell Renewable Energy Certificate functionality Seller will be able to make Buyer approved Buyer to Asset 0 as shown below.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.022.png)

After above transaction, buyer can buy asset 0 as buyer address is approved by seller of asset 0.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.023.png)

Buyer can use Buy Renewable Energy Certificate page to buy certificate from seller as shown below.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.024.png)

After Buyer buys Asset 0, owner id of asset 0 will be changed to address of buyer as shown below.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.025.png)

Buyer can verify certificate by using very certificate page.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.026.png)

Distributor can appreciate/ depreciate value of asset by using appreciate depreciate certificate page.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.027.png)

Screenshot of NFT in Metamask wallet:

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.028.png)




**Phase 3:**

**Contract and Dapp deployment:**

We will be using truffle using in the previous phase to deploy the contract,

(We make sure to have truffle installed properly and have enough ethers in the digital wallet to deploy the contract

**Steps to deploy the Smart Contract on Infura (blockchain as a node service):**

1. We create an Ethereum project and get a API Key on Infura

1. We install hdwallet-provider

Run the following command to install hdwallet-provider:

**npm install @truffle/hdwallet-provider**

1. Updated t**ruffle-config.js** file in the **renewableenergytoken-contract** folder
   1. We add an import and the following constants to the file

**const HDWalletProvider = require('@truffle/hdwallet-provider');**

**INFURA\_API\_KEY = "https://sepolia.infura.io/v3/< API-Key>"**

**MNEMONIC = "<The-MetaMask-Secret-Recovery-Phrase>"**

1. We add the network to where we deploy, here we deploed on Sepolia network

**module.exports = {**

**networks: {**

**development: {**

**host: "127.0.0.1",**

**port: 8545,**

**network\_id: "\*"**

**},**

**sepolia: {**

**provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`),**

`      	`**network\_id: 11155111,	// sepolia's network id**

`      	`**confirmations: 2,**

`     	`**timeoutBlocks: 200,**

`      	`**skipDryRun: true**

**}**

**}**

**};**

1. Compile and deploying the smart contract: 
   1. Compiling the smart contract:

Run **truffle compile** command from the **renewableenergytoken-contract** folder

1. Deploying the smart contract:

Execute **truffle migrate –network sepolia** command to deploy the smart contract on the blockchain

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.029.png)

We get the **deployed smart contract address** in the output when the command executed successfully.

1. We update **app.js** file in the **renewableenergytoken-app** folder

The app parameter **url, address** are to be updated with the smart contract address and url is set to the network endpoint

**address: '<smart contract address>',**

**url: 'https://sepolia.infura.io/v3/<infura-key>',**


**Steps to deploy the Dapp on Render (Cloud application):**

1. Create a Render account: First, you need to create a Render account by going to <https://dashboard.render.com/signup>. Once you create an account, log in to Render.

1. Create a new service: In the Render dashboard, click on the "Create a New Service" button. Choose the appropriate language or framework that you want to use to create the web service.

1. Configure the service: After selecting language or framework, need to configure the service. Provide a name for the service and choose the deployment environment. Specify the amount of CPU, memory, and disk space you want to allocate to the service.
1. Set up the code: Next, you need to set up the code. You can either upload the code or connect to a Git repository. If you're uploading the code, you can do so by dragging and dropping the files into the Render dashboard. If you're connecting to a Git repository, you can provide the repository URL and the branch you want to deploy.
1. Deploy the service: Once you've configured everything, you can deploy the service by clicking on the "Create Service" button. Render will start building and deploying the service.

1. Test the service: Once the service is deployed, test it by accessing the URL provided in the Render dashboard. You can also use the Render Logs to see any errors or issues with the service.

![](images/Aspose.Words.f5550671-dc66-4a82-8cdd-71a15f6a57b9.030.png)

**The address of the Renewable Energy Token Application** - [Renewable Energy Token Dapp](https://renewable-energy-j745.onrender.com/)

**References:**

1. “Blockchain In Action” Textbook –
   1. ` `Chapters 1 - 4 for Smart Contract
   1. Chapters 5 – 9 for Decentralized Application Development
1. [Renewable Energy Certificates (RECs) | US UPA](https://www.epa.gov/green-power-markets/renewable-energy-certificates-recs)
1. [ERC721 vs ERC1155](https://101blockchains.com/erc-1155-vs-erc-721/)
1. [Openzepplin ERC721](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721)

