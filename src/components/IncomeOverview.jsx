import { useEffect, useState } from 'react'
import CustomLineChart from './CustomLineChart'
import { prepareIncomeLineChartData } from '../util/util';
import { Plus } from 'lucide-react';

const IncomeOverview = ({incomeData , onAddIncome}) => {
  const [chartData,setChartData] = useState([]);

  useEffect(()=>{
        const result = prepareIncomeLineChartData(incomeData);
        setChartData(result);
        console.log(result);

        return ()=>{

        }
    },[incomeData])


  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0 5'>
                    Track your earnings over time and analyze your income trends.
                </p>
            </div>
            <button className='flex items-center gap-2 bg-green-100 text-green-900 px-5 py-1.5 rounded-lg cursor-pointer text-md font-medium' 
                    onClick={onAddIncome}
                      >
                    
                    <Plus size={15} className='text-lg'/>
                    <p>Add Income</p>
            </button>
         </div>
          <div className='mt-10 w-full'>
                        {chartData.length === 0 ? (
                  <div className='h-[300px] flex items-center justify-center text-gray-400'>
                  No income records found
              </div>
              ) : (
             <CustomLineChart data={chartData} />
              )}
          </div>
        
    </div>
  )
}

export default IncomeOverview