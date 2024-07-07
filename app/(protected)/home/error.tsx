"use client";

import React from "react";

// Components
import { Box } from "../../../components/commons/box";

interface ErrorProps {}

const Error: React.FC<ErrorProps> = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="text-neutral-400">Something Went Wrong!</div>
        </Box>
    );
};

export default Error;
