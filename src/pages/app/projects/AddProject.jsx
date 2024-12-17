import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushProject } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import FormGroup from "@/components/ui/FormGroup";
import { fetchPOST } from "@/store/api/apiSlice";
import { toast } from "react-toastify";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const assigneeOptions = [
  { value: "mahedi", label: "Mahedi Amin", image: avatar1 },
  { value: "sovo", label: "Sovo Haldar", image: avatar2 },
  { value: "rakibul", label: "Rakibul Islam", image: avatar3 },
  { value: "pritom", label: "Pritom Miha", image: avatar4 },
];
const options = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
  {
    value: "update",
    label: "update",
  },
];

const OptionComponent = ({ data, ...props }) => {
  //const Icon = data.icon;

  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  );
};

const AddProject = () => {
  const { openProjectModal } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const FormValidationSchema = yup
    .object({
      company_name: yup.string().trim().required("Companes name is required"),
      email : yup.string().email("Email format is wrong").required("Email is required"),
      password : yup.string().required("Email is required")
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const company = await fetchPOST(`https://api.dyzo.ai/super/create_company_and_super_admin/`, {body : data})
      console.log('comapnyasdfasfsafdsadf', company)
      if(company.status){
        toast.success("Company added successfully")
        reset()
      }
    } catch (error) {
      toast.error('Failed to add company')
    }
 
  };

  return (
    <div>
      <Modal
        title="
        Add Company"
        labelclassName="btn-outline-dark"
        activeModal={openProjectModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="company_name"
            label="Company Name"
            placeholder="Company Name"
            register={register}
            error={errors.company_name}
          />
             <Textinput
            name="email"
            label=" Email"
            placeholder="Email"
            register={register}
            error={errors.email}
          />
             <Textinput
            name="password"
            label="Password"
            placeholder="Password"
            register={register}
            error={errors.password}
          />
         
     

     

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddProject;
