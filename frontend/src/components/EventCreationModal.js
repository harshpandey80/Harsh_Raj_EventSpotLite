// src/components/EventCreationModal.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createEvent } from "../services/api";
import "./EventCreationModal.css";

const EventCreationModal = ({ isOpen, onClose, onEventCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEvent(formData);
      toast.success("Event created successfully!");
      onEventCreated();
      setFormData({  
        name: "",
        date: "",
        location: "",
        description: "",
        imageUrl: "",
      });
      onClose(); // Close the modal
    } catch (error) {
      toast.error("Login to create event");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isOpen ? "scale-in" : "scale-out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1" htmlFor="name">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              rows="2"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2s-.896 2-2 2H6c-1.104 0-2-.896-2-2z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Create Event"
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 ml-2 bg-gray-300 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreationModal;
