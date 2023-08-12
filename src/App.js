import React, { useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css';
import states from './component/states';
import flightData from './component/excel-to-json.json';


function App() {
  const [selectedFromState, setSelectedFromState] = useState('');
  const [selectedToState, setSelectedToState] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date

  console.log(flightData)

  // Filter flights based on selected states
  const filteredFlights = flightData.Sheet1.filter((flight) => {
    return (
      flight.from === selectedFromState && (flight.to === selectedToState || flight.date === selectedDate)
    );
  });


  return (
    <div className="flex flex-col h-screen">
      <nav className="py-4 bg-blue-500 text-white text-center">
        <h1 className="font-bold text-xl">Welcome to Flight Booking</h1>
      </nav>`   `
      <div className="flex-1 flex justify-center items-center">
        <section className="px-4 py-8 bg-gray-100 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-1/2 pr-2">
              <label className="block font-semibold mb-2">From</label>
              <select
                className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                value={selectedFromState}
                onChange={(e) => setSelectedFromState(e.target.value)}
              >
                <option value="">Select From State</option>
                {states.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2 pl-2">
              <label className="block font-semibold mb-2">To</label>
              <select
                className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                value={selectedToState}
                onChange={(e) => setSelectedToState(e.target.value)}
              >
                <option value="">Select To State</option>
                {states.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy" // Set the desired date format
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => {
                console.log(filteredFlights); // Display the filtered flights in the console for now
              }}
            >
              Search Flights
            </button>
            <div>
              {
                Array.isArray(filteredFlights) &&
                filteredFlights.map((val, index) => {
                  return (
                    <div key={index} className="border mb-4 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-semibold">Date:</span> {val.date}
                        </div>
                        <div>
                          <span className="font-semibold">From:</span> {val.from}
                        </div>
                        <div>
                          <span className="font-semibold">Airline:</span> {val.airline}
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div>
                          <span className="font-semibold">Departure Time:</span> {val.dep_time}
                        </div>
                        <div>
                          <span className="font-semibold">Arrival Time:</span> {val.arr_time}
                        </div>
                        <div>
                          <span className="font-semibold">Price:</span> {val.price}
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="font-semibold">To:</span> {val.to}
                      </div>
                    </div>
                  );
                })
              }

            </div>
          </div>
        </section>
      </div>
      <footer className="py-4 bg-gray-200 text-center">
        &copy; {new Date().getFullYear()} Flight Booking App
      </footer>
    </div>
  );
}

export default App;
