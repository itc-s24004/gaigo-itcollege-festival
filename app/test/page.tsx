import { getAllBlob } from "@/libs/blob";
import { getData, getEnums, getTables, getUsers,  } from "../../libs/db";

import styles from "./page.module.css";
import Link from "next/link";







// import "@/app/client"




export default async function Page() {
    const data = await getData();
    const users = await getUsers();
    const blobs = await getAllBlob();
    return (
        <div>
            <div>
                <Link href="/test/select">select</Link>
            </div>
            <div>
                <Link href="/test/upload">upload</Link>
            </div>
            <h1>Test Page</h1>
            <div className={styles.frame}>
                <div className={styles.tab}>
                    <h2>Database Schemas:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>

                <div className={styles.tab}>
                    <h2>Users:</h2>
                    <pre>{JSON.stringify(users, null, 2)}</pre>
                </div>


                <div className={styles.tab}>
                    <h2>Blobs:</h2>
                    <pre>{JSON.stringify(blobs, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}