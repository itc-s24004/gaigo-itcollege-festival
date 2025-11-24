import React from "react";

import styles from "./index.module.css";
import Link from "next/link";

type Options = {
    title?: string;
    items: React.ReactNode[];
    moreLabel?: string;
    moreLink?: string;
}


export function Carousel({ title, items, moreLabel="もっと見る", moreLink }: Options) {
    return (
        <div>
            <div className={styles.header}>
                {title && <span className={styles.title}>{title}</span>}
                {moreLink && <span className={styles.moreLink}><Link href={moreLink}>{moreLabel}</Link></span>}
            </div>
            <div className={styles.carouselContainer}>
                <ul className={styles.carousel}>
                    {items.map((item, index) => (
                        <li key={index} className={styles.carouselItem}>
                            {item}
                        </li>
                    ))}
                </ul>
                {/* <div className={styles.carouselButtonContainer}>
                    <button className={styles.carouselButton} aria-label="Previous Slide">&#10094;</button>
                    <button className={styles.carouselButton} aria-label="Next Slide">&#10095;</button>
                </div> */}
            </div>
        </div>
    );
}