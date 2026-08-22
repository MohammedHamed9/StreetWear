import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main class="grid h-screen place-items-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-2xl font-semibold ">404</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance  sm:text-7xl">
          Page not found
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            class="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
