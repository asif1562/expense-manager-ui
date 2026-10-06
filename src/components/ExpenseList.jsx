import moment from "moment";
import {
    Download,
    Loader,
    Mail
} from "lucide-react";

import TransactionInfoCard from "./TransactionInfoCard.jsx";

const ExpenseList = ({
    transactions,
    onDelete,
    onDownload,
    onEmail,
    emailLoading,
    downloadLoading
}) => {

    return (

        <div className="card">

            {/* =========================
                HEADER
            ========================= */}

            <div className="flex items-center justify-between">

                <h5 className="text-lg">
                    All Expenses
                </h5>


                <div className="flex items-center justify-end gap-2">


                    {/* EMAIL BUTTON */}

                    <button
                        className="bg-slate-100 rounded-sm px-5 w-auto py-1 flex flex-row gap-2 items-center-safe cursor-pointer hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200"

                        onClick={onEmail}

                        disabled={emailLoading}
                    >

                        {emailLoading ? (

                            <>
                                <Loader className="w-4 h-4 animate-spin" />

                                <p>
                                    Emailing...
                                </p>
                            </>

                        ) : (

                            <>
                                <Mail
                                    size={15}
                                    className="text-base"
                                />

                                <p>
                                    Email
                                </p>
                            </>

                        )}

                    </button>


                    {/* DOWNLOAD BUTTON */}

                    <button
                        onClick={onDownload}

                        disabled={downloadLoading}

                        className="bg-slate-100 rounded-sm px-5 w-auto py-1 flex flex-row gap-2 items-center-safe cursor-pointer hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200"
                    >

                        {downloadLoading ? (

                            <>
                                <Loader
                                    className="w-4 h-4 animate-spin"
                                />

                                <p>
                                    Downloading...
                                </p>
                            </>

                        ) : (

                            <>
                                <Download
                                    size={15}
                                    className="text-base"
                                />

                                <p>
                                    Download
                                </p>
                            </>

                        )}

                    </button>

                </div>

            </div>


            {/* =========================
                EXPENSE CARDS
            ========================= */}

            <div className="grid grid-cols-1 md:grid-cols-2">

                


                {transactions?.length === 0 ? (
                         <div className='col-span-full py-10 text-center text-gray-400'>
                           No expense records found
                         </div>
                        ) : (
                         transactions?.map((expense) => (
                         <TransactionInfoCard
                                 key={expense.id}
                                     title={expense.name}
                                  icon={expense.icon}
                                  date={moment(expense.date).format('Do MMM YYYY')}
                                 amount={expense.amount}
                                 type="expense"
                     onDelete={() => onDelete(expense.id)}
                            />
                            ))
                                    )}

            </div>

        </div>
    );
};

export default ExpenseList;