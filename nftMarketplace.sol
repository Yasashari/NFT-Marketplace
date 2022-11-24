//SPDX-License-Identifier:MIT

pragma solidity 0.8.7;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace  {

using Counters for Counters.Counter;

Counters.Counter public _tokenIds;
Counters.Counter public _itemsSold;
uint listingPrice = 0.0001 ether ;

address payable owner;

mapping(uint=> MarketItem) public idMarketItem;

struct MarketItem {

   uint tokenId;
   address payable seller;
   address payable owner;
   uint price;
   bool sold;
 }


event idMarketItemCreated(

  uint indexed tokenId,
  address seller,
  address owner,
  uint price,
  bool sold
 );

 IERC721 TribeG;
 uint public num ; 

 modifier onlyOwner(){

   require(msg.sender==owner , "Only owner of the marketplace can change the listing price");
_;

 }



 constructor(address _tribeG){

    owner=payable(msg.sender);
    TribeG=IERC721(_tribeG);
}

function updateListingPrice(uint _listingPrice) public payable onlyOwner {
     
       listingPrice = _listingPrice ;

  }

function getListingPrice() public view returns(uint) {

       return listingPrice;
 } 



 function ListItem(uint price ,uint tokenId) public payable {
    
    require(price > 0, "Price must be some number") ;
    require(msg.value == listingPrice, "Please pay the listing fee");
     _tokenIds.increment();
    
       if(num<tokenId){
         num=tokenId;
       }
       
    idMarketItem[tokenId] =  MarketItem(
         tokenId,
         payable(msg.sender),
         payable(address(this)),
         price,
         false

 );
   
     TribeG.safeTransferFrom(msg.sender, address(this), tokenId);
  
     emit idMarketItemCreated( tokenId,msg.sender,address(this),price,false);

   
  }


  function CancelListing(uint tokenId) public payable{

    require( idMarketItem[tokenId].seller==msg.sender, "Only seller can be delisted items" );
     idMarketItem[tokenId]=MarketItem(0,payable(address(0)),payable(address(0)),0, false);
     TribeG.safeTransferFrom(address(this),msg.sender, tokenId);
    _tokenIds.decrement();
    
  }


 function BuyNft(uint tokenId) public payable{
// To buy nft
      uint price =  idMarketItem[tokenId].price;
     
     require(msg.value==price,"Please submit the asking price in order to complete the purchase");

        idMarketItem[tokenId].owner= payable(msg.sender);
        idMarketItem[tokenId].sold=true;
       
   
       _itemsSold.increment();
       TribeG.safeTransferFrom(address(this),msg.sender, tokenId);
   
   payable(owner).transfer(listingPrice);
   payable(idMarketItem[tokenId].seller).transfer(msg.value);


  }


 function fetchMarketItem() public view returns(MarketItem[] memory) {

   // NFts which are currently listed on marketplace (Unsold items)

    
       uint unSoldItemCount=_tokenIds.current()-_itemsSold.current();

       uint currentIndex=0;
    
      MarketItem[] memory items=  new MarketItem[](unSoldItemCount);
      for(uint i=0 ; i<num; i++){
          if(idMarketItem[i+1].owner ==address(this)) {
                uint currentId=i+1;
                MarketItem storage currentItem =  idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex +=1;


               }
     
       
               

      }

      return items;  

 }


 
 function fetchItemsListed() public view returns (MarketItem[] memory) {
// My unsold Nfts currently in NFTMarketplace
    
    uint itemCount=0;
    uint currentIndex=0;

   for(uint i=0 ;  i<num ;  i++) {
           if(idMarketItem[i+1].seller==msg.sender && idMarketItem[i+1].sold==false){

            itemCount+=1;
          }
   
}

    MarketItem[] memory items= new MarketItem[](itemCount);
    for(uint i=0 ;  i<num ;  i++) {
           if(idMarketItem[i+1].seller==msg.sender && idMarketItem[i+1].sold==false ){

            uint currentId = i + 1;
          

    MarketItem storage currentItem=idMarketItem[currentId];
    items[currentIndex]=currentItem;
    currentIndex+=1;
   
     }

  

}
  return items;
}

function onERC721Received(address, address, uint256, bytes calldata) external pure 
returns(bytes4){

return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

}
}