import Owner from "./Land_register_system/components/Owner";
import LandContextProvider from "./Land_register_system/Land_contexts/LandContextProvider";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { Buyer } from "./Land_register_system/components/Buyer";
import { Manager } from "./Land_register_system/components/Manager";
import { Delete_docs } from "./Land_register_system/components/Owner/Delete_docs";
import { Land_Navbar } from "./Land_register_system/components/Navbar";

const Landregister = () => {

return(
  <LandContextProvider>
    <Land_Navbar />
    <Routes>
      <Route element={<Buyer />} path='/buy' />
      <Route element={<Manager />} path='/manager' />
      <Route element={<Delete_docs />} path='/delete' />
      <Route element={<Owner />} path='/' />
    </Routes>
 </LandContextProvider>
)




}

export default Landregister;