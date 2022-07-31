import LandContext from './LandContext';
import { db } from './Firebase';
import { useCallback, useEffect, useReducer } from 'react';
import { reducer,initialState,actions } from '../../contexts/EthContext/state';
import Web3 from 'web3'

const LandContextProvider = ( {children} ) => {

    const [state,dispatch] = useReducer(reducer,initialState)

    const init = useCallback(
        async artifact => {
          if (artifact) {
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");
            const accounts = await web3.eth.requestAccounts();
            const networkID = await web3.eth.net.getId();
            const { abi } = artifact;
            let address, contract;
            try {
              address = artifact.networks[networkID].address;
              contract = new web3.eth.Contract(abi, address);
            } catch (err) {
              console.error(err);
            }
            dispatch({
              type: actions.init,
              data: { artifact, web3, accounts, networkID, contract }
            });
          }
        }, []);
    
      useEffect(() => {
        const tryInit = async () => {
          try {
            const artifact = require("../../contracts/LandRegistration.json");
            init(artifact);
          } catch (err) {
            console.error(err);
          }
        };
    
        tryInit();
      }, [init]);
    



    return(
        <LandContext.Provider value={{
            state,
            db,
            dispatch
        }}>
            {children}
        </LandContext.Provider>
    )

}

export default LandContextProvider;