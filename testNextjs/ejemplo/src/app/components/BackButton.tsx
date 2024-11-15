'use client';
import { useRouter } from 'next/navigation';
import React from "react";
const BackButton: React.FC = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <button onClick={handleBack}>
            <svg width="48" height="34" viewBox="0 0 68 54" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_3_20)">
                    <rect x="0.666687" y="0.40625" width="66.6667" height="52.7344" rx="15"
                          fill="#F9F9F9" fillOpacity="0.2"/>
                </g>
                <path d="M38 33.1016L30 26.7734L38 20.4453" stroke="#F9F9F9" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                    <filter id="filter0_b_3_20" x="-9.33331" y="-9.59375" width="86.6667"
                            height="72.7344" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
                        <feComposite in2="SourceAlpha" operator="in"
                                     result="effect1_backgroundBlur_3_20"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3_20"
                                 result="shape"/>
                    </filter>
                </defs>
            </svg>
        </button>
    );
};

export default BackButton;