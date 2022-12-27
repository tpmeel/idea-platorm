import React, {useMemo} from "react";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import {Button, Grid, Box, Divider} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import sortBy from "lodash.sortby";

import tickets from "../../tickets";
import MPaper from "../../components/MUI/MPaper";
import Image from "../../components/Image";
import ticketsStyle from "./styles";
import {useAppSelector} from "../../store";
import FiltersStore, {ITransfers} from "../../redux/Filters/FiltersStore";

// просто чтобы красиво было, но картинки с бэка должны приходить
const getCarrierImage = (carrier: string): string => {
    if (carrier === 'TK') {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Turkish_Airlines_logo_2019_compact.svg/1024px-Turkish_Airlines_logo_2019_compact.svg.png'
    } else if (carrier === 'S7') {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/S7_new_logo.svg/1200px-S7_new_logo.svg.png'
    } else if (carrier === 'SU') {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Aeroflot_Russian_Airlines_logo_%28en%29.svg/2560px-Aeroflot_Russian_Airlines_logo_%28en%29.svg.png'
    } else if (carrier === 'BA') {
        return 'https://upload.wikimedia.org/wikipedia/sco/thumb/4/42/British_Airways_Logo.svg/1200px-British_Airways_Logo.svg.png'
    }
    return ''
}

const ticketsWithIds = tickets.tickets.map((ticket, i) => (
    {
        ...ticket,
        id: i,
    }
))

const sortedTicketsByPrice = sortBy(ticketsWithIds, 'price')

const formatDateYMDW = (date: Date) => (
    new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
    }).format(date)
)

const formatDate = (dateString: string): string => {
    const tempDateString = formatDateYMDW(new Date(dateString))
    const splitDateString = tempDateString.split(' ')
    const firstPart = splitDateString.slice(1, -1)
    firstPart[1] = firstPart[1].slice(0, -1)
    const secondPart = splitDateString.slice(0, 1)
    secondPart[0] = secondPart[0].slice(0, -1)
    return `${firstPart.join(' ')}, ${secondPart[0][0].toUpperCase() + secondPart[0].slice(1)}`
}

const Tickets: React.FC = () => {
    const theme = useTheme()
    const styles = ticketsStyle(theme)

    const filters = useAppSelector(({
        [FiltersStore.name]: {
            filters,
        },
    }) => filters)

    const getStopsString = (stops: number): string => (
        Object.values(filters.transfers).find((transfer) => transfer.stops === stops)!.name
    )

    const filteredTickets = useMemo(() => {
        const stops = [] as number[]
        Object.values(filters.transfers).map((transfer) => {
            if (transfer.checked && transfer.type !== ITransfers.all) {
                stops.push(transfer.stops!)
            }
        })
        if (stops.length !== 0) {
            return  sortedTicketsByPrice.filter((ticket) => stops.includes(ticket.stops))
        }
        return sortedTicketsByPrice
    },[filters.transfers])

    return(
        <Grid container spacing={3}>
            {
                filteredTickets.map((ticket) => (
                    <Grid item xs={12} key={ticket.id}>
                        <MPaper>
                            <Grid container>
                                <Grid
                                    item
                                    container
                                    justifyContent='center'
                                    lg={4}
                                    md={12}
                                    sx={styles.gridLeft}
                                >
                                    <Grid
                                        item
                                        container
                                        justifyContent='center'
                                    >
                                        <Image
                                            alt={ticket.carrier}
                                            src={getCarrierImage(ticket.carrier)}
                                            style={styles.gridLeftImage}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        justifyContent='center'
                                    >
                                        <Button
                                            fullWidth
                                            sx={styles.gridLeftButton}
                                        >
                                            Купить<br/>
                                            {`за ${ticket.price} ₽`}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    lg={8}
                                    md={12}
                                    sx={styles.gridRight}
                                    alignItems='start'
                                >
                                    <Grid
                                        item
                                        container
                                        direction='column'
                                        md={4}
                                        sm={12}
                                    >
                                        <Box sx={styles.gidRightTime}>
                                            {ticket.departure_time}
                                        </Box>
                                        <Box sx={styles.gridRightPlace}>
                                            {`${ticket.origin}, ${ticket.origin_name}`}
                                        </Box>
                                        <Box sx={styles.gridRightDate}>
                                            {`${formatDate(ticket.departure_date)}`}
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        justifyContent='center'
                                        md={4}
                                        sm={12}
                                    >
                                        <Grid item>
                                            <Box sx={styles.gridRightStopsText}>
                                                {getStopsString(ticket.stops)}
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            container
                                            justifyContent='center'
                                            alignItems='center'
                                        >
                                            <Grid item xs={11}>
                                                <Box sx={styles.gridRightStopsLine}/>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <AirplanemodeActiveIcon
                                                    sx={styles.gridRightStopsIcon}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        justifyContent='end'
                                        md={4}
                                        sm={12}
                                    >
                                        <Box sx={styles.gidRightTime}>
                                            {ticket.arrival_time}
                                        </Box>
                                        <Box
                                            sx={{
                                                ...styles.gridRightPlace,
                                                width: '100%',
                                                textAlign: 'right',
                                            }}
                                        >
                                            {`${ticket.destination}, ${ticket.destination_name}`}
                                        </Box>
                                        <Box sx={styles.gridRightDate}>
                                            {`${formatDate(ticket.arrival_date)}`}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MPaper>
                    </Grid>
                )
            )}
        </Grid>
    )
}

export default Tickets
