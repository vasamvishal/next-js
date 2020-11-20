
import React from "react";

export function IconComponent({ icon, name }) {
    return (
        <div style={{ display: "flex" }}>
            <div>{icon}</div>&nbsp;&nbsp;
            <div style={{fontSize:"1.2em",fontWeight:"400"}}>{name}</div>
        </div>
    )
}

export const MemoizedIcon = React.memo(IconComponent);
