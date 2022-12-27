import React from 'react'
import { Box, SxProps, Theme } from '@mui/material'

interface IImage {
    alt: string
    src: string
    style: SxProps<Theme>
}

const Image: React.FC<IImage> = ({
    alt,
    src,
    style,
}) => {
    return (
        <Box
            component="img"
            alt={alt}
            src={src}
            sx={style}
        />
    )
}

export default Image
