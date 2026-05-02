"use client";
import React from "react";

import { Spinner } from "@heroui/react";

const loadingPage = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <Spinner>
        <Spinner.Indicator>...</Spinner.Indicator>
      </Spinner>
    </div>
  );
};

export default loadingPage;
