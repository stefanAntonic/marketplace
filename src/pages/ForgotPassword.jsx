import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from "react-toastify";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => setEmail(e.target.value);

  const handeleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Reset email was sent')

    } catch (error) {
      toast.error('Could not send reset email')
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={handeleSubmit}></form>
        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <Link className="forgotPasswordLink" to="/sing-in">
          Sign in
        </Link>
        <div className="signInBar">
          <div className="signInText">Send Reset Link</div>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
