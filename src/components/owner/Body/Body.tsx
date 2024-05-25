import React from 'react'
import Card from '../../admin/Card'
import hotel from "/src/assets/images/hotel.svg"
import { useNavigate } from 'react-router-dom'

const Body = () => {

  return (

    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Asish!</h1>
          <p className="mt-1 text-gray-600">
            Guests can reserve your place 24 hours after you publish – here’s how to prepare.
          </p>
          <div className="mt-4">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md">
              Verify your identity
            </button>
            <p className="text-red-500 mt-1">Required to publish</p>
            <a href="#" className="text-blue-500 underline mt-1">Get started</a>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Your next steps</h2>
          <p className="mt-2 text-gray-600">It's time to review a couple of current settings.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Turn Instant Book on or off</h3>
              <p className="mt-1 text-gray-600">Choose how guests will book</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Offer special promotions</h3>
              <p className="mt-1 text-gray-600">Add discounts to attract guests</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Calendar reviewed</h3>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Cancellation policies reviewed</h3>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">House rules reviewed</h3>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Checkout instructions reviewed</h3>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">We’re here to help</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Guidance from a Superhost</h3>
              <p className="mt-1 text-gray-600">
                We'll match you with an experienced Host who can help you get started.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Contact specialised support</h3>
              <p className="mt-1 text-gray-600">
                As a new Host, you get one-tap access to a specially trained support team.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>

  )
}

export default Body
