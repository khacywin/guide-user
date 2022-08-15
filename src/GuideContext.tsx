import React, { createContext, useMemo, useState } from "react";

export interface IGuideContext {
  mode?: "tour" | "action-driven";
  nextStep?: any;
  previousStep?: any;
  run: boolean;
  setStep: any;
  setRun: any;
  setTotal?: any;
  step: number;
  total?: number;
}

const GuideContext = createContext<IGuideContext>({
  mode: "action-driven",
  nextStep: () => {},
  previousStep: () => {},
  run: true,
  setRun: () => {},
  setStep: () => {},
  setTotal: () => {},
  step: 1,
  total: 1,
});

export default GuideContext;

interface IGuideProvider {
  value?: Partial<IGuideContext>;
  children?: any;
}

export function GuideProvider({ value = {}, children }: IGuideProvider) {
  const [step, setStep] = useState(1);
  const [total, setTotal] = useState(1);
  const [isRun, setIsRun] = useState(true);

  const nextStep = () => {
    if (value.setStep && value.step) {
      value.setStep(value.step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (value.setStep && value.step) {
      value.setStep(value.step - 1);
    } else {
      setStep(step - 1);
    }
  };

  const defaultValue: IGuideContext = useMemo(
    () => ({
      mode: "action-driven",
      nextStep,
      previousStep,
      run: isRun,
      setRun: setIsRun,
      setStep,
      setTotal,
      step,
      total,
    }),
    [nextStep, previousStep]
  );

  return (
    <GuideContext.Provider value={{ ...defaultValue, ...value }}>
      {children}
    </GuideContext.Provider>
  );
}
