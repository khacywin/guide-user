import "./style.css";

import Context, { GuideProvider as Provider } from "./GuideContext";
import React, { useContext } from "react";

import ActionDrivenComponent from "./ActionDrivenComponent";
import TourComponent from "./TourComponent";

export interface GuideUserProps {
  children: JSX.Element;
  message?: string;
  position?: ("left" | "right" | "top" | "bottom")[];
  step: number;
  text?: string;
  title?: string;
  type?: "button" | "input";
}

export default function Guide(props: GuideUserProps) {
  const { mode } = useContext(Context);

  return mode === "action-driven" ? (
    <ActionDrivenComponent {...props} />
  ) : (
    <TourComponent {...props} />
  );
}

export const GuideContext = Context;
export const GuideProvider = Provider;
