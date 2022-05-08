import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";

function Contact() {
  const [message, setMessage] = useState("");
  const [owner, setOwner] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", params.ownerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setOwner(docSnap.data());
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Unable to get owners info");
      }
    };

    getOwner();
  }, [params.ownerId]);

  if (loading) {
    return <Spinner />;
  }

  const handleChange = e => {
     setMessage(e.target.value)
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Owner</p>
      </header>

      {owner !== null && (
        <main>
          <div className="contactOwner">
            <p className="ownerName">Contact: {owner?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="meassage"
                value={message}
                onChange={handleChange}
                className="textarea"
              ></textarea>
            </div>
            <a href={`mailto:${owner.email}?Subject=${searchParams.get('listingName')}?body=${message}`}>
                <button className="primaryButton" type="button">Send message</button>
            </a>

          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
