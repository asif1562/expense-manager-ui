import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser.jsx";

import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";

import Dashboard from "../components/Dashboard";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";

const Expense = () => {

    useUser();

    // =========================
    // STATES
    // =========================

    const [expenseData, setExpenseData] = useState([]);

    const [categories, setCategories] = useState([]);

    // Used for fetching expense data
    const [loading, setLoading] = useState(false);

    // Separate loading states
    const [emailLoading, setEmailLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal] =
        useState(false);

    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });


    // =========================
    // FETCH EXPENSE DETAILS
    // =========================

    const fetchExpenseDetails = async () => {

        if (loading) return;

        setLoading(true);

        try {

            const response = await axiosConfig.get(
                API_ENDPOINTS.GET_ALL_EXPENSES
            );

            if (response.status === 200) {

                setExpenseData(response.data);

            }

        } catch (error) {

            console.error(
                "Failed to fetch expense details:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch expense details"
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // FETCH EXPENSE CATEGORIES
    // =========================

    const fetchExpenseCategories = async () => {

        try {

            const response = await axiosConfig.get(
                API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
            );

            if (response.status === 200) {

                setCategories(response.data);

            }

        } catch (error) {

            console.error(
                "Failed to fetch expense categories:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch expense categories"
            );
        }
    };


    // =========================
    // ADD EXPENSE
    // =========================

    const handleAddExpense = async (expense) => {

        console.log("Expense received:", expense);

        const {
            name,
            categoryId,
            amount,
            date,
            icon
        } = expense;


        // Name validation

        if (!name.trim()) {

            toast.error("Name is required.");

            return;
        }


        // Category validation

        if (!categoryId) {

            toast.error("Category is required.");

            return;
        }


        // Amount validation

        if (
            !amount ||
            isNaN(amount) ||
            Number(amount) <= 0
        ) {

            toast.error(
                "Amount should be a valid number greater than 0."
            );

            return;
        }


        // Date validation

        if (!date) {

            toast.error("Date is required.");

            return;
        }


        // Future date validation

        const today = new Date()
            .toISOString()
            .split("T")[0];

        if (date > today) {

            toast.error(
                "Date cannot be in the future"
            );

            return;
        }


        try {

            const response = await axiosConfig.post(
                API_ENDPOINTS.ADD_EXPENSE,
                {
                    name,
                    categoryId,
                    amount: Number(amount),
                    date,
                    icon
                }
            );


            if (response.status === 201) {

                setOpenAddExpenseModal(false);

                toast.success(
                    "Expense added successfully"
                );

                // Refresh expense list
                fetchExpenseDetails();

                // Refresh categories
                fetchExpenseCategories();
            }


        } catch (error) {

            console.error(
                "Error adding expense:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Response:",
                error.response?.data
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to add expense"
            );
        }
    };


    // =========================
    // DELETE EXPENSE
    // =========================

    const deleteExpense = async (id) => {

        try {

            const response = await axiosConfig.delete(
                API_ENDPOINTS.DELETE_EXPENSE(id)
            );


            if (response.status === 204) {

                toast.success(
                    "Expense deleted successfully"
                );

                setOpenDeleteAlert({
                    show: false,
                    data: null
                });

                fetchExpenseDetails();
            }


        } catch (error) {

            console.error(
                "Error deleting expense:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to delete expense"
            );
        }
    };


    // =========================
    // DOWNLOAD EXPENSE EXCEL
    // =========================

    const handleDownloadExpenseDetails = async () => {

        setDownloadLoading(true);

        try {

            const response = await axiosConfig.get(
                API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
                {
                    responseType: "blob"
                }
            );


            const fileName = "expense_details.xlsx";


            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );


            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                fileName
            );

            document.body.appendChild(link);

            link.click();

            link.parentNode.removeChild(link);

            window.URL.revokeObjectURL(url);


            toast.success(
                "Expense details downloaded successfully"
            );


        } catch (error) {

            console.error(
                "Error downloading expense details:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to download expense details"
            );

        } finally {

            setDownloadLoading(false);

        }
    };


    // =========================
    // EMAIL EXPENSE DETAILS
    // =========================

    const handleEmailExpenseDetails = async () => {

        setEmailLoading(true);

        try {

            const response = await axiosConfig.get(
                API_ENDPOINTS.EMAIL_EXPENSE
            );


            if (response.status === 200) {

                toast.success(
                    "Expense details emailed successfully"
                );
            }


        } catch (error) {

            console.error(
                "Error emailing expense details:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to email expense details"
            );

        } finally {

            setEmailLoading(false);

        }
    };


    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(() => {

        fetchExpenseDetails();

        fetchExpenseCategories();

    }, []);


    // =========================
    // UI
    // =========================

    return (

        <Dashboard activeMenu="Expense">

            <div className="my-5 mx-auto">

                <div className="grid grid-cols-1 gap-6">


                    {/* =========================
                        EXPENSE OVERVIEW
                    ========================= */}

                    <div>

                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() =>
                                setOpenAddExpenseModal(true)
                            }
                        />

                    </div>


                    {/* =========================
                        EXPENSE LIST
                    ========================= */}

                    <ExpenseList
                        transactions={expenseData}

                        onDelete={(id) =>
                            setOpenDeleteAlert({
                                show: true,
                                data: id
                            })
                        }

                        onDownload={
                            handleDownloadExpenseDetails
                        }

                        onEmail={
                            handleEmailExpenseDetails
                        }

                        emailLoading={emailLoading}

                        downloadLoading={downloadLoading}
                    />


                    {/* =========================
                        ADD EXPENSE MODAL
                    ========================= */}

                    <Modal
                        isOpen={openAddExpenseModal}

                        onClose={() =>
                            setOpenAddExpenseModal(false)
                        }

                        title="Add Expense"
                    >

                        <AddExpenseForm
                            onAddExpense={
                                handleAddExpense
                            }

                            categories={categories}
                        />

                    </Modal>


                    {/* =========================
                        DELETE EXPENSE MODAL
                    ========================= */}

                    <Modal
                        isOpen={openDeleteAlert.show}

                        onClose={() =>
                            setOpenDeleteAlert({
                                show: false,
                                data: null
                            })
                        }

                        title="Delete Expense"
                    >

                        <DeleteAlert
                            content="Are you sure you want to delete this expense?"

                            onDelete={() =>
                                deleteExpense(
                                    openDeleteAlert.data
                                )
                            }

                            setOpenDeleteAlert={
                                setOpenDeleteAlert
                            }
                        />

                    </Modal>

                </div>

            </div>

        </Dashboard>
    );
};

export default Expense;