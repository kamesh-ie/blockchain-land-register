import Owner from "./Land_register_system/components/Owner";
import LandContextProvider from "./Land_register_system/Land_contexts/LandContextProvider";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { Buyer } from "./Land_register_system/components/Buyer";

const Landregister = () => {

return(
  <LandContextProvider>
    <Routes>
      <Route element={<Buyer />} path='/buyer' />
      <Route element={<Owner />} path='/' />
    </Routes>
 </LandContextProvider>
)




}

export default Landregister;