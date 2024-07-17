'use client';
import React, { useState, useEffect } from 'react';
import './hotel.css'
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
const page: React.FC = () => {
    const [numberOfDays, setNumberOfDays] = useState<number>(0);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [hotelName, setHotelName] = useState('');
    const [guests, setGuests] = useState('');
    const [rooms, setRooms] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const hotelNameParam = searchParams.get('hotelName');
        const priceParam = searchParams.get('price');
        if (hotelNameParam) setHotelName(hotelNameParam);
        if (priceParam) setPrice(priceParam);
    }, [searchParams]);

    const calculateNumberOfDays = () => {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const differenceInTime = checkoutDate.getTime() - checkinDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // 1000 milliseconds in a second, 3600 seconds in an hour, 24 hours in a day
        setNumberOfDays(Math.ceil(differenceInDays)); // Round up to the nearest whole number
    };

    // Call the function whenever the check-in or check-out dates change
    useEffect(() => {
        calculateNumberOfDays();
    }, [checkin, checkout]);


    const handleform = () => {
        window.location.href = `/payment?hotelName=${encodeURIComponent(hotelName)}&price=${encodeURIComponent(price)}&guests=${encodeURIComponent(guests)}&rooms=${encodeURIComponent(rooms)}&checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}&numberOfDays=${encodeURIComponent(numberOfDays)}`;

    };

    return (
        <>

            <section className="book">
                <h1 className="heading">
                    <span>b</span>
                    <span>o</span>
                    <span>o</span>
                    <span>k</span>
                    <span className="space"></span>
                    <span>n</span>
                    <span>o</span>
                    <span>w</span>
                </h1>
                <div className="row">
                    <div className="img">
                        <img src="/book.jpg" alt="" />
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleform(); }}>
                        <div className="inputBox">
                            <h3>Choose No. OF Rooms</h3>
                            <input
                                type="number"
                                placeholder="No. of Rooms"
                                value={rooms}
                                onChange={(e) => setRooms((e.target.value))}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <h3>No. of Guests</h3>
                            <input
                                type="number"
                                placeholder="Enter No. of guests"
                                value={guests}
                                onChange={(e) => setGuests((e.target.value))}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <h3>Check-in Date</h3>
                            <input
                                type="date"
                                value={checkin}
                                onChange={(e) => setCheckin(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <h3>Check-out Date</h3>
                            <input
                                type="date"
                                value={checkout}
                                onChange={(e) => setCheckout(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <h3>Number of Days For Hotel Stay: {numberOfDays}</h3>
                        </div>

                        <button type="submit" className="btn ">Book Now</button>
                    </form>
                </div>
            </section>

        </>
    )
}

export default page