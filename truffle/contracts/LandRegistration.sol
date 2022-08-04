// SPDX-License-Identifier: MIT
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
enum reqStatus {Default,pending,reject,approved,sold}
//profile of a client 
struct profiles{
    uint[]assetlist;
}
mapping (uint => landDetails) public Land;
address owner;
mapping(address => bool)public manager_exist; 
mapping(uint => address)public managers;
uint public no_of_managers;
mapping (address => profiles) profile;

//contract o..ner 
constructor () {
owner = msg.sender;
}


modifier onlyOwner {
    require( msg.sender == owner);
    _; 
}



//  ladcirg locat!O" .,.ager

// #owner
function addManager ( address _Manager ) public {
    require(msg.sender == owner || role(msg.sender) == 1,"you are not allowed");
     manager_exist[_Manager]=true;
     managers[no_of_managers] = _Manager;
     no_of_managers++;
       }

// Deahtrato  o� land deta: s

event register_return (uint Land_unique_number,bool _result);


function register (string memory _state,string memory _district ,
 string memory  _location,string memory _landmark,uint256 _plotNo
  ) public {
//   require(manager[_location] == msg.sender || owner == msg.sender); 

    uint Number = computeNumber(_state,_district,_plotNo,_location);
  Land [Number].state = _state;
  Land [Number].district = _district ; 
  Land[Number].location = _location ; 
  Land[Number].landMark = _landmark;
   Land[Number].plotNo = _plotNo;
   Land[Number].CurrentOwner = payable(msg.sender); 
   profile[msg.sender].assetlist.push(Number);
   emit register_return(Number,true); 
}


//availing land for sale.
// #manager
function makeAvailable(uint property,uint _priceselling)public {
	require(role(msg.sender) == 1 || role(msg.sender) == 0);
	Land[property].isAvailable=true;
    Land[property].priceSelling = _priceselling;
}



//push a request to the land owner
// #buyer
 function requstTolandOwner(uint Number) public { 
    require(Land[Number].isAvailable);
    Land [Number].requester=msg.sender ; 
    Land [Number].isAvailable=false;
    Land [Number].requestStatus = reqStatus.pending; //changes the status to pending.
}


//processing request for the land by accepting or rejecting 
function processRequest(uint property ,reqStatus status)public {
   require(role(msg.sender) == 1 || role(msg.sender) == 0);
   Land [property].requestStatus=status;
   if(status == reqStatus.reject){
   Land[property].requester = address(0);
   Land[property].requestStatus = reqStatus.Default;
	Land[property].isAvailable=true;

   }
}

// to view details of land for tne o�ner #owner
function Owner1(uint Number) public view returns(
  string memory,string memory,string memory,string memory,uint256,address,uint)
{
    return(Land[Number].state,Land[Number].district,Land[Number].location,
    Land[Number].landMark,Land[Number].plotNo,Land[Number].CurrentOwner,Land[Number].priceSelling);
}
function Owner2(uint Number) public view returns(
  bool,address,reqStatus)
{
    return(Land[Number].isAvailable,Land[Number].requester,Land[Number].requestStatus);
}

function role(address _userAddress) public view returns(uint8){
    if( _userAddress == owner){return 0;}
    else if(manager_exist[_userAddress]){return 1;}
    else{return 2;}
}





// 'to view d"ails o� land for te o..> er
// #buyer
function Buyer(uint Number) public view returns(address,uint,bool,address,reqStatus)
{
    return(Land[Number].CurrentOwner,Land[Number].priceSelling, Land[Number].isAvailable,
    Land[Number].requester,Land [Number].requestStatus );
}


// I to CCII .te unique llJ cer fo  a l;inc.
function computeNumber(string memory _state,string memory _district ,
                    uint _plotNo ,string memory _location) public view returns(uint)
{
    return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,_state,_district,_location, _plotNo)))%10000000000000;
}



//will show assets of the function caller
// #owner or buyer
function viewAssets()public view returns(uint[] memory){ 
    return (profile[msg.sender].assetlist);
}

//viewing request for the lands
function viewRequest(uint property)public view returns(address){ 
    return(Land [property].requester);
}
//buying the approved property
function purchaseland (uint property)public payable{
    require(Land[property].requestStatus == reqStatus.approved);
    require(msg.value >= Land[property].priceSelling); 
    require(msg.sender == Land[property].requester);
	Land [property].CurrentOwner.transfer(Land[property].priceSelling);
	removeOwnership(Land[property].CurrentOwner,property);                   
	Land [property].CurrentOwner=payable(msg.sender);
    Land [property].isAvailable=false;        
	Land [property].requester = address(0);     
	profile[msg.sender].assetlist.push(property); 
    Land[property].requestStatus = reqStatus.sold;
}

//reoving the o�nership of seller for the land.and it is called by the purchaseland function 
function removeOwnership(address previousOwner,uint id)private{
    uint index = findld(id,previousOwner);
	profile[previousOwner].assetlist[index]=profile[previousOwner].assetlist[profile[previousOwner]
    .assetlist.length-1];
    delete profile[previousOwner].assetlist[profile[previousOwner].assetlist.length -1]; 
	profile[previousOwner].assetlist.pop(); }


    //for finding the index of a perticular Number
function findld(uint id,address user)public view returns(uint){ 
	uint i;
    for(i=0;i<profile[user].assetlist.length;i++){
    	if(profile[user].assetlist[i]== id)
    return i; }
 return i;
}
}