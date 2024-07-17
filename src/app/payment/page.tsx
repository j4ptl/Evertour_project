'use client';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import './payment.css'
import axios from 'axios';
import Loader from '../../components/loading.js';


const PaymentForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string | null>(null);
  const [hotelName, setHotelName] = useState('');
  const [price, setPrice] = useState('');
  const [guests, setGuests] = useState('');
  const [rooms, setRooms] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [numberOfDays, setNumberOfDays] = useState<number>(0); // State for the number of days
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const hotelNameParam=searchParams.get('hotelName');
    const priceParam=searchParams.get('price');
    const roomsParam = searchParams.get('rooms');
    const guestsParam = searchParams.get('guests');
    const checkinParam = searchParams.get('checkin');
    const checkoutParam = searchParams.get('checkout');
    const numberOfDaysParam=searchParams.get('numberOfDays');
    if(hotelNameParam)setHotelName(hotelNameParam);
    if(priceParam)setPrice(priceParam);
    if (roomsParam) {
      setRooms(roomsParam);
      setPaymentAmount(Number(priceParam) * parseInt(roomsParam)); // Calculate total price
    }
    if (guestsParam) setGuests(guestsParam);
    if (checkinParam) setCheckin(checkinParam);
    if (checkoutParam) setCheckout(checkoutParam);
  }, [searchParams]);
  useEffect(() => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const differenceInTime = checkoutDate.getTime() - checkinDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    setNumberOfDays(Math.ceil(differenceInDays)); // Round up to the nearest whole number
  }, [checkin, checkout]);

  useEffect(() => {
    const storedUsername: string | null = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  const [paymentAmount, setPaymentAmount] = useState(Number(price)|| 5155.0);
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');
  const [cvvCode, setCvvCode] = useState<string>('');

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/card-infos`, {
        data: {
          card_number: cardNumber,
          card_holder_name: cardHolderName,
          cvv_number: cvvCode,
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          Username:username,
        },
      });
      console.log('Payment info saved:', response.data);
      // Handle post-payment actions, like navigation
      window.location.href =`/ticket?hotelName=${encodeURIComponent(hotelName)}&price=${encodeURIComponent(price)}&guests=${encodeURIComponent(guests)}&rooms=${encodeURIComponent(rooms)}&checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}&price1=${encodeURIComponent(price1)}&cardHolderName=${encodeURIComponent(cardHolderName)}`;
    } catch (error) {
      console.error('Error saving payment info:', error);
    }
  };
  const price1=(Number(price) * parseInt(rooms)*numberOfDays);
  // router.push(/ticket?hotelName=${encodeURIComponent(hotelName)}&price=${encodeURIComponent(price)}&guests=${encodeURIComponent(guests)}&rooms=${encodeURIComponent(rooms)}&checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}&price1=${encodeURIComponent(price1)}&cardHolderName=${encodeURIComponent(cardHolderName)});
  if (loading) return <Loader />;

  return (
    <div className="payment-form">
      <h2 style={{color:'#1e789a'}}>Payment Details</h2>
      <div className="card-logos">
        <img src="/visa.png" alt="Visa" />
        <img src="/mastercard.png" alt="MasterCard" />
        <img src="/amex.png" alt="American Express" />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
      <div className="form-group">
        <label>PAYMENT AMOUNT</label>
        <input type="text" value={` ₹ ${(price1)|| 0}`} readOnly />
      </div>
      <div className="form-group">
        <label>CARD NUMBER</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter card number"
          minLength={12}
          maxLength={12}
          required
        />
      </div>
      <div className="form-group">
        <label>CARD HOLDER'S NAME</label>
        <input
          type="text"
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </div>
      <div className="form-group">
        <label>EXPIRY DATE</label>
        <div className="expiry-date">
          <select
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
            required
          >
            <option value="">Month</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
            required
            
          >
            <option value="">Year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>CVV CODE</label>
        <input
          type="text"
          value={cvvCode}
          onChange={(e) => setCvvCode(e.target.value)}
          placeholder="CVV"
          minLength={3}
          maxLength={3}
          required
          
        />
      </div>
      <button type="submit" className="btn ">Make payment</button>
      </form>
      
    </div>
  );
};

export default PaymentForm;