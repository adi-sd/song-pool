"use client";

import React from "react";
import { BounceLoader } from "react-spinners";

// Components
import { Box } from "../../../components/commons/box";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <BounceLoader color="#22c55e" size={40}></BounceLoader>
        </Box>
    );
};

export default Loading;
