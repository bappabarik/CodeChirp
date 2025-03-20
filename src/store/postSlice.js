import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    linkedinPosts: [],
    xPosts: [],
    totalLinkedinPosts: 0,
    totalXPosts: 0,
    posts: []
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addLinkedinPosts: (state, action) => {
            state.linkedinPosts = [...state.linkedinPosts, ...(action.payload || [])];
        },
        prependLinkedinPosts: (state, action) => {
            state.linkedinPosts = [...(action.payload || []), ...state.linkedinPosts];
        },
        addXPosts: (state, action) => {
            state.xPosts = [...state.xPosts, ...(action.payload || [])];
        },
        prependXPosts: (state, action) => {
            state.xPosts = [ ...(action.payload || []), ...state.xPosts];
        },
        addTotalLinkedinPosts: (state, action) => {
            state.totalLinkedinPosts = action.payload || 0;
        },
        addTotalXPosts: (state, action) => {
            state.totalXPosts = action.payload || 0;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        }
    }
})

export const { addLinkedinPosts, prependLinkedinPosts, addXPosts, prependXPosts, addTotalLinkedinPosts, addTotalXPosts, addPost } = postSlice.actions;

export default postSlice.reducer;