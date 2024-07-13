import React from "react";


export default function DashboardFilters({ filterCategory, setFilterCategory, sortBy, setSortBy,sortOrder, setSortOrder, uniqueCategories }) {
    
    return (
        <div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl fonst0semibold text-indigo-800 mb-4">Filters And Sorting</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select 
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="mt-1 block w-full pl-3 pr10 py-2 text-basse border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value=''>All Categories</option>
                            {uniqueCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-meddium text-gray-700">Sort By</label>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="mt-1 block w-full pl-3 pr10 py-2 text-basse border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value='date'>Date</option>
                        <option value='amount'>Amount</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Order</label>
                    <select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="mt-1 block w-full pl-3 pr10 py-2 text-basse border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value='desc'>Descending</option>
                        <option value='asc'>Ascending</option>
                    </select>
                </div>
            </div>
        </div>
    )
}