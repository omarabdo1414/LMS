"use client";
import { IForgetPass } from "@/constants/interfaces";

import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    async function createAdmin(body: IForgetPass) {
      try {
        const res = await fetch('https://edu-master-psi.vercel.app/admin/create-admin',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",

              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNfYWRtaW5AZ21haWwuY29tIiwiX2lkIjoiNjg1ODkxN2EwMTM2ZWFiMzA1YTMzMGYwIiwiaWF0IjoxNzU5OTQ2MTA2LCJleHAiOjE3NjAwMzI1MDZ9.4jhhPkUD8smf--Q53hGaoqGp6gIGx0gNNgCHULBxvTc",
            },
            body: JSON.stringify(body),
          }
        );
        console.log(res);
        const data = await res.json();
        console.log(data.token);
        return data;
      } catch (error) {
        console.error(error);
      }
    }

    async function run() {
      const body = {
        fullName: "ali",
        email: "ali@gmail.com",
        phoneNumber: "01115987343",
        password: "Ali123@",
        cpassword: "Ali123@",
      };

      const res = await createAdmin(body);
      console.log(res.token);
    }

    run();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}