import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Task, TasksState } from "../types/types"




export const TasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [
            {
                name: "Wash the dishes",
                notes: "",
                coinReward: 50,
                id: '1asfasfdasdf234',
                deadline: "2024-02-25T22:59:59.999Z",
                coinPenalty: 20,
                overdue: false
            },
            {
                name: "Do the Laundry",
                notes: "",
                coinReward: 30,
                id: "1313asfdafs2",
                deadline: "2024-03-11T22:59:59.999Z",
                coinPenalty: 10,
                overdue: false
            },
        {
            name: "Return book to library",
            notes: "",
            coinReward: 150,
            id: "131fs32aagadsfsfa",
            deadline: "2024-02-28T22:59:59.999Z",
            coinPenalty: 20,
            overdue: false
        }] as Task[],
        historyTasks: [{
            name: "Complete work project",
            notes: "hard task",
            coinReward: 300,
            id: "13132afsdfadsfsdfdfn",
            deadline: "2024-02-23T22:59:59.999Z",
            coinPenalty: 20,
            overdue: false
        }],
        overdueTasks: []
    } as TasksState,

    reducers: {
        setTasks: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
        },

        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },

        deleteTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        },

        completeTask: (state, action: PayloadAction<Task>) => {
            const completedTaskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
            state.tasks[completedTaskIndex].overdue = false;
            const completedTask = state.tasks.find(task => task.id === action.payload.id)
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);

            if (completedTask) {
                state.historyTasks.unshift(completedTask);
            }
        },

        undoCompleteTask: (state, action: PayloadAction<Task>) => {
            const taskToUndo = state.historyTasks.find(task => task.id === action.payload.id);
            state.historyTasks = state.historyTasks.filter(task => task.id !== action.payload.id);

            if (taskToUndo) {
                state.tasks.unshift(taskToUndo);
            }

        },

        deleteTaskFromHistory: (state, action: PayloadAction<Task>) => {
            state.historyTasks = state.historyTasks.filter(task => task.id !== action.payload.id);
        },

        markAsOverDue: (state, action: PayloadAction<Task>) => {
            const { id } = action.payload;

            const taskToMarkOverdue = state.tasks.find(task => task.id === id);

            if (taskToMarkOverdue) {

                taskToMarkOverdue.overdue = true;

                state.tasks = state.tasks.filter(task => task.id !== id);

                state.overdueTasks.unshift(taskToMarkOverdue);
            }
        },

        completeOverdueTask: (state, action: PayloadAction<Task>) => {
            const completedTaskIndex = state.overdueTasks.findIndex(task => task.id === action.payload.id);
            if (completedTaskIndex !== -1) {
                state.overdueTasks[completedTaskIndex].overdue = false;
            }
            const completedTask = state.overdueTasks.find(task => task.id === action.payload.id);
            state.overdueTasks = state.overdueTasks.filter(task => task.id !== action.payload.id);

            if (completedTask) {
                state.historyTasks.unshift(completedTask);
            }

        },

        moveOverdueToHistory: (state, action: PayloadAction<Task>) => {
            const taskToMove = state.overdueTasks.find(task => task.id === action.payload.id);
            if (taskToMove) {
                state.historyTasks.unshift(taskToMove)
            };
            state.overdueTasks = state.overdueTasks.filter(task => task.id !== action.payload.id);
        },

        completeOverdueHistoryTask: (state, action: PayloadAction<Task>) => {
            const taskIndex = state.historyTasks.findIndex(task => task.id === action.payload.id);
            if (taskIndex !== -1) {
                state.historyTasks[taskIndex].overdue = false;
            }
        },

        markHistoryTaskAsOverdue: (state, action: PayloadAction<Task>) => {
            const taskIndex = state.historyTasks.findIndex(task => task.id === action.payload.id);
            if (taskIndex !== -1) {
                state.historyTasks[taskIndex].overdue = true;
            }
        }
    }
})

export const {
    setTasks,
    editTask,
    deleteTask,
    completeTask,
    undoCompleteTask,
    deleteTaskFromHistory,
    markAsOverDue,
    completeOverdueTask,
    moveOverdueToHistory,
    completeOverdueHistoryTask,
    markHistoryTaskAsOverdue
} = TasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectHistoryTasks = (state: RootState) => state.tasks.historyTasks;
export const selectOverdueTasks = (state: RootState) => state.tasks.overdueTasks;
export default TasksSlice.reducer;