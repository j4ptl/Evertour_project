"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import '.././hotels.css';
import Loader from '../../../components/loading.js';
export default function HotelsByState() {
  const router = useRouter();
  const params = useParams();
  const state = params?.state;
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchHotels = async () => {
      if (state) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hotels?populate=*`);
          const data = await res.json();
          console.log("API Response:", data);
          setLoading(false);
          const stateData = data.data.find(data => data.attributes.State === state);
          console.log("State Data:", stateData);

          if (stateData) {
            const fetchedHotels = [
              {
                id: 1,
                HotelName: stateData.attributes.ho1,
                Description: stateData.attributes.desc1,
                acco1: stateData.attributes.acco1,
                acco2: stateData.attributes.acco2,
                acco3: stateData.attributes.acco3,
                day1: stateData.attributes.h1_day1,
                day2: stateData.attributes.h1_day2,
                day3: stateData.attributes.h1_day3,
                day4: stateData.attributes.h1_day4,
                day5: stateData.attributes.h1_day5,
                review: stateData.attributes.h1_review,
                Price: stateData.attributes.h1_price,
                Image1: stateData.attributes.h1_i1?.data?.attributes,
                Image2: stateData.attributes.h1_i2?.data?.[0]?.attributes,
                Image3: stateData.attributes.h1_i3?.data?.[0]?.attributes,
              },
              {
                id: 2,
                HotelName: stateData.attributes.ho2,
                Description: stateData.attributes.desc2,
                acco1: stateData.attributes.h2_acco1,
                acco2: stateData.attributes.h2_acco2,
                acco3: stateData.attributes.h2_acco3,
                day1: stateData.attributes.h2_day1,
                day2: stateData.attributes.h2_day2,
                day3: stateData.attributes.h2_day3,
                day4: stateData.attributes.h2_day4,
                day5: stateData.attributes.h2_day5,
                review: stateData.attributes.h2_review,
                Price: stateData.attributes.h2_price,
                Image1: stateData.attributes.h2_i1?.data?.attributes,
                Image2: stateData.attributes.h2_i2?.data?.attributes,
                Image3: stateData.attributes.h2_i3?.data?.attributes,
              }
            ];
            setHotels(fetchedHotels);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setHotels([]);
        }
      }
    };

    fetchHotels();
  }, [state]);

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const handlePayNow = (hotelName, price) => {
    if (isAuthenticated()) {
      window.location.href = `/hotel_form?hotelName=${encodeURIComponent(hotelName)}&price=${encodeURIComponent(price)}`;
    } else {
      window.location.href = '/login';
    }
  };

  const handleHotelSelect = (hotel) => {
    setCurrentHotel(hotel);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Payment details:', userDetails);
    router.push('/confirmation');
  };

  const prevImage = (sliderId) => {
    // Implement logic for previous image in slider if needed
  };

  const nextImage = (sliderId) => {
    // Implement logic for next image in slider if needed
  };


  if (loading) return <Loader/>;


  return (
    <div>
      {!currentHotel && (
        <div>
          <h1 style={{ textAlign: 'center', color: '#134b5f' }}>Hotels in {state.replace('_', ' ')}</h1>
          {hotels.map((hotel) => {
            const imageAttributes = [
              hotel?.Image1,
              hotel?.Image2,
              hotel?.Image3
            ].filter(Boolean); // Filter out undefined or null entries

            return (
              <section className="section" key={hotel.id}>
                <div className="card">
                  <div className="slider" id={`slider${hotel.id}`}>
                    {Array.isArray(imageAttributes) &&
                      imageAttributes.map((imageAttr, index) => (
                        <img
                          key={index}
                          className="slider-img"
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageAttr.url}`}
                          alt={`Image ${index + 1} for ${hotel.HotelName}`}
                        />
                      ))}
                    <div className="prev" onClick={() => prevImage(`slider${hotel.id}`)}>&#10094;</div>
                    <div className="next" onClick={() => nextImage(`slider${hotel.id}`)}>&#10095;</div>
                  </div>

                  <div className="content">
                    <div className="details-section">
                      <h1 className="font-bold text-3xl lg:text-4xl">{hotel.HotelName}</h1>
                      <div className="details">
                        <p className="text-gray-500">{hotel.Description}</p>
                      </div>
                      <div className="accommodations mt-4">
                        <h2 className="text-xl font-semibold">Accommodations:</h2>
                        <ul className="text-gray-500 list-disc list-inside">
                          <li>{hotel.acco1}</li>
                          <li>{hotel.acco2}</li>
                          <li>{hotel.acco3}</li>
                        </ul>
                      </div>
                      <div className="places-details mt-4">
                        <h2 className="text-xl font-semibold">Packages:</h2>
                        <p className="text-gray-500">
                          <span>{hotel.day1}<br /></span>
                          <span>{hotel.day2}<br /></span>
                          <span>{hotel.day3}<br /></span>
                          <span>{hotel.day4}<br /></span>
                          <span>{hotel.day5}<br /></span>
                        </p>
                      </div>
                      <div className="rating mt-4">
                        <h2 className="text-xl font-semibold">Rating:</h2>
                        <div className="stars">★★★★☆</div>
                      </div>
                      <div className="reviews mt-4">
                        <h2 className="text-xl font-semibold">Reviews:</h2>
                        <p className="text-gray-500">"{hotel.review}"</p>
                      </div>
                      <div className="pricing mt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">Rs.{hotel.Price}</span>
                          <span className="text-gray-500">/night</span>
                        </div>
                      </div>
                      <button
                        className="pay-now mt-6 bg-primary text-primary-foreground px-8 py-2 rounded-md hover:bg-primary/90"
                        onClick={() => handlePayNow(hotel.HotelName, hotel.Price)}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
