import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import ProjectGrid from "./ProjectGrid";
import ProjectList from "./ProjectList";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { toggleAddModal } from "./store";
import AddProject from "./AddProject";
import { ToastContainer } from "react-toastify";
import EditProject from "./EditProject";
import { fetchGET } from "@/store/api/apiSlice";
import Dropdown from "@/components/ui/Dropdown";

const CompanyPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [companies, setCompanies] = useState([])
  const [status, setStatus] = useState('all')
  const [filterCompanies, setFilterCompanies] = useState(companies)

  const dispatch = useDispatch();

  useEffect(() => {

    const getCompanies = async () => {
      try {
        setIsLoaded(true)
        const companies = await fetchGET(`http://localhost:8000/super/api/companies/`)
        if (companies.length > 0) {
          setCompanies(companies)
          setFilterCompanies(companies)
          console.log(companies)
        }

      } catch (error) {
        console.log('Error in companies fetch', error.message)
        setCompanies([])
      } finally {
        setIsLoaded(false)
      }

    }

    getCompanies()

  }, [])


  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, [filler]);

  useEffect(() => {
    // if(status === "all") return
    console.log(status, "jhhhggjhhg")

    if (status === 'active') {
      setFilterCompanies(companies.filter((company) => company.isActive == true))
      console.log(filterCompanies, "active")

      return;
    } else if (status === 'inactive') {
      setFilterCompanies(companies.filter((company) => company.isActive != true))
      console.log(filterCompanies, "inactive")

      return;
    }
    else if (status === 'date') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const filterCompanies = companies.filter(company => {
        const createdDate = new Date(company.created_at);
        return createdDate >= oneMonthAgo;
      });
      setFilterCompanies(filterCompanies);
      return;
    } else {
      setFilterCompanies(companies)

      console.log(filterCompanies, "allactive")
      return;
    }



  }, [status])


  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Companies
        </h4>
        <div
          className={`${width < breakpoints.md ? "space-x-rb" : ""
            } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Dropdown classMenuItems="md:w-[335px] w-min top-[58px]" label={<Button icon='heroicons-outline:filter' text="Filter" className="btn-dark dark:bg-slate-800  h-min text-sm font-normal" />}>
            {/* Heading */}
            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-600">
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Status
              </div>
            </div>

            {/* Status Buttons */}
            <div className="px-4 py-2">
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 text-sm border ${status === 'all' ? 'bg-primary-500 text-white' : 'bg-white text-black-500'} rounded-md`} onClick={() => setStatus('all')}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-sm border  ${status === 'active' ? 'bg-primary-500 text-white' : 'bg-white text-black-500'} rounded-md `} onClick={() => setStatus('active')}
                >
                  Active
                </button>
                <button
                  className={`px-3 py-1 text-sm border  ${status === 'inactive' ? 'bg-primary-500 text-white ' : 'bg-white text-black-500'} rounded-md `} onClick={() => setStatus('inactive')}
                >
                  Inactive
                </button>
                <button
                  className={`px-3 py-1 text-sm border  ${status === 'date' ? 'bg-primary-500 text-white ' : 'bg-white text-black-500'} rounded-md `} onClick={() => setStatus('date')}
                >
                  Date
                </button>
              </div>
            </div>
          </Dropdown>


          <Button
            icon="heroicons-outline:plus"
            text="Add Company"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>

      {isLoaded && filler === "list" && (
        <TableLoading count={companies?.length} />
      )}

      {filler === "list" && !isLoaded && (
        <div>
          <ProjectList companies={filterCompanies} />
        </div>
      )}
      <AddProject />
      <EditProject />
    </div>
  );
};

export default CompanyPage;
