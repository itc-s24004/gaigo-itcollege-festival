type ButtonGenOptions = {
    label: string;
    disabled?: boolean;
    onClick?: () => void;
}


export const SubmitButton = ({ label, onClick, disabled }: ButtonGenOptions) => (
    <button type="submit" onClick={onClick} disabled={disabled}>{label}</button>
);