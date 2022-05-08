import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";



import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(null);


  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper slidesPerView={1} pagination={{ clickable: true }} >
        {listing.imgUrls.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="swiperSlideDiv"
            
            >
              <img src={listing.imgUrls[index]} alt=""  className="swiperSlideImage"/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>  

     

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="share" />
        {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}
      </div>
      

      <div className="listingDetails">
        <p className="listingName">
          {listing?.name} - $
          {listing?.offer
            ? listing?.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing?.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation">Location: {listing?.location}</p>
        <p className="listingType">
          For {listing?.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing?.offer && (
          <p className="discountPrice">
            You have ${listing?.regularPrice - listing?.discountedPrice}{" "}
            discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing?.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {listing?.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Batroom"}
          </li>
          <li>{listing?.parking && "Parking spot"}</li>
          <li>{listing?.furnished && "Furnished"}</li>
        </ul>

        {auth.currentUser?.uid !== listing?.userRef && (
          <Link
            to={`/contact/${listing?.userRef}?listingName=${listing?.name}`}
            className="primaryButton"
          >
            Contact owner
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
