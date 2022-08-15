import "./style.css";
interface Props {
    children: JSX.Element;
    position?: ("left" | "right" | "top" | "bottom")[];
    step: number;
    text?: string;
    type?: "button" | "input";
}
export default function ({ children, position, step, text, type, }: Props): JSX.Element;
export {};
