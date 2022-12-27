import { Theme } from '@mui/material'

const filtersStyle = (theme: Theme) => ({
    gridTop: {
        padding: theme.spacing(2,2,1,2),
    },
    gridTopCurrencyTitle: {
        textTransform: 'uppercase',
        fontWeight: 500,
    },
    gridTopCurrencyButtonPlaceholder: {
        paddingTop: theme.spacing(1),
    },
    gridTopButtonGroup: {
        width: '100%',
    },
    gridTopToggleButton: {
        color: '#2196f3',
        width: '100%',
        '&:hover': {
            background: '#f2fcff',
        },
        '&.Mui-selected': {
            background: '#2196f3',
            color: theme.palette.primary.contrastText,
            '&:hover': {
                background: '#1c83d2',
            },
        }
    },
    girdTopTransfersTitle: {
        paddingTop: theme.spacing(3),
        textTransform: 'uppercase',
        fontWeight: 500,
    },
    gridBottomMenuList: {
        width: '100%'
    },
    gridBottomMenuItem: {
        paddingLeft: theme.spacing(0.5),
        '&:hover': {
            background: '#f2fcff',
        },
        '&:hover .MuiButtonBase-root': {
            color: theme.palette.primary.main,
        },
    },
    gridBottomTypography: {
        maxWidth: '100%'
    },
    gridBottomButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.contrastText,
    },
})

export default filtersStyle
