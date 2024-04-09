import { useEffect, useState } from "react";
import { handleGoogleSignUp } from "../utils/firebase";

export default function SignUpGoogle() {
  const handleSignUp = async () => {
    try {
      await handleGoogleSignUp((user) => {
        console.log(user);
      });
    } catch (error) {
      console.error("Error during Google Sign-Up:", error);
    }
  };

  return (
    <div>
      <form>
        <button
          type="button"
          onClick={handleSignUp}
          className="bg-white text-black p-4"
          style={{ border: "1px solid black" }}
        >
          Sign Up with Google
        </button>
      </form>
    </div>
  );
}
