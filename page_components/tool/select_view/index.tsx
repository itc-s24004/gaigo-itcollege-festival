"use client";

import { useState } from "react";

import styles from "./index.module.css";

type Options = {
    options: {
        element: React.ReactNode;
        value: string;
    }[];
    multiple?: boolean;
    submitLabel?: string;
    submitCallback?: (value: string[]) => void;
    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
    customOptionAttributes?: React.HTMLAttributes<HTMLDivElement>;
    customSelectedOptionAttributes?: React.HTMLAttributes<HTMLDivElement>;
    customSubmitButtonAttributes?: React.HTMLAttributes<HTMLButtonElement>;
}
export function SelectForm({
    options, multiple, submitLabel,
    submitCallback, customAttributes,
    customSelectedOptionAttributes,
    customOptionAttributes,
    customSubmitButtonAttributes
}: Options) {

    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    return (
        <div {...customAttributes}>
            {
                options.map((option, i) => {
                    const isSelected = selectedOptions.includes(i);
                    return (
                        <div key={i}
                            // デフォルトのスタイルと選択時のスタイルを切り替え
                            className={isSelected ? `${styles.option} ${styles.selected}` : styles.option}
                            // カスタムオプション属性を切り替え
                            {...(isSelected ? customSelectedOptionAttributes : customOptionAttributes)}
                            // 選択・解除の処理
                            onClick={() => {
                                if (multiple) {
                                    if (isSelected) {
                                        setSelectedOptions(selectedOptions.filter((v) => v !== i));
                                    } else {
                                        setSelectedOptions([...selectedOptions, i]);
                                    }
                                } else {
                                    setSelectedOptions([i]);
                                }
                            }}
                        >

                            {option.element}

                        </div>
                    )
                })
            }
            <button
                {...customSubmitButtonAttributes}
                onClick={() => submitCallback && submitCallback(selectedOptions.map(i => options[i].value))}
            >
                {submitLabel}
            </button>
        </div>
    )
}




type SelectViewProps = {
    options: {
        element: React.ReactNode;
        onSelect?: () => void;
    }[];
    onSelect?: (index: number) => void;
    optionGenerator?: (index: number) => React.HTMLAttributes<HTMLDivElement>;
    selected?: number[];
    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
}
export function SelectView({ options, onSelect, optionGenerator, selected=[], customAttributes }: SelectViewProps) {
    return (
        <div className={styles.selectView} {...customAttributes}>
            {
                options.map((option, i) => {
                    const isSelected = selected.includes(i);
                    return (
                        <div key={i}
                            // デフォルトのスタイルと選択時のスタイルを切り替え
                            className={isSelected ? `${styles.option} ${styles.selected}` : styles.option}
                            // カスタムオプション属性を切り替え
                            {...(optionGenerator ? optionGenerator(i) : {})}
                            // 選択処理
                            onClick={() => {
                                option.onSelect?.();
                                onSelect?.(i);
                            }}
                        >
                            {option.element}
                        </div>
                    )
                })
            }
        </div>
    );
}