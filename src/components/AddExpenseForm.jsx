import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./TakeInput.jsx";

const AddExpenseForm = ({ onAddExpense, categories }) => {

    const [expense, setExpense] = useState({
        name: "",
        categoryId: "",
        amount: "",
        date: "",
        icon: ""
    });


    // Set first category automatically
    useEffect(() => {

        if (categories && categories.length > 0 && !expense.categoryId) {

            setExpense((prev) => ({
                ...prev,
                categoryId: categories[0].id
            }));

        }

    }, [categories, expense.categoryId]);


    const handleChange = (key, value) => {

        setExpense((prev) => ({
            ...prev,
            [key]: value
        }));

    };


    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }));


    return (

        <div>

            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) =>
                    handleChange("icon", selectedIcon)
                }
            />


            <Input
                value={expense.name}
                onChange={({ target }) =>
                    handleChange("name", target.value)
                }
                label="Expense Source"
                placeholder="e.g., Electricity, Wifi, Groceries"
                type="text"
            />


            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({ target }) =>
                    handleChange("categoryId", target.value)
                }
                isSelect={true}
                options={categoryOptions}
            />


            <Input
                value={expense.amount}
                onChange={({ target }) =>
                    handleChange("amount", target.value)
                }
                label="Amount"
                placeholder="e.g., 150.00"
                type="number"
            />


            <Input
                value={expense.date}
                onChange={({ target }) =>
                    handleChange("date", target.value)
                }
                label="Date"
                type="date"
            />


            <div className="flex justify-end mt-6">

                <button
                    type="button"
                    className="bg-purple-800 flex flex-row cursor-pointer gap-2 items-center-safe text-white px-7 py-1.5 rounded-lg font-medium text-[16px]"
                    onClick={() => onAddExpense(expense)}
                >
                    Add Expense
                </button>

            </div>

        </div>
    );
};

export default AddExpenseForm;