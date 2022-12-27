import React from "react";
import {
    Box,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    MenuItem,
    ListItemText,
    Typography,
    MenuList,
    Checkbox,
    Button,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";

import MPaper from "../../components/MUI/MPaper";
import {useAppDispatch, useAppSelector} from "../../store";
import FiltersStore, {ICurrency, ITransfers, setCurrency, setTransfers} from "../../redux/Filters/FiltersStore";
import filtersStyle from "./styles";

const currencyArr = [
    {
        id: 0,
        value: ICurrency.RUB,
    },
    {
        id: 1,
        value: ICurrency.USD,
    },
    {
        id: 2,
        value: ICurrency.EUR,
    }
]

const Filters = () => {
    const theme = useTheme()
    const styles = filtersStyle(theme)
    const dispatch = useAppDispatch()

    const filters = useAppSelector(({
        [FiltersStore.name]: {
            filters,
        },
    }) => filters)

    const handleCurrency = (
        event: React.MouseEvent<HTMLElement>,
        newCurrency: string,
    ) => {
        if (newCurrency !== null) {
            dispatch(
                setCurrency({ newCurrency }),
            )
        }
    };

    const handleTransfers = (
        event: React.MouseEvent<HTMLElement>,
        type: ITransfers,
        value: boolean,
        isOnly: boolean
    ) => {
        event.stopPropagation()
        dispatch(
            setTransfers({
                transferType: type,
                newValue: !value,
                isOnly,
            })
        )
    }

    return(
        <>
            <MPaper>
                <Grid
                    container
                    direction='column'
                    sx={styles.gridTop}
                >
                    <Box sx={styles.gridTopCurrencyTitle}>
                        Валюта
                    </Box>
                    <Box sx={styles.gridTopCurrencyButtonPlaceholder}>
                        <ToggleButtonGroup
                            color="primary"
                            value={filters.currency}
                            exclusive
                            onChange={handleCurrency}
                            sx={styles.gridTopButtonGroup}
                        >
                            {
                                currencyArr.map((currency) => (
                                    <ToggleButton
                                        value={currency.value}
                                        key={currency.id}
                                        sx={styles.gridTopToggleButton}
                                    >
                                        {currency.value}
                                    </ToggleButton>
                                ))
                            }
                        </ToggleButtonGroup>
                    </Box>
                    <Box sx={styles.girdTopTransfersTitle}>
                        Количество пересадок
                    </Box>
                </Grid>
                <Grid container>
                    <MenuList
                        sx={styles.gridBottomMenuList}
                        color='primary'
                    >
                        {
                            Object.values(filters.transfers).map((transfer) => (
                                <MenuItem
                                    key={transfer.id}
                                    dense={false}
                                    disableGutters
                                    onClick={(event) => handleTransfers(event, transfer.type, transfer.checked, false)}
                                    sx={styles.gridBottomMenuItem}
                                >
                                    <Checkbox
                                        checked={transfer.checked}
                                    />
                                    <ListItemText>
                                        <Typography sx={styles.gridBottomTypography} noWrap>
                                            {transfer.name}
                                        </Typography>
                                    </ListItemText>
                                    {
                                        transfer.type !== ITransfers.all
                                        && (
                                            <Button
                                                sx={styles.gridBottomButton}
                                                onClick={(event) => (
                                                    handleTransfers(event, transfer.type, transfer.checked, true)
                                                )}
                                            >
                                                только
                                            </Button>
                                        )
                                    }
                                </MenuItem>
                            ))
                        }
                    </MenuList>
                </Grid>
            </MPaper>
        </>
    )
}

export default Filters
