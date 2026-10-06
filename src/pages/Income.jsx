import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser'
import toast from 'react-hot-toast';
import Modal from "../components/Modal.jsx";
import { Plus } from 'lucide-react';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndPoints';
import IncomeList from '../components/IncomeList';
import AddIncomeForm from '../components/AddIncomeForm.jsx';
import DeleteAlert from '../components/DeleteAlert.jsx';
import IncomeOverview from '../components/IncomeOverview.jsx';
const Income = () => {
  useUser();
  const [incomeData,setIncomeData] = useState([]);
  const [categories,setCategories] = useState([]);
  const [loading,setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
const [downloadLoading, setDownloadLoading] = useState(false);
  const [openAddIncomeModal,setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show : false,
    data : null
  });

 // fetch income details from the API

  const fetchIncomeDetails = async ()=> {
    if(loading) return;
    setLoading(true);

    try {
      // setLoading(true)
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if(response.status===200){
        //console.log("income list", response.data);
        
        setIncomeData(response.data);
       // setLoading(false)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message ||`Failed to fetch income details`);
    }finally{
      setLoading(false);
    }
  }

  // fetch categories for income
 const fetchIncomeCategories = async ()=> {
       
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      
      if(response.status===200){
        console.log("income categories", response.data);
        
        setCategories(response.data);
        
      }
    } catch (error) {
    console.error("Failed to fetch income categories:", error);

    toast.error(
        error.response?.data?.message ||
        "Failed to fetch income categories");
    }
  }

  //save the income details
  const handleAddIncome = async(income) => {
    console.log(income)
    const {name,amount,date,icon,categoryId} = income;

     //validation
     if(!name.trim()){
      toast.error("Please enter a name");
      return;
     }

     if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amout should be a valid number greater than 0");
      return;
     }

     if(!date){
      toast.error("Please select a date");
      return;
     }

     const today = new Date().toISOString().split('T')[0];
     if(date > today){
      toast.error("Date cannot be in the future");
      return;
     }

     if(!categoryId){
      toast.error("Please select a category");
      return;
     }

     try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
          name,
          amount:Number(amount),
          date,
          icon,
          categoryId});
      if(response.status===201){
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully")
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
     } catch (error) {
          console.log("error adding income", error);
          console.log("Status:", error.response?.status);
          console.log("Response:", error.response?.data);
          toast.error(error.data?.message || "Failed to add income")
     }
 }

 // delete income details
  const deleteIncome = async (id)=> {
  
    try {
      
      const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      if(response.status===204){
      toast.success(`Income deleted successfully`)
      setOpenDeleteAlert({show:false,data:null})
      fetchIncomeDetails();
      }
    } catch (error) {
      console.log("error deleting data", error);     
      toast.error(error.response?.data?.message || `Failed to delete income`)
    }
  }

  const handleDownloadIncomeDetails = async()=> {
    setDownloadLoading(true);
    //setLoading(true);
          
        try {
          const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:"blob"});
          
          let fileName = "income_details.xlsx";
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download",fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
          toast.success("Download income details successful")
          setLoading(false);

            } catch (error) {
              console.log("error downloading income details:", error);
              
          toast.error(error.response.data?.message || 'Failed to download income details')
        }finally{
          // setLoading(false);
          setDownloadLoading(false);
        }
   }

  const handleEmailIncomeDetails= async()=>{
    //setLoading(true);
    setEmailLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if (response.status === 200) {
                toast.success("Income details emailed successfully");
            }
        }catch(error) {
            console.error('Error emailing income details:', error);
            toast.error(error.response?.data?.message || "Failed to email income");
        }
         finally{
          // setLoading(false)
          setEmailLoading(false);
        }
  }

  useEffect(()=>{
    fetchIncomeDetails();
    fetchIncomeCategories();
  },[])
  return (
    <Dashboard activeMenu="Income">
       <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div>
                {/*Overview for income with linechart */}
                 
                
                <IncomeOverview incomeData={incomeData} onAddIncome={()=>setOpenAddIncomeModal(true)}/>
            </div>


            <IncomeList
                     transactions={incomeData}
                     onDelete={(id)=> setOpenDeleteAlert({show: true, data: id})}
                     onDownload={handleDownloadIncomeDetails}
                     onEmail = {handleEmailIncomeDetails}
                     emailLoading={emailLoading}
                     downloadLoading={downloadLoading}
            />

            {/* Add Income Modal */}
            <Modal 
                  isOpen={openAddIncomeModal}
                  onClose={()=>setOpenAddIncomeModal(false)}
                  title="Add Income">
              <AddIncomeForm 
                    onAddIncome={(income)=> handleAddIncome(income)} 
                    categories={categories}/>
            
          </Modal>

          {/* Delete Income Modal */}
          <Modal
              isOpen={openDeleteAlert.show}
              onClose={()=>setOpenDeleteAlert({show:false,data:null})}
              title="Delete Income">
              
              <DeleteAlert 
                  content="Are you sure  want to delete ?" 
                  onDelete={()=>deleteIncome(openDeleteAlert.data)} 
                  setOpenDeleteAlert={setOpenDeleteAlert}/>
              
          </Modal>
          </div>
       </div>
    </Dashboard>
  )
}

export default Income