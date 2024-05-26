import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-2xl w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg"
          }
          alt="listing cover"
          className="h-[240px] sm:h[220px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-b-xl"
        />
        <div className="p-3 flex flex-col gap-2 w-full ">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
        </div>
        <div className="flex items-center gap-1 ml-2 ">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-sm text-gray-600 truncate">{listing.address}</p>
        </div>
        <p className="text-sm text-gray-600 ml-2 line-clamp-2">
          {listing.description}
        </p>
        <p className="text-slate-500 m-2">
          &#8377;
          {listing.offer
            ? (
              listing.regularPrice - listing.discountPrice
              ).toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" && " / month"}
        </p>
        <div className="text-slate-700 flex gap-4 m-2 ">
          <div className="font-bold text-xs">
            {listing.bedrooms > 1
              ? `${listing.bedrooms} bedrooms`
              : ` ${listing.bedrooms} bedroom`}
          </div>
          <div className="font-bold text-xs">
            {listing.bathrooms > 1
              ? `${listing.bathrooms} bathrooms`
              : `${listing.bathrooms} bathroom`}
          </div>
        </div>
      </Link>
    </div>
  );
}
