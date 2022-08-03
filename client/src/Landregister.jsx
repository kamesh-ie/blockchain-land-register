import Owner from "./Land_register_system/components/Owner";
import LandContextProvider from "./Land_register_system/Land_contexts/LandContextProvider";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { Buyer } from "./Land_register_system/components/Buyer";
import { Manager } from "./Land_register_system/components/Manager";
import { Delete_docs } from "./Land_register_system/components/Owner/Delete_docs";
import { Land_Navbar } from "./Land_register_system/components/Navbar";
import { LandPagesRole } from "./Land_register_system/Land_contexts/LandPagesRole";
import { user_roles } from './Land_register_system/Land_contexts/State'
import Add_manager_form from "./Land_register_system/components/Owner/Add_manager_form";

const Landregister = () => {

return(
  <LandContextProvider>
    <Land_Navbar />
    <Routes>
      <Route element={<LandPagesRole children={<Buyer />} role={user_roles.user} />} path='/buy' />
      <Route element={<LandPagesRole children={<Manager />} role={user_roles.manager} />} path='/manager' />
      <Route element={<LandPagesRole children={<Delete_docs />} role={user_roles.user} />} path='/delete' />
      <Route element={<LandPagesRole children={<Add_manager_form />} role={user_roles.owner} />} path='/owner' />
      <Route element={<LandPagesRole children={<Owner />} role={user_roles.user} />} path='/' />
    </Routes>
 </LandContextProvider>
)




}

export default Landregister;