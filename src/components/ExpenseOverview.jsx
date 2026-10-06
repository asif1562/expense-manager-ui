import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareIncomeLineChartData } from "../util/util.js";

const ExpenseOverview = ({
    transactions,
    onAddExpense
}) => {

    const [chartData, setChartData] = useState([]);


    useEffect(() => {

        const result =
            prepareIncomeLineChartData(
                transactions
            );

        setChartData(result);

    }, [transactions]);


    return (

        <div className="card">

            <div className="flex items-center justify-between">

                <div>

                    <h5 className="text-lg">
                        Expense Overview
                    </h5>

                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spending trends over time
                        and gain insights into where your
                        money goes.
                    </p>

                </div>


                {/* ADD EXPENSE */}

                <button
                    onClick={onAddExpense}

                    className="flex flex-row items-center gap-2 bg-red-100 text-red-900 px-5 py-1.5 rounded-lg cursor-pointer text-md font-medium"
                >

                    <span className="text-lg">
                        +
                    </span>

                    <p>
                        Add Expense
                    </p>

                </button>

            </div>


            {/* CHART */}

        

            <div className='mt-10 w-full'>
                        {chartData.length === 0 ? (
                         <div className='h-[300px] flex items-center justify-center text-gray-400'>
                             No expense records found
                                </div>
                             ) : (
                     <CustomLineChart data={chartData} />
                                     )}
                    </div>

        </div>
    );
};

export default ExpenseOverview;