"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import { useVerifyUserMutation } from "@/services/login";
import toast from "react-hot-toast";
import { useLazyGetUserQuery } from "@/services/user";

interface IUSER {
  token: string;
}
export default function Signin() {
  const [user, setUser] = useState<IUSER>({ token: "" });
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [verifyUser] = useVerifyUserMutation();
  // const [getUser] = useLazyGetUserQuery();
  // useEffect(() => {
  //   getUser({})
  // }, [getUser]);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const urlToken = searchParams.get("token");

  //   if (urlToken) {
  //     const decodedToken = decodeURIComponent(urlToken);
  //     setUser({ token: decodedToken });
  //   }
  // }, []);

  // // Automatically verify user when token is available
  // useEffect(() => {
  //   if (user.token.length > 0) {
  //     onSubmit();
  //   }
  // }, [user.token]);

 
  return (
    <>
     
          <GoogleSigninButton text="Sign in" />
          <div className="my-6 flex items-center justify-center">
            <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
            <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
              Or sign in with email
            </div>
            <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
          </div>
          <div>
            <SigninWithPassword />
          </div>
          <div className="mt-6 text-center">
            <p>
              Don’t have any account?{" "}
              <Link href="/auth/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>{" "}
        </>
     
  );
}
