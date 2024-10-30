import Image from "next/image";
import React, { useState } from "react";
import logo from "./logo.png";
import {
  FaInbox,
  FaProductHunt,
  FaIcons,
  FaChartLine,
  FaTags,
  FaRegPaperPlane,
  FaEnvelope,
  FaCog,
  FaMailBulk,
  FaTrafficLight,
  FaShoppingCart,
  FaDollarSign,
  FaCloudUploadAlt,
  FaUserCheck,
  FaAngleDown,
} from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import Select, { MultiValue } from "react-select";
import { RiUploadCloudFill } from "react-icons/ri";
import axios from "axios";

type tagOptions = {
  value: string;
  label: string;
};
// Sample tag options
const tagOptions: tagOptions[] = [
  { value: "flat", label: "Flat" },
  { value: "business", label: "Business" },
  { value: "3d", label: "3D" },
  { value: "line", label: "Line" },
  { value: "alert", label: "Alert" },
];

type MenuItem = {
  name: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { name: "Overview", icon: <FaInbox /> },
  { name: "Inbox", icon: <FaInbox /> },
  { name: "Product Management", icon: <FaProductHunt /> },
  { name: "Icon Management", icon: <FaIcons /> },
  { name: "Analytics", icon: <FaChartLine /> },
  { name: "Sales & Pricing", icon: <FaTags /> },
  { name: "Subscription", icon: <FaRegPaperPlane /> },
  { name: "Newsletter Management", icon: <FaEnvelope /> },
  { name: "Setting", icon: <FaCog /> },
  { name: "Email Campaigns", icon: <FaMailBulk /> },
  { name: "Traffic Insights", icon: <FaTrafficLight /> },
  { name: "Order Management", icon: <FaShoppingCart /> },
  { name: "Pricing Management", icon: <FaDollarSign /> },
];

const Demo: React.FC = () => {
  const [iconStyle, setIconStyle] = useState<string>("");
  const [license, setLicense] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<MultiValue<tagOptions>>([]);
  const [file, setFile] = useState<File>();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  console.log(file);
  // Handle form submission
  // Handle select change for icon style, license, and category
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: (value: string) => void
  ) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (iconStyle) formData.append("iconStyle", iconStyle);
    if (license) formData.append("license", license);
    if (category) formData.append("category", category);

    try {
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error uploading form:", error);
    }
    console.log("form data", formData);
  };

  return (
    <div className="w-full bg-[#F0F4FF]">
      <div className="grid  grid-cols-12 h-screen  bg-[#F0F4FF]">
        <div className="col-span-2 rounded-r-[40px]  bg-white   ">
          <div className="m-5">
            <Image src={logo} alt="" className="mb-4" />

            <ul className="space-y-3 ">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600"
                >
                  <span className="mr-2 text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
            <div className=" bg-[#F0F4FF]  rounded-xl shadow-md text-center mt-20">
              <div className="flex justify-center mb-4 mt-[-30px]">
                <div className=" bg-[#F0F4FF] rounded-full flex items-center justify-center">
                  <FaCloudUploadAlt className="text-purple-600 " size={40} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800  px-2">
                Up Your Product Now
              </h3>
              <p className="text-gray-500 mb-4 p-2">
                Get 1 month free and unlock
              </p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-full  text-sm font-medium hover:bg-blue-700 transition">
                <FaCloudUploadAlt className="inline mr-2" /> Upload Now
              </button>

              <br />
              <br />
            </div>
          </div>
        </div>
        {/* main container  */}
        <div className="col-span-10 bg-[#F0F4FF]">
          {/* header  */}
          <div className="w-[95%] mx-auto">
            <div className="flex justify-between items-center p-4 bg-indigo-50">
              {/* Breadcrumb and Title */}
              <div className="text-sm text-gray-600">
                <span>Pages / Add product</span>
                <h1 className="text-2xl font-bold text-gray-800">
                  Add new Icon
                </h1>
              </div>

              {/* Search and Icons */}
              <div className="flex items-center space-x-4 ">
                <div className="rounded-full  p-2  bg-white ">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border-gray-300 border  rounded-full outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-2">
                  <div className="p-4 rounded-full bg-white">
                    <button className="relative w-8 h-8 flex items-center justify-center">
                      {/* Notification Badge */}
                      <span className="absolute -top-0 -right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        0
                      </span>

                      {/* Notification Icon */}
                      <IoIosNotifications size={30} className="text-gray-500" />
                    </button>
                  </div>

                  <div className="p-4 rounded-full bg-white">
                    <button className=" w-8 h-8 flex items-center justify-center">
                      {/* Notification Badge */}

                      {/* Notification Icon */}
                      <IoSettings size={30} className="text-gray-500" />
                    </button>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center p-3 space-x-2 rounded-full bg-white shadow-sm cursor-pointer">
                      {/* User Image */}
                      <FaUserCheck size={30} />

                      {/* User Info */}
                      <div className="flex flex-col leading-tight">
                        <h1 className="text-sm font-bold text-gray-800">
                          Mike Anton
                        </h1>
                        <p className="text-xs text-gray-500">Product Manager</p>
                      </div>

                      {/* Dropdown Icon */}
                      <FaAngleDown className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mt-4 w-[95%] mx-auto">
              {/* Left Text */}
              <p className="text-base font-medium text-gray-600">
                Add the icon information below
              </p>

              {/* Buttons */}
              <div className="flex space-x-2">
                {/* Save as Draft Button */}
                <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-100">
                  Save as draft
                </button>

                {/* Publish Product Button */}
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center space-x-1"
                  type="submit"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14m-7-7h14"
                    />
                  </svg>
                  <span>Publish product</span>
                </button>
              </div>
            </div>

            <div className="w-full mt-10">
              <div className="p-10 space-y-4 rounded-lg bg-white w-[96%] mx-auto py-10 ">
                {/* Form Inputs */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Icon Style Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 font-medium mb-1">
                      Icon Style <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="border border-gray-300 p-2 rounded-lg   focus:outline-none focus:border-indigo-500"
                      onChange={(e) => handleSelectChange(e, setIconStyle)}
                      value={iconStyle}
                    >
                      <option>Flat</option>
                      <option>3D</option>
                      <option>Line</option>
                    </select>
                  </div>

                  {/* License Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 font-medium mb-1">
                      License <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-indigo-500"
                      onChange={(e) => handleSelectChange(e, setLicense)}
                      value={license}
                    >
                      <option>Premium</option>
                      <option>Free</option>
                    </select>
                  </div>

                  {/* Categories Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 font-medium mb-1">
                      Categories <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-indigo-500"
                      onChange={(e) => handleSelectChange(e, setCategory)}
                      value={category}
                    >
                      <option>Alert</option>
                      <option>Business</option>
                      <option>Education</option>
                    </select>
                  </div>
                </div>
                <br />
                {/* File Upload Area */}
                <div>
                  {" "}
                  <label
                    htmlFor="file"
                    className="border-2 cursor-pointer border-dashed bg-gray-50 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500"
                  >
                    {" "}
                    <RiUploadCloudFill size={40} className="text-center" />
                    <p className="text-sm">
                      Drag & Drop or{" "}
                      <span className="text-indigo-600 cursor-pointer">
                        Choose file
                      </span>{" "}
                      to upload
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Accepted file formats: ZIP
                    </p>
                  </label>
                  <input
                    name="file"
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {/* Categories Dropdown */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 font-medium mb-1">
                    Tags <span className="text-red-500">*</span>
                  </label>
                  <Select
                    isMulti
                    options={tagOptions}
                    className="basic-multi-select rounded-lg"
                    classNamePrefix="select"
                    placeholder="Select or add tags"
                    onChange={(selectedOptions) =>
                      setSelectedTags(selectedOptions)
                    }
                    value={selectedTags}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    e.g., flat, business, outline
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Demo;
