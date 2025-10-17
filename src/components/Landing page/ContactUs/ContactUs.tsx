"use client";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ContactUs() {
  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      message: Yup.string().max(500, 'Must be 500 characters or less').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[var(--main-hero)]">Contact Us</h2>
        <div className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-[var(--main-hero)] text-sm font-bold mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-[var(--foreground)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--hover)] focus:border-transparent"
                placeholder="Your Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-[var(--destructive)] text-xs mt-1">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[var(--main-hero)] text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-[var(--foreground)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--hover)] focus:border-transparent"
                placeholder="Your Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-[var(--destructive)] text-xs mt-1">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-[var(--main-hero)] text-sm font-bold mb-2">Message:</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-[var(--foreground)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--hover)] focus:border-transparent"
                placeholder="Your Message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              ></textarea>
              {formik.touched.message && formik.errors.message ? (
                <div className="text-[var(--destructive)] text-xs mt-1">{formik.errors.message}</div>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[var(--main-hero)] hover:bg-[var(--hover)] text-white hover:text-[var(--main-hero)] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
