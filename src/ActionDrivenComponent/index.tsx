import "./style.css";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";

import GuideContext from "./../GuideContext";
import generateId from "../generateId";
import icon from "./../guide.svg";
import useHandlePosition from "../useHandlePosition";

interface Props {
  children: JSX.Element;
  position?: ("left" | "right" | "top" | "bottom")[];
  step: number;
  text?: string;
  type?: "button" | "input";
}

export default function ({
  children,
  position = ["bottom", "left"],
  step,
  text,
  type = "button",
}: Props) {
  const id = useMemo(() => generateId("action-driven"), []);

  const ref = useRef<any>(null);
  const refMark = useRef<HTMLDivElement>(null);

  const {
    run,
    setRun,
    step: stepContext,
    setStep,
    nextStep,
  } = useContext(GuideContext);
  const [active, setActive] = useState(false);
  const refChildren = useRef<any>(null);

  const { handlePosition } = useHandlePosition(refChildren, ref, {
    position,
    add: {},
  });

  const onSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setRun(false);
    setStep(1);
  };

  useEffect(() => {
    setActive(run && step === stepContext);
  }, [stepContext, run, step]);

  // Handle next step
  useEffect(() => {
    if (!active || type !== "input") return;

    const ele = ref.current?.getElementsByTagName("input")?.[0];

    if (!ele) return;

    ele?.focus();
    ele?.addEventListener("blur", (e: any) => {
      if (e.target.value) {
        nextStep();
      }
    });

    return () => {
      ele?.removeEventListener("blur", (e: any) => {
        if (e.target.value) {
          nextStep();
        }
      });
    };
  }, [type, active]);

  // Trigger position of popup
  useEffect(() => {
    active && handlePosition();
  }, [active]);

  // Handle position of mark
  useEffect(() => {
    if (!refMark.current?.getBoundingClientRect()) return;

    const position = refMark.current.getBoundingClientRect();

    if (position.x > 0) refMark.current.style.left = `${-position.x}px`;
    if (position.y > 0) refMark.current.style.top = `${-position.y}px`;
  });

  return active ? (
    <div className="w-guide">
      <div className="w-guide-mark" ref={refMark} />
      <div ref={ref} className="w-guide-wrap">
        {React.cloneElement(children, {
          ...children.props,
          onClick: (e: any) => {
            children.props.onClick && children.props.onClick(e);
            type !== "input" && nextStep();
          },
          id,
          className:
            children.props.className +
            (type === "button"
              ? " w-guide-tap-click"
              : type === "input"
              ? " w-guide-input"
              : " "),
        })}
      </div>
      {ReactDOM.createPortal(
        <div ref={refChildren} className={`w-guide-text ${position.join(" ")}`}>
          <img src={icon} />
          <div className="w-guide-container">
            <div>{text}</div>
            <button className="w-guide-skip" onClick={onSkip}>
              Skip all
            </button>
          </div>
        </div>,
        document.getElementsByTagName("body")[0]
      )}
    </div>
  ) : (
    children
  );
}
