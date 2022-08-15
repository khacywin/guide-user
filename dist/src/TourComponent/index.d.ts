import "./style.css";
interface Props {
    children: JSX.Element;
    position?: ("left" | "right" | "top" | "bottom")[];
    step: number;
    title?: string;
    message?: string;
}
export default function ({ children, position, step, title, message, }: Props): JSX.Element;
export {};
