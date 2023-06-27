import { createSlice } from "@reduxjs/toolkit";

export const action = createSlice({
   name: "action",
   initialState: {
      isLoadingCountRows: true,
      tableCountLoading: "",
      totalTableDB: 0,
      keyHitungDataTable: 0,
      abortRequest: false,
      openBackupStructure: false,
      detailContent: {},
   },
   reducers: {
      isLoadingCountRows: (state, action) => {
         state = Object.assign(state, { isLoadingCountRows: action.payload });
      },
      tableCountLoading: (state, action) => {
         state = Object.assign(state, { tableCountLoading: action.payload });
      },
      totalTableDB: (state, action) => {
         state = Object.assign(state, { totalTableDB: action.payload });
      },
      keyHitungDataTable: (state, action) => {
         state = Object.assign(state, { keyHitungDataTable: action.payload });
      },
      abortRequest: (state, action) => {
         state = Object.assign(state, { abortRequest: action.payload });
      },
      openBackupStructure: (state, action) => {
         state = Object.assign(state, { openBackupStructure: action.payload });
      },
      detailContent: (state, action) => {
         state = Object.assign(state, { detailContent: action.payload });
      },
   },
});
export const { detailContent, isLoadingCountRows, tableCountLoading, totalTableDB, keyHitungDataTable, abortRequest, openBackupStructure } =
   action.actions;
export default action.reducer;
