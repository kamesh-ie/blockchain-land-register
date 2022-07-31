pragma solidity ^0.8.14;
// Land Details
contract LandRegistration{ 
    struct landDetails{
    string state; 
    string district; 
    string location; 
    string landMark; 
    uint256 plotNo;
    address payable CurrentOwner; 
    uint priceSelling;
    bool isAvailable; 
    address requester;
    reqStatus requestStatus;
}
enum reqStatus {Default,pending,reject,approved}
//profile of a client 
struct profiles{
    uint[]assetlist;
}
mapping (uint => landDetails) Land;
address owner;
mapping(string => address)manager; 
mapping (address => profiles) profile;

//contract o..ner 
constructor () public{
owner = msg.sender;
}


modifier onlyOwner {
    require( msg.sender == owner);
    _; 
}



//  ladcirg locat!O" .,.ager


function addManager ( address _Manager,string memory _location ) onlyOwner public {
     manager[_location]=_Manager;  }

// Deahtrato  o� land deta: s
function register (string memory _state,string memory _district ,
 string memory  _location,string memory _landmark,uint256 _plotNo,
  address payable _OwnerAddress,uint _priceSelllng,uint	Number
  ) public returns (bool ) {
  require(manager[_location] == msg.sender || owner == msg.sender); 
  Land [Number].state = _state;
  Land [Number].district = _district ; 
  Land[Number].location = _location ; 
  Land[Number].landMark = _landmark;
   Land[Number].plotNo = _plotNo;
   Land[Number].CurrentOwner = _OwnerAddress; 
   Land[Number].priceSelling = _priceSelllng; 
   profile[_OwnerAddress].assetlist.push(Number); 
   return  true; }



//to view details of land for tne o�ner
function Owner(uint Number) public view returns(string memory,string memory,
  string memory,string memory,uint256,bool,address,reqStatus)
{
    return(Land[Number].state,Land[Number].district,Land[Number].location, 
	Land [Number].landMark,Land[Number].plotNo,
    Land[Number].isAvailable,Land[Number].requester,Land[Number].requestStatus);
}

// 'to view d"ails o� land for te o..> er
function Buyer(uint Number) public view returns(address,uint,bool,address,reqStatus)
{
    return(Land[Number].CurrentOwner,Land[Number].priceSelling, Land[Number].isAvailable,
    Land[Number].requester,Land [Number].requestStatus );
}


// I to CCII .te unique llJ cer fo  a l;inc.
function computeNumber(string memory _state,string memory _district ,
                     string memory _village ,uint _plotNo ,string memory _location) public view returns(uint)
{
    return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,_state,_district,_location, _plotNo)))%10000000000000;
}

//push a request to the land owner
 function requstTolandOwner(uint Number) public { 
    require(Land[Number]. isAvailable);

    Land [Number].requester=msg.sender ; 
    Land [Number].isAvailable=false;
    Land [Number].requestStatus = reqStatus.pending; //changes the status to pending.
}


//will show assets of the function caller
function viewAssets()public view returns(uint[] memory){ 
    return (profile[msg.sender].assetlist);
}


//viewing request for the lands
function viewRequest(uint property)public view returns(address){ 
    return(Land [property].requester);
}
//processing request for the land by accepting or rejecting 
function processRequest(uint property ,reqStatus status)public {
   require(Land [property].CurrentOwner == msg.sender); 
   Land [property].requestStatus=status;
   if(status == reqStatus.reject){
   Land[property].requester = address(0);
   Land[property].requestStatus = reqStatus.Default;
   }
}
//availing land for sale.
function makeAvailable(uint property)public { 
	require(Land [property].CurrentOwner == msg.sender);
	Land[property].isAvailable=true;
}
//buying the approved property
// function purchaseland (uint property)public payable{
//     require(Land[property].requestStatus == reqStatus.approved);
//     require(msg.value >= (Land[property].marketValue+((Land[property].priceSelling)/10))); 
// 	Land [property].CurrentOwner.transfer(Land[property].marketValue);
// 	removeOwnership(Land[property].CurrentOwner,property);                   
// 	Land [property].CurrentOwner=msg.sender;
//     Land [property].isAvailable=false;        
// 	Land [property].requester = address(0);     
// 	Land [property].requestStatus = reqStatus.Default; 
// 	profile[msg.sender].assetlist.push(property); 
// }
//reoving the o�nership of seller for the land.and it is called by the purchaseland function 
// function removeOwnership(address previousOwner,uint id)private{
//     uint index = findld(id,previousOwner); 
// 	profile[previousOwner].assetlist[index]=profile[previousOwner].assetlist[profile[previousOwner]
//     .assetlist.length-1];
//     delete profile[previousOwner].assetlist(profile[previousOwner].assetlist.length -1); 
// 	profile[previousOwner].assetlist.length--; }
    //for finding the index of a perticular Number
function findld(uint id,address user)public view returns(uint){ 
	uint i;
    for(i=0;i<profile[user].assetlist.length;i++){
    	if(profile[user].assetlist[i]== id)
    return i; }
 return i;
}
}
