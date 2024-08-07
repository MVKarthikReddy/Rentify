import { useEffect, useState } from "react";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { Button, Modal } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log("Error getting offer listings", error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* -----------first  row----------- */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next<span className="text-rose-500"> home</span> here!
        </h1>
        <p className="text-xl text-slate-500 lg:text-3xl">
        Explore our extensive range of properties.{" "}
        </p>
        <div className="text-gray-500 text-xs sm:text-sm">
          Real Estate is your go-to destination for buying or renting properties,
          and we cater to all your needs. Find your perfect place here!
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          <span className="px-4 py-2 bg-gray-300 border rounded-lg hover:bg-gray-400" >
              Let's Search Properties
          </span>
        </Link>
        <div>
          {currentUser && (
            
            <span
              className="px-4 py-2 font-bold text-blue-800 bg-gray-200 border rounded-lg hover:bg-gray-400"
            >
              <Link to={"/create-listing"}>
                Upload a Property for <label className="text-blue-500 underline">Sale</label> or for <label className="text-blue-500 underline">Rent</label>
              </Link>
            </span>
          
        )}
        </div>
      </div>
      {/*-------------- swiper---------------- */}
      <>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[Autoplay, Navigation, EffectCoverflow, Pagination]}
          className="mySwiper"
          autoplay={{ delay: 3500 }}
        >
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[450px] w-[80%]  mx-auto"
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* listing results for offer, sale and rent */}

        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
}
