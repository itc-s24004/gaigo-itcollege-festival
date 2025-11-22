"use client";


import styles from "./index.module.css";



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