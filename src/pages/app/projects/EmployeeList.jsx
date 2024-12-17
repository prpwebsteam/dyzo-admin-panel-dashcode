import { fetchGET } from '@/store/api/apiSlice';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeList = () => {
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState([]);

    const formatDate = (dateString) => {
        if (!dateString) return "----";
        const options = { day: '2-digit', month: 'short', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-IN', options).split(" ").join(",");
    };

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const employee = await fetchGET(`${import.meta.env.VITE_APP_BASEURL}/employee/list/${id}`);
                console.log("employeeList", employee.data);
                setEmployeeData(employee.data);
            } catch (error) {
                console.log('Error in companies fetch', error.message);
            }
        };

        getEmployees();
    }, [id]);

    return (
        <>
            <div className="overflow-x-auto">
                <div className='bg-white dark:bg-slate-700 text-left my-1 p-5 text-xl rounded text-black-500 font-semibold'>
                    <label htmlFor="">
                        Employee List
                    </label>
                </div>
                <div className="inline-block min-w-full rounded">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                            <thead className="bg-slate-200 dark:bg-slate-700 text-left">
                                <tr>
                                    <th className='table-td font-bold'>ID</th>
                                    <th className='table-td font-bold'>Name</th>
                                    <th className='table-td font-bold'>Email Id</th>
                                    <th className='table-td font-bold'>Phone No.</th>
                                    <th className='table-td font-bold'>Date of Joining</th>
                                    <th className='table-td font-bold'>Team Leader</th>
                                    <th className='table-td font-bold'>Admin</th>
                                    <th className='table-td font-bold'>Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 p-5">
                                {employeeData.length > 0 ? employeeData?.map((item) => (
                                    <tr key={item._id}>
                                        <td className='table-td'>{item._id}</td>
                                        <td className='table-td flex whitespace-nowrap items-center'>
                                            {item.profile_picture ? (
                                                <img src={`${import.meta.env.VITE_APP_BASEURL}${item.profile_picture}`} className='w-8 h-8 rounded-full mr-1' alt="Profile" />
                                            ) : (
                                                <img src={`${import.meta.env.VITE_APP_BASEURL}/media/images/defalut.jpg`} className='w-8 h-8 rounded-full mr-1' alt="Default Profile" />
                                            )}
                                            {item.name}
                                        </td>
                                        <td className='table-td lowercase'>{item.email}</td>
                                        <td className='table-td'>{item.phone ? item.phone : "----"}</td>
                                        <td className='table-td'>{formatDate(item.date_of_joining)}</td>
                                        <td className='table-td'>{item.team_leader ? "Yes" : "No"}</td>
                                        <td className='table-td'>{item.isAdmin ? "Admin" : "No"}</td>
                                        <td className='table-td'>
                                            <span className={`rounded-xl ${item.status === "Active" ? 'bg-green-600' : 'bg-red-600'} text-white px-2 py-1`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) :
                                    <tr>
                                        <td colSpan="7" className="text-center py-5">
                                            No Employee Data were found!
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeList;
