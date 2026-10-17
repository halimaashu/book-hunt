'use client';

import React, { useState } from 'react';
import { 
  FaBook, 
  FaGraduationCap, 
  FaShoppingCart, 
  FaCheckCircle, 
  FaTruck, 
  FaPhoneAlt, 
  FaUser, 
  FaMapMarkerAlt,
  FaTimes
} from 'react-icons/fa';

export default function PolyLeadersPage() {
  // Form State Management
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [publisher, setPublisher] = useState('Haq Publication');
  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Customer Info State
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });

  // Estimated Price Calculation (Sample price per set)
  const basePricePerSet = 1200;
  const totalPrice = department && semester ? basePricePerSet * quantity : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!department || !semester) {
      alert('Please select both Department and Semester!');
      return;
    }
    
    alert(`Thank you, ${customerInfo.name}! Your order for ${department} (${semester} Semester) - ${quantity} set(s) has been placed successfully.`);
    
    setShowOrderModal(false);
    setCustomerInfo({ name: '', phone: '', address: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-400 mb-4">
          <FaGraduationCap className="text-4xl" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
          Polytechnic Book Set Order
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select your Department and Semester to order a complete 1-set book package delivered directly to your doorstep.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Selection Form */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
            <FaBook className="text-blue-600 dark:text-blue-400" /> Select Book Details
          </h2>

          <div className="space-y-5">
            {/* Department Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Technology / Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="">-- Select Department --</option>
                <option value="Computer Science & Technology (CST/CSE)">Computer Science & Technology (CSE)</option>
                <option value="Civil Technology">Civil Technology</option>
                <option value="Electrical Technology">Electrical Technology</option>
                <option value="Mechanical Technology">Mechanical Technology</option>
                <option value="Electronics Technology">Electronics Technology</option>
                <option value="Power Technology">Power Technology</option>
                <option value="Architecture & Interior Design Technology">Architecture & Interior Design Technology</option>
                <option value="Automobile Technology">Automobile Technology</option>
                <option value="Refrigeration & Air-Conditioning (RAC)">Refrigeration & Air-Conditioning (RAC)</option>
                <option value="Textile Technology">Textile Technology</option>
                <option value="Chemical Technology">Chemical Technology</option>
                <option value="Environmental Technology">Environmental Technology</option>
                <option value="Electromedical Technology">Electromedical Technology</option>
                <option value="Telecommunication Technology">Telecommunication Technology</option>
                <option value="Data Telecommunication & Networking">Data Telecommunication & Networking</option>
                <option value="Marine Technology">Marine Technology</option>
                <option value="Shipbuilding Technology">Shipbuilding Technology</option>
                <option value="Mechatronics Technology">Mechatronics Technology</option>
                <option value="Construction Technology">Construction Technology</option>
                <option value="Food Technology">Food Technology</option>
                <option value="Graphic Design & Printing Technology">Graphic Design & Printing Technology</option>
                <option value="Glass & Ceramics Technology">Glass & Ceramics Technology</option>
                <option value="Surveying Technology">Surveying Technology</option>
                <option value="Garments Design & Pattern Making">Garments Design & Pattern Making</option>
                <option value="Apparel Manufacturing Technology">Apparel Manufacturing Technology</option>
                <option value="Instrumentation & Process Control Technology">Instrumentation & Process Control Technology</option>
                <option value="Mining & Mine Surveying Technology">Mining & Mine Surveying Technology</option>
                <option value="Diploma in Agriculture">Diploma in Agriculture</option>
                <option value="Diploma in Fisheries">Diploma in Fisheries</option>
                <option value="Diploma in Forestry">Diploma in Forestry</option>
                <option value="Tourism & Hospitality Management">Tourism & Hospitality Management</option>
              </select>
            </div>

            {/* Semester Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="">-- Select Semester --</option>
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
                <option value="3rd">3rd Semester</option>
                <option value="4th">4th Semester</option>
                <option value="5th">5th Semester</option>
                <option value="6th">6th Semester</option>
                <option value="7th">7th Semester</option>
                <option value="8th">8th Semester</option>
              </select>
            </div>

            {/* Publisher Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Publisher / Publication
              </label>
              <select
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="Haq Publication">Haq Publication</option>
                <option value="Technical Publication">Technical Publication</option>
                <option value="Standard Publication">Standard Publication</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Quantity (Set)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3 flex items-center gap-2">
              <FaShoppingCart className="text-blue-600 dark:text-blue-400" /> Order Summary
            </h3>

            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-gray-700">
                <span>Department:</span>
                <span className="font-semibold text-gray-900 dark:text-white truncate max-w-[150px]">{department || 'Not selected'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-gray-700">
                <span>Semester:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{semester ? `${semester} Semester` : 'Not selected'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-gray-700">
                <span>Publication:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{publisher}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-gray-700">
                <span>Quantity:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{quantity} Set(s)</span>
              </div>
              <div className="flex justify-between py-2 text-base font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 p-2 rounded-lg mt-4">
                <span>Estimated Price:</span>
                <span>৳ {totalPrice} BDT</span>
              </div>
            </div>

            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-2 mb-6">
              <li className="flex items-center gap-1.5"><FaCheckCircle className="text-green-500" /> Updated Regulation 2022 Curriculum</li>
              <li className="flex items-center gap-1.5"><FaTruck className="text-blue-500" /> Cash on Delivery Available</li>
            </ul>
          </div>

          <button
            onClick={() => {
              if (!department || !semester) {
                alert('Please select Department and Semester first!');
                return;
              }
              setShowOrderModal(true);
            }}
            disabled={!department || !semester}
            className={`w-full py-3 px-4 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 ${
              department && semester
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaShoppingCart /> Order Now
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 dark:border-gray-700">
            <button 
              onClick={() => setShowOrderModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <FaTimes className="text-lg" />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Confirm Your Order</h3>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                  <FaUser className="text-blue-600 dark:text-blue-400" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                  <FaPhoneAlt className="text-blue-600 dark:text-blue-400" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="017XXXXXXXX"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" /> Delivery Address
                </label>
                <textarea
                  name="address"
                  required
                  rows="3"
                  placeholder="District, Upazila / Thana & Detailed Address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>Item:</strong> {department} ({semester} Semester)</p>
                <p><strong>Total Price:</strong> ৳ {totalPrice} BDT</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="w-1/2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}