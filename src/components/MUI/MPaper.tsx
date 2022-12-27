import React, {ReactNode} from "react";
import { Paper } from "@mui/material";

interface IMPaper {
    children: ReactNode
}

const MPaper: React.FC<IMPaper> = ({
    children,
}) => {
    return(
        <>
            <Paper
                elevation={0}
                sx={{
                    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
                }}
            >
                {children}
            </Paper>
        </>
    )
}

export default MPaper
