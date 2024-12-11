import Card from '@/components/ui/Card'
import { fetchGET } from '@/store/api/apiSlice'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CompanyDetails = () => {

  const [companies, setCompanies] = useState({})
  const { id } = useParams()
  const baseUrl = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const [date] = companies?.created_at ? companies.created_at.split("T") : ["----", ""];
  const [date1] = companies?.modification_date ? companies.modification_date.split("T") : ["----", ""];

  useEffect(() => {

    const getCompanies = async () => {
      try {
        const companies = await fetchGET(`${baseUrl}/company/${id}`)
        setCompanies(companies)
        // console.log("companyDetails", companies)
      } catch (error) {
        console.log('Error in companies fetch', error.message)
        setCompanies([])
      }
    }

    getCompanies()

  }, [])



  return (

    <div className=" space-y-5">

      <div className="grid grid-cols-2 gap-5">

        <Card className="col-span-12 h-full">
          <div className="grid lg:grid-cols-6 grid-cols-1 gap-4">

            <div className="lg:h-40 lg:w-40 xl:h-50 xl:w-50 h-24 w-24 mx-auto lg:ml-0 lg:mr-0 rounded-full ring-4 ring-slate-100 relative group">
              {companies?.company_logo ? (
                <div className='flex item-center'>
                  <img
                    src={`${baseUrl}${companies?.company_logo}`}
                    alt={`${companies?.company_logo}`}
                    className="w-full h-full object-cover rounded-full border-4 border-gray-400 transition-all duration-300 ease-in-out group-hover:blur-sm"
                  />
                </div>
              ) : (
                <img
                  src={`${baseUrl}/media/images/defalut.jpg`}
                  alt="default"
                  className="w-full h-full object-cover rounded-full border-4 border-gray-400 transition-all duration-300 ease-in-out group-hover:blur-sm"
                />
              )}
            </div>

            <div className="grid lg:col-span-5 col-span-1 text-center lg:text-left text-xl lg:text-4xl 2xl:text-5xl font-bold items-end">
              <div className="uppercase whitespace-nowrap pb-5 lg:p-5 lg">{companies.company_name ? companies.company_name : "----"}</div>
            </div>
          </div>
        </Card>

        <Card className="xl:col-span-12 col-span-12 lg:col-span-5 h-full">

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 py-5">
            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="mdi-light:home" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Address:</span>
                <span className="block">{companies.company_address ? companies.company_address : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="mdi-light:calendar" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Company Registeration Date:</span>
                <span className="block">{companies.created_at ? date : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="radix-icons:size" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Company Size:</span>
                <span className="block">{companies.company_size != "ND" ? companies.company_size : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="stash:globe-timezone" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Timezone:</span>
                <span className="block">{companies.company_timezone ? companies.company_timezone : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="gis:search-country" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Country Code:</span>
                <span className="block text-sm">{companies.country_code ? companies.country_code : "----"}</span>
              </div>
            </div>



            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="fluent:currency-dollar-rupee-24-regular" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Currency:</span>
                <span className="block">{companies.currency ? companies.currency : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="hugeicons:user-status" className='w-6 h-6' />
              </div>
              <div>
                <span className="font-bold">Activity Status:</span>
                <span className="block">{(companies.active) ? "Active" : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="formkit:people" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Employee Limit:</span>
                <span className="block">{companies.employee_limit ? companies.employee_limit : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="fluent:screenshot-28-regular" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Mode of Screenshot:</span>
                <span className="block">{companies.screenshot_mode ? companies.screenshot_mode : "----"}</span>
              </div>
            </div>
            
            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="mingcute:time-line" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Interval Time:</span>
                <span className="block">{companies.interval_time ? companies.interval_time : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="mdi-light:calendar" className='h-6 w-6' />
              </div>
              <div>
                <span className="font-bold">Modification Date:</span>
                <span className="block">{companies.modification_date ? date1 : "----"}</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon icon="icon-park-outline:people" className='h-6 w-6' />
              </div>
              <div className="cursor-pointer" onClick={() => { navigate(`/companies/companydetail/employeelist/${id}`) }}>
                <span className="font-bold">Total Employees:</span>
                <span className='block'>{companies.total_employees ? companies.total_employees : "----"}</span>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  )
}

export default CompanyDetails