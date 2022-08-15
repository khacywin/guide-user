import "./style.css";
import { GuideProvider as Provider } from "./GuideContext";
import React from "react";
export interface GuideUserProps {
    children: JSX.Element;
    message?: string;
    position?: ("left" | "right" | "top" | "bottom")[];
    step: number;
    text?: string;
    title?: string;
    type?: "button" | "input";
}
export default function Guide(props: GuideUserProps): JSX.Element;
export declare const GuideContext: React.Context<import("./GuideContext").IGuideContext>;
export declare const GuideProvider: typeof Provider;
