let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

// connect metamask with dapp
async function connectmetamask() {
  // metamask requires reqesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  console.log("Account address: ", await signer.getAddress());
  checkWallet_showNft();
}

const NFTMarketplaceaddr = "0x14ae5Db1dcC3E045f57EdC5309652442CF46ca4A";

const NFTMarketplaceABI = ["function num() view returns(uint)", "function ListItem(uint price ,uint tokenId) public payable"];

const NFTMarketplaceABIjson = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "BuyNft",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "CancelListing",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ListItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tribeG",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    name: "idMarketItemCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_listingPrice",
        type: "uint256",
      },
    ],
    name: "updateListingPrice",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "_itemsSold",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_tokenIds",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchItemsListed",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarketplace.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMarketItem",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarketplace.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListingPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idMarketItem",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "num",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

// async function check() {
//   const NFTMarketplace = new ethers.Contract(NFTMarketplaceaddr, NFTMarketplaceABI, provider);

//   let listingp = await NFTMarketplace.num();

//   console.log(listingp.toString());
// }

const NFTcontractaddress = "0x04c75A4FD5782AD1fDc4DD30045D853A6BBB0dcC";
const NFTABI = [
  "function approve(address to, uint256 tokenId) public",
  "function maxSupply() view returns(uint)",
  "function getApproved(uint256 tokenId) public view  returns(address)",
  "function walletOfOwner(address _owner) public view returns (uint256[] memory)",
];

async function checkWallet_showNft() {
  console.log(1);
  const NFTcontract = new ethers.Contract(NFTcontractaddress, NFTABI, provider);
  accountaddr = await signer.getAddress();
  let nftlist = await NFTcontract.walletOfOwner(accountaddr);
  let nftarray = [];
  for (let i = 0; i < nftlist.length; i++) {
    nftarray[i] = nftlist[i].toString();
  }

  for (let k = 0; k < nftarray.length; k++) {
    let l = nftarray[k];
    let imagesrc = `https://ipfs.io/ipfs/QmPYoQKxGggEtqJHGsjyYMzmuv52iAChiaEbdQAD5Guea7/${l}.png`;

    let metad1 = await fetch(`https://ipfs.io/ipfs/QmXbytg8btknFrnGUnTpTQdtwQ786cBa7vPPYotxPGm1J8/${l}.json`);
    let metad2 = await metad1.json();

    const e = document.createElement("div");
    e.setAttribute("id", `div${l}`);

    e.style.width = "300px";
    e.style.height = "400px";

    let x = document.createElement("img");

    x.setAttribute("src", imagesrc);
    x.setAttribute("width", "200");
    x.setAttribute("height", "200");
    e.appendChild(x);

    let tbl = document.createElement("table");
    tbl.style.fontSize = ".5em";
    // tbl.style.position = "fixed";
    tbl.style.top = "25px";
    tbl.style.left = "50px";

    let tr1 = document.createElement("tr");
    let tr2 = document.createElement("tr");
    let tr3 = document.createElement("tr");
    let tr4 = document.createElement("tr");
    let tr5 = document.createElement("tr");
    let tr6 = document.createElement("tr");
    let tdattribute1 = document.createElement("td");
    let tdattribute2 = document.createElement("td");
    let tdattribute3 = document.createElement("td");
    let tdattribute4 = document.createElement("td");
    let tdattribute5 = document.createElement("td");
    let tdattribute6 = document.createElement("td");
    let tdv1 = document.createElement("td");
    let tdv2 = document.createElement("td");
    let tdv3 = document.createElement("td");
    let tdv4 = document.createElement("td");
    let tdv5 = document.createElement("td");
    let tdv6 = document.createElement("td");
    tdattribute1.innerHTML = "Name";
    tdattribute2.innerHTML = "Description";
    tdattribute3.innerHTML = "Background";
    tdattribute4.innerHTML = "Head";
    tdattribute5.innerHTML = "Neck";
    tdattribute6.innerHTML = "Token Id";
    tdv1.innerHTML = metad2.name;
    tdv2.innerHTML = metad2.description;
    tdv3.innerHTML = metad2.attributes[0].value;
    tdv4.innerHTML = metad2.attributes[1].value;
    tdv5.innerHTML = metad2.attributes[2].value;
    tdv6.innerHTML = l;

    tr1.appendChild(tdattribute1);
    tr1.appendChild(tdv1);

    tr2.appendChild(tdattribute2);
    tr2.appendChild(tdv2);

    tr3.appendChild(tdattribute3);
    tr3.appendChild(tdv3);

    tr4.appendChild(tdattribute4);
    tr4.appendChild(tdv4);

    tr5.appendChild(tdattribute5);
    tr5.appendChild(tdv5);

    tr6.appendChild(tdattribute6);
    tr6.appendChild(tdv6);

    tbl.appendChild(tr6);
    tbl.appendChild(tr1);
    tbl.appendChild(tr2);
    tbl.appendChild(tr3);
    tbl.appendChild(tr4);
    tbl.appendChild(tr5);

    e.appendChild(tbl);
    // let bt = document.createElement("button");

    // bt.style.position = "relative";
    // bt.style.top = "30px";
    // bt.style.left = "100px";

    // bt.innerHTML = "List on Marketplace";
    // e.appendChild(bt);

    // document.body.appendChild(e);
    let y = document.getElementById("div2");
    y.appendChild(e);

    //let metad1 = await fetch("https://ipfs.io/ipfs/QmXbytg8btknFrnGUnTpTQdtwQ786cBa7vPPYotxPGm1J8/1.json");
  }
}

let id;
async function approve() {
  const NFTcontract = new ethers.Contract(NFTcontractaddress, NFTABI, provider);
  id = document.getElementById("input1").value;

  let tx = await NFTcontract.connect(signer).approve("0x14ae5Db1dcC3E045f57EdC5309652442CF46ca4A", id);

  console.log(tx);
}

// async function checkapprove() {
//   const NFTcontract = new ethers.Contract(NFTcontractaddress, NFTABI, provider);
//   const yas = await NFTcontract.maxSupply();
//   let addr = await NFTcontract.getApproved(1);
//   console.log(yas.toString());
//   console.log(addr);
// }

async function listing() {
  const NFTMarketplace = new ethers.Contract(NFTMarketplaceaddr, NFTMarketplaceABI, provider);
  const listingfee = ethers.utils.parseEther("0.0001");
  let listingprice1 = document.getElementById("input2").value;
  let listingprice = ethers.utils.parseEther(listingprice1);
  await NFTMarketplace.connect(signer).ListItem(listingprice, id, { value: listingfee });
  const xx = document.getElementById(`div${id}`);
  xx.remove();
}

async function delisting() {
  const NFTMarketplaceABIdelist = ["function CancelListing(uint) public payable"];
  const NFTMarketplace = new ethers.Contract(NFTMarketplaceaddr, NFTMarketplaceABIdelist, provider);
  let tokenid = document.getElementById("input3").value;
  console.log(tokenid);
  await NFTMarketplace.connect(signer).CancelListing(tokenid);
}
// async function imageshow() {
//   const NFTMarketplace = new ethers.Contract(NFTMarketplaceaddr, NFTMarketplaceABIjson, provider);
//   const items = await NFTMarketplace.fetchMarketItem();
//   let idarray = [];
//   for (let i = 0; i < items.length; i++) {
//     for (let j = 0; j < 5; j++) {
//       idarray[i] = items[i][0].toString();
//     }
//   }
//   for (let k = 0; k < idarray.length; k++) {
//     let l = idarray[k];
//     let myimage = document.getElementById(`img${l}`);

//     myimage.remove();
//   }
// }

// imageshow();
