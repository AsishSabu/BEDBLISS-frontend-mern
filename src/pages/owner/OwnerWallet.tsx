import React, { useEffect, useState } from "react"
import { USER_API } from "../../constants"
import { useFetchData } from "../../utils/fetcher"
import Pagination from "../../components/Pagination";

const OwnerWallet: React.FC = () => {
  const { data, isError: error } = useFetchData<any>(USER_API + '/wallet');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Effect for any side-effects related to data fetching can be added here
  }, [data]);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const transactions = data.transaction || [];
  const balance = transactions[0]?.walletId.balance || 0;

  const dataPerPage = 5;
  const lastPostIndex = currentPage * dataPerPage;
  const firstPostIndex = lastPostIndex - dataPerPage;
  const currentData = transactions.slice(firstPostIndex, lastPostIndex);


  return (
    <div className="w-screen h-fit overflow-hidden ">
      <div className="min-h-screen bg-varWhite text-black p-4">
        <div className="max-w-4xl mx-auto">
          {/* Balance Section */}
          <div className="bg-Marine_blue p-6 rounded-lg shadow-lg mb-6">
            <div className="text-center text-varWhite text-2xl font-bold mb-4">Balance</div>
            <div className="text-center text-varWhite text-4xl font-bold mb-4">{balance}</div>
          </div>

          {/* Transaction History Section */}
          <div className="bg-varWhite p-6 rounded-lg shadow-lg h-96">
            <div className="text-xl font-bold mb-4">Transactions</div>
            {currentData.length > 0 ? (
              <table className="min-w-full bg-varBlueGray rounded-md">
                <thead className="text-Marine_blue">
                  <tr>
                    <th className="py-2">Value</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((transaction: any, index: number) => (
                    <tr key={index} className="text-center shadow-md">
                      <td className="py-2">{transaction.amount}</td>
                      <td className="py-2">{new Date(transaction.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      <td className={`py-2 ${transaction.type === 'Credit' ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.type}
                      </td>
                      <td className="py-2">{transaction.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-4">No transactions available</div>
            )}
          </div>

          {/* Pagination Section */}
          <div className="mt-4 flex justify-center">
            {transactions.length?
                       ( <Pagination
                        currentPage={currentPage}
                        totalData={transactions.length}
                        dataPerPage={dataPerPage}
                        setCurrentPage={setCurrentPage}
                      />):""}

          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerWallet
