import React from "react";
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
declare const GuideContext: React.Context<IGuideContext>;
export default GuideContext;
interface IGuideProvider {
    value?: Partial<IGuideContext>;
    children?: any;
}
export declare function GuideProvider({ value, children }: IGuideProvider): JSX.Element;
