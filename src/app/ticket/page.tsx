'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import "../ticket/ticket.css";
import Loader from '../../components/loading.js';

const TicketPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [hotelName, setHotelName] = useState('');
  const [price, setPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [guests, setGuests] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [price1, setPrice1] = useState('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hotelNameParam = searchParams.get('hotelName');
    const cardHolderNameParam = searchParams.get('cardHolderName');
    const priceParam = searchParams.get('price');
    const price1Param = searchParams.get('price1');
    const roomsParam = searchParams.get('rooms');
    const guestsParam = searchParams.get('guests');
    const checkinParam = searchParams.get('checkin');
    const checkoutParam = searchParams.get('checkout');
    if (hotelNameParam) setHotelName(hotelNameParam);
    if (priceParam) setPrice(priceParam);
    if (price1Param) setPrice1(price1Param);
    if (cardHolderNameParam) setCardHolderName(cardHolderNameParam);
    if (roomsParam) setRooms(roomsParam);
    if (guestsParam) setGuests(guestsParam);
    if (checkinParam) setCheckin(checkinParam);
    if (checkoutParam) setCheckout(checkoutParam);

    // Save to Strapi when any of these values change
    saveToStrapi();
  }, [searchParams, hotelName, price1, cardHolderName, rooms, guests, checkin, checkout]);

  useEffect(() => {
    const storedUsername: string | null = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const saveToStrapi = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/booking-infos`, {
        data:{ cardHolderName:cardHolderName,
        hotelName:hotelName,
        price1:price1,
        rooms:rooms,
        guests:guests,
        checkin:checkin,
        checkout:checkout,
        }
      });
      console.log('Data saved successfully:', response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <nav>
        <div className="col logo">
          <span>HOTEL BOOKING</span>
        </div>
        <div className="col header">
          <span>E-Booking</span>
        </div>
      </nav>
      <div className="container">
        <div style={{ margin: '15px auto' }}>
          <h3>Important information</h3>
          <ul>
            <li>
              <strong>Reservation Confirmation:</strong> This document serves as your official reservation confirmation. Kindly present it upon your arrival at the hotel's reception desk.
            </li>
            <li>
              <strong>Guest Information:</strong> Each guest listed on this reservation is required to provide a printed copy of this document for check-in and other administrative purposes.
            </li>
            <li>
              <strong>Check-in Procedure:</strong>Early check-in requests may be accommodated subject to availability. Upon arrival, please proceed to the reception desk where our team will assist you with the check-in process.
            </li>
            <li>
              <strong>Check-out Procedure:</strong>Late check-out requests may be accommodated subject to availability. Please inform the reception desk in advance if you require a late check-out.
            </li>
            <li>
              <strong>Additional Information:</strong> For any inconvenience happens during Hotel Stay or facing any problems regarding Booking you can contact via E-mail : evertours864@gmail.com
            </li>
          </ul>
        </div>
        <h1>Ticket Details</h1>
        <p><strong>Customer's name:</strong> {username}</p>
        <p><strong>Hotel Name:</strong> {hotelName}</p>
        <p><strong>Price:</strong> {` ₹ ${price1}`}</p>
        <p><strong>Rooms:</strong> {rooms}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Check-in Date:</strong> {checkin}</p>
        <p><strong>Check-out Date:</strong> {checkout}</p>
        <button className="no-print" onClick={() => window.print()}>Print Booking</button>
      </div>
    </div>
  );
};

export default TicketPage;