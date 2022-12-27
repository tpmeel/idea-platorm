import React, { ReactNode } from 'react'
import { Container } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface IMContainer {
    children: ReactNode
}

const MContainer: React.FC<IMContainer> = ({
    children,
}) => {
    const theme = useTheme()
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                minHeight: '100vh',
                padding: {
                    lg: theme.spacing(5, 6, 5, 6),
                    md: theme.spacing(5, 2, 5, 2),
                    sm: theme.spacing(5, 3, 5, 3),
                    xs: theme.spacing(5, 1, 5, 1),
                },
                background: '#f3f7fa',
            }}
        >
            {children}
        </Container>
    )
}

export default MContainer
