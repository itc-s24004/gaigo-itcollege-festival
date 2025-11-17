import React from "react";


// !!!dev-h 管理用のエディターコンポーネント 全体を通して未完成




export type EditorInitialData = {
    label: string;
    content?: React.ReactNode;
    toolbar?: React.ReactNode;
    subMenu?: EditorInitialData[];

}


export type EditorProps = {
    data: EditorInitialData[]
}



export function Editor({ data }: EditorProps) {
    function genMenu() {}


    const windows: React.ReactNode[] = [];
    data.map((initData, i) => {
        
    });


    return (
        <div>
            {
                data.map((d, i) => (
                    <div key={i}>
                        {d?.label}
                        {d?.content}
                    </div>
                ))
            }
        </div>
    )
}



export type menuItem = {
    label: string;
    action?: () => void;
    submenu?: menuItem[];
}

export type MenuProps = {
    data: menuItem[];
}
    

export function Menu({data}: MenuProps) {
    return (
        <nav>
            <ul>
                {data.map((menuData, index) => (
                    <li key={index}>
                        <button onClick={() => {
                            menuData.action?.();
                        }}>
                            {menuData.label}
                        </button>
                        {menuData.submenu && <Menu data={menuData.submenu} />}
                    </li>
                ))}
            </ul>
        </nav>
    );
}


export function Toolbar() {
    
}



export function ContentArea() {
    
}