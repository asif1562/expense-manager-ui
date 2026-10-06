

import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../hooks/useUser';

import InfoCard from '../components/InfoCard';
import {
    Coins,
    Wallet,
    WalletCards
} from 'lucide-react';

import { addThousandsSeparator } from '../util/util';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndPoints';
import toast from 'react-hot-toast';

import RecentTransactions from '../components/RecentTransactions.jsx';
import FinanceOverview from '../components/FinanceOverview.jsx';
import Transactions from '../components/Transactions.jsx';


const Home = () => {

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);


    // =====================================================
    // FETCH DASHBOARD DATA
    // =====================================================

    const fetchDashboardData = async () => {

        setLoading(true);

        try {

            const response = await axiosConfig.get(
                API_ENDPOINTS.DASHBOARD_DATA
            );

            console.log("Dashboard response:", response?.data);

            if (response?.status === 200) {

                setDashboardData(response.data);

            }

        } catch (error) {

            console.error("Dashboard error:", error);

            toast.error("Failed to fetch dashboard data");

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOAD DASHBOARD DATA
    // =====================================================

    useEffect(() => {

        fetchDashboardData();

    }, []);


    // Get current user
    useUser();


    // =====================================================
    // SMOOTH SCROLL FUNCTION
    // =====================================================

    const scrollToSection = (sectionId) => {

        const section = document.getElementById(sectionId);

        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading && !dashboardData) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-gray-500">
                    Loading dashboard...
                </p>

            </div>
        );

    }


    return (

        <div className="w-full">

            {/* =====================================================
                HOME / DASHBOARD SECTION
            ====================================================== */}

            <section
                id="home"
                className="scroll-mt-20"
            >

                <Dashboard activeMenu="Dashboard">

                    <div className="my-5 mx-auto">

                        {/* =========================
                            SUMMARY CARDS
                        ========================== */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Total Balance */}

                            <InfoCard
                                icon={<WalletCards />}
                                label="Total Balance"
                                value={addThousandsSeparator(
                                    dashboardData?.totalBalance
                                )}
                                color="bg-purple-800"
                            />


                            {/* Total Income */}

                            <InfoCard
                                icon={<Wallet />}
                                label="Total Income"
                                value={addThousandsSeparator(
                                    dashboardData?.totalIncome
                                )}
                                color="bg-green-800"
                            />


                            {/* Total Expense */}

                            <InfoCard
                                icon={<Coins />}
                                label="Total Expense"
                                value={addThousandsSeparator(
                                    dashboardData?.totalExpense
                                )}
                                color="bg-red-800"
                            />

                        </div>


                        {/* =========================
                            DASHBOARD CONTENT
                        ========================== */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                            {/* Recent Transactions */}

                            <RecentTransactions
                                transactions={
                                    dashboardData?.recentTransactions || []
                                }
                                onMore={() => navigate("/expense")}
                            />


                            {/* Financial Overview */}

                            <FinanceOverview
                                totalBalance={
                                    dashboardData?.totalBalance || 0
                                }

                                totalIncome={
                                    dashboardData?.totalIncome || 0
                                }

                                totalExpense={
                                    dashboardData?.totalExpense || 0
                                }
                            />


                            {/* Recent Expenses */}

                            <Transactions
                                transactions={
                                    dashboardData?.recent5Expenses || []
                                }
                                onMore={() => navigate("/expense")}
                                type="expense"
                                title="Recent Expenses"
                            />


                            {/* Recent Incomes */}

                            <Transactions
                                transactions={
                                    dashboardData?.recent5Incomes || []
                                }
                                onMore={() => navigate("/income")}
                                type="income"
                                title="Recent Incomes"
                            />

                        </div>

                    </div>

                </Dashboard>

            </section>


            

        </div>

    );
};

export default Home;