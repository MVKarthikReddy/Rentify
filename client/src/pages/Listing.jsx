import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
/* import SwiperCore from 'swiper'; */
import "swiper/css/bundle";
import { Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading ? (
        <Spinner
          color="success"
          className="h-12 w-12 my-7 flex mx-auto"
          aria-label="Success spinner example"
        />
      ) : null}

      {error && (
        <p color="failure" className="text-center my-7">
          Something went wrong!
        </p>
      )}

      {/* Add Swiper */}

      {listing && !loading && !error && (
        <>
          <Swiper
            pagination={{ type: "progressbar" }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-200 cursor-pointer">
            <FaShare
              className="text-slate-500 
            "
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied!
            </p>
          )}

          {/* ------------------------ Listing Info ------------------------- */}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 ">
          <p className="text-2xl font-semibold">
              {listing.name} - &#8377;{" "}
              {listing.offer
                ? (
                  listing.regularPrice - listing.discountPrice
                  ).toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")
              }
              {listing.type === "rent" && " / month"}
            </p>
            {listing.offer && (
              <>
                <div className="flex gap-3 items-center text-red-600">
                  <p>Actual Price:</p>
                  <p className="flex items-center text-red-700 text-xl decoration-2 line-through ">
                    &#8377;{+listing.regularPrice}
                  </p>
                  <p className="flex items-center text-green-700 text-xl">
                    (
                    {(
                      -(
                        (listing.regularPrice -
                          (listing.regularPrice - listing.discountPrice)) /
                        listing.regularPrice
                      ) * 100
                    ).toFixed(2)}
                    % off )
                  </p>
                </div>
              </>
            )}
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            {/* -------------- */}
            <div className="flex gap-4">
              <p className="bg-red-800 w-full max-w-[200px] text-white text-center p-1 rounded-tr-3xl ">
                {listing.type === "rent" ? "For Rent " : "For Sale"}
              </p>

              {listing.offer && (
                <p className="bg-green-500 w-full max-w-[200px] text-white text-center p-1 rounded-tl-3xl animate-pulse">
                  &#8377; {+listing.discountPrice} Discount Price
                </p>
              )}
            </div>
            {/* ---------------- */}
            <>
              <h1 className="text-slate-600 font-bold text-2xl mt-2">
                About Property
              </h1>
              <p className="text-slate-800">{listing.description}</p>
            </>

            {/* ------- */}
            <>
              <h1 className='text-slate-600 text-2xl font-bold'>Amenities</h1>
              <ul className="text-green-900 font-semibold text-lg flex flex-wrap items-center gap-4 sm:gap-6 ">
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBed className="text-5xl" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} bedrooms`
                    : `${listing.bedrooms} bedroom`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-4xl" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} bathrooms `
                    : `${listing.bathrooms} bathroom `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-4xl" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-4xl" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
            </>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <Button
                onClick={() => setContact(true)}
                outline
                gradientDuoTone="greenToBlue"
              >
                Contact landlord
              </Button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
}
