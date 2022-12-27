import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface ITransferItem {
    id: number
    name: string
    checked: boolean
    type: ITransfers
    stops?: number
}

export enum ICurrency {
    RUB = 'RUB',
    USD = 'USD',
    EUR = 'EUR',
}

export enum ITransfers {
    all = 'all',
    withoutTransfer = 'withoutTransfer',
    oneTransfer = 'oneTransfer',
    twoTransfers = 'twoTransfers',
    threeTransfers = 'threeTransfers',
}

export interface IFilters {
    filters: {
        currency: ICurrency
        transfers: {
            [ITransfers.all]: ITransferItem
            [ITransfers.withoutTransfer]: ITransferItem
            [ITransfers.oneTransfer]: ITransferItem
            [ITransfers.twoTransfers]: ITransferItem
            [ITransfers.threeTransfers]: ITransferItem
        }
    }
}

const makeInitialState = (): IFilters => ({
    filters: {
        currency: ICurrency.RUB,
        transfers: {
            [ITransfers.all]: {
                id: 0,
                name: 'Все',
                type: ITransfers.all,
                checked: false,
            },
            [ITransfers.withoutTransfer]: {
                id: 1,
                name: 'Без пересадок',
                type: ITransfers.withoutTransfer,
                checked: false,
                stops: 0,
            },
            [ITransfers.oneTransfer]: {
                id: 2,
                name: '1 пересадка',
                type: ITransfers.oneTransfer,
                checked: false,
                stops: 1,
            },
            [ITransfers.twoTransfers]: {
                id: 3,
                name: '2 пересадки',
                type: ITransfers.twoTransfers,
                checked: false,
                stops: 2,
            },
            [ITransfers.threeTransfers]: {
                id: 4,
                name: '3 пересадки',
                type: ITransfers.threeTransfers,
                checked: false,
                stops: 3,
            }
        },
    },
} as any)

interface ISetTransfersPayload {
    transferType: ITransfers
    newValue: boolean
    isOnly: boolean
}

export const FiltersStore = createSlice({
    name: 'FiltersStore',
    initialState: makeInitialState(),
    reducers: {
        setCurrency: ({ filters }, action) => {
            filters.currency = action.payload.newCurrency
        },
        setTransfers: ({ filters }, action: PayloadAction<ISetTransfersPayload>) => {
            if (action.payload.transferType === ITransfers.all) {
                for (const key in filters.transfers) {
                    // @ts-ignore
                    filters.transfers[key].checked = action.payload.newValue;
                }
            } else {
                if (action.payload.isOnly) {
                    for (const key in filters.transfers) {
                        // @ts-ignore
                        filters.transfers[key].checked = false;
                    }
                    filters.transfers[action.payload.transferType].checked = true
                } else {
                    filters.transfers[action.payload.transferType].checked = action.payload.newValue
                }
                filters.transfers[ITransfers.all].checked = false
            }
        },
    },
})

export const {
    setCurrency,
    setTransfers,
} = FiltersStore.actions
export default FiltersStore
