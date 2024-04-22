export interface Task {
    name: string;
    notes: string;
    coinReward: number;
    id: string;
    deadline: string;
    coinPenalty: number;
    overdue: boolean;
}

export interface TasksState {
    tasks: Task[];
    historyTasks: Task[];
    overdueTasks: Task[];
}

export interface InventoryItem {
    name: string;
    price: number;
    description: string;
    id: string;
    icon: string;
    quantity: number;
}

export interface Reward {
    name: string;
    price: number;
    description: string;
    id: string;
    icon: string;
}

export interface UsedRewards {
    name: string;
    price: number;
    description: string;
    id: string;
    icon: string;
    dateUsed: string;
}



export interface RewardsState {
    totalCoins: number;
    shop: Reward[];
    inventory: InventoryItem[];
    usedRewards: UsedRewards[];
}

export interface PomodoroState {
    secondsLeft: number;
    isPaused: boolean;
    workMinutes: number;
    breakMinutes: number;
    longBreakMinutes: number;
    workMinutesQueued: null | number;
    breakMinutesQueued: null | number;
    longBreakMinutesQueued: null | number;
    numOfSessionsToLongBreak: number;
    sessionsRemaining: number;
    mode: "work" | "break" | "longBreak";
    pomodoros: number;
    pomodoroPrice: number;
}

