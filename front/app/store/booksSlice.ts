import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios, {AxiosResponse} from 'axios'
import {IBook} from '../types/book'
import {FetchStatuses} from '../types/fetchStatuses'

const fetchRecommendations = createAsyncThunk
('books/fetchRecommendations', async (limit: number = 5) => {
    const response: AxiosResponse<IBook[]> = await axios.get('/api/books/recommendations', {
        params: {
            limit,
        },
    })
    return response.data
})

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        status: FetchStatuses.pending
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchRecommendations.pending, (state) => {
            state.status = FetchStatuses.pending
        })
        builder.addCase(fetchRecommendations.rejected, (state) => {
            state.status = FetchStatuses.error
        })
        builder.addCase(fetchRecommendations.fulfilled, (state) => {
            state.status = FetchStatuses.successful
        })
    },
})

export default booksSlice.reducer