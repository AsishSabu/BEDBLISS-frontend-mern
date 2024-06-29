import React from "react"

const HomepageCards: React.FC = () => {
  return (
    <div
      className="bg-varGray col-span-1 relative border rounded-3xl shadow-sm p-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 animate-pulse"
    >
      <div className="relative rounded-lg bg-gray-300 h-40"></div>
      <div className="pt-2 h-fit rounded-lg">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-1"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-1"></div>
      </div>
    </div>
  )
}

export default HomepageCards
