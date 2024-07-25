import React, { useEffect } from 'react';
import {  USER_API } from '../../constants';
import { useFetchData } from '../../utils/fetcher';

const OwnerWallet:React.FC = () => {
  const { data, isError: error } = useFetchData<any>(USER_API + '/wallet');

  useEffect(() => {
    if (data) {
      console.log(data, 'revenue');
    }
  }, [data]);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const transactions = data.transaction || [];
  const totalRevenue = data.transaction[0]?.walletId.balance || 0;

  return (
    <div className="w-screen h-fit overflow-hidden ml-64">
      <div className="min-h-screen bg-white text-black p-4">
        <div className="max-w-4xl mx-auto">
          {/* Revenue Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="text-center text-2xl font-bold mb-4">Total Revenue</div>
            <div className="text-center text-4xl font-bold mb-4">{totalRevenue}</div>
          </div>

          {/* Transaction History Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-xl font-bold mb-4">Transactions</div>
            {transactions.length > 0 ? (
              <table className="min-w-full bg-gray-100">
                <thead className="bg-gray-200 text-black">
                  <tr>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction:any, index:number) => (
                    <tr key={index} className="text-center">
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
        </div>
      </div>
    </div>
  );
};

export default OwnerWallet;
