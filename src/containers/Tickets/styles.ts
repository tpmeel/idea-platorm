import { Theme } from '@mui/material'

const ticketsStyle = (theme: Theme) => ({
    gridLeft: {
        borderRight: {
            lg: '1px solid #e9edf0',
        },
        padding: theme.spacing(4,5,4,5)
    },
    gridLeftImage: {
        paddingBottom: theme.spacing(3),
        height: '50px',
        maxWidth: '100%',
    },
    gridLeftButton: {
        textTransform: 'none',
        color: theme.palette.primary.contrastText,
        background: '#ff6f32',
        fontSize: theme.typography.pxToRem(16),
        '&:hover': {
            background: '#fa571299',
        },
    },
    gridRight: {
        padding: theme.spacing(2,5,5,4)
    },
    gidRightTime: {
        fontSize: theme.typography.pxToRem(56),
        fontWeight: 300,
    },
    gridRightPlace: {
        fontWeight: 500,
    },
    gridRightDate: {
        color: theme.palette.grey[500],
    },
    gridRightStopsText: {
        paddingTop: theme.spacing(2),
        color: theme.palette.grey[500],
        textTransform: 'uppercase',
    },
    gridRightStopsLine: {
        marginBottom: theme.spacing(0.4),
        borderBottom: `2px solid ${theme.palette.grey[300]}`,
    },
    gridRightStopsIcon: {
        color: theme.palette.grey[400],
        transform: 'rotate(90deg)'
    },
})

export default ticketsStyle
