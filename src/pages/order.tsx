import Head from "next/head";
import { Navbar } from "../components/components";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import React, { useState } from 'react';

const Order: NextPage = () => {

  const [quantity1, setQuantity1] = useState(1);
  const [totalPrice1, setTotalPrice1] = useState(0);
  const [quantity2, setQuantity2] = useState(1);
  const [totalPrice2, setTotalPrice2] = useState(0);

  const coffeeList = api.product.getAll.useQuery();
  const coffee1 = api.product.getById.useQuery({ id: 1 });
  const coffee2 = api.product.getById.useQuery({ id: 2 });

  // Access the data through the `data` property
  const coffeeData = coffeeList.data?.map((coffee) => {
    return {
      id: coffee.id,
      name: coffee.name,
      price: coffee.price,
    };
  });

  const handleQuantityChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity1(parseInt(event.target.value));
  };

  const handleOrderSubmit1 = () => {
    const price = coffee1.data?.price; // price of one coffee

    if (price) {
      const total = price * quantity1;
      setTotalPrice1(total);
      // TODO: send order to =============server and update inventory
    }
  }

  const handleQuantityChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity2(parseInt(event.target.value));
  };

  const handleOrderSubmit2 = () => {
    const price = coffee2.data?.price; // price of one coffee

    if (price) {
      const total = price * quantity2;
      setTotalPrice2(total);
      // TODO: send order to =============server and update inventory
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <Head>
        <title>Order Coffee</title>
        <meta name="description" content="Order coffee from Uncle Brew" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen display-flex flex space-x-6 items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{coffee1.data?.name}</h1>

          <div className="flex items-center mb-4">
            <label htmlFor="price" className="mr-2">
              Price:
            </label>
            <span id="price">${coffee1.data?.price}</span>
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="10"
              value={quantity1}
              onChange={handleQuantityChange1}
              className="border border-gray-300 rounded-md px-3 py-2 w-16"
            />
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="totalPrice" className="mr-2">
              Total Price:
            </label>
            <span id="totalPrice">${totalPrice1.toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrderSubmit1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Order
          </button>
        </div>


        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{coffee2.data?.name}</h1>

          <div className="flex items-center mb-4">
            <label htmlFor="price" className="mr-2">
              Price:
            </label>
            <span id="price">${coffee2.data?.price}</span>
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="10"
              value={quantity2}
              onChange={handleQuantityChange2}
              className="border border-gray-300 rounded-md px-3 py-2 w-16"
            />
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="totalPrice" className="mr-2">
              Total Price:
            </label>
            <span id="totalPrice">${totalPrice2.toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrderSubmit2}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Order
          </button>
        </div>
      </main >
    </>
  );
}

export default Order;