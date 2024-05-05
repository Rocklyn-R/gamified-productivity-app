export interface Task {
    name: string;
    notes: string;
    coin_reward: number;
    id: string;
    deadline: string;
    coin_penalty: number;
    overdue: boolean;
    completion_status: string;
}

export interface DatabaseTask {
    user_id: string;
    name: string;
    notes: string;
    coin_reward: number;
    id: string;
    deadline: string;
    coin_penalty: number;
    overdue: boolean;
}

export interface TasksState {
    tasks: Task[];
    historyTasks: Task[];
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
    date_used: string;
}



export interface RewardsState {
    totalCoins: number;
    shop: Reward[];
    inventory: InventoryItem[];
    usedRewards: UsedRewards[];
}

export interface PomodoroState {
    seconds_left: number;
    is_paused: boolean;
    work_mins: number;
    break_mins: number;
    long_break_mins: number;
    num_sessions_to_long_break: number;
    sessions_remaining: number;
    timer_mode: "work" | "break" | "longBreak";
    pomodoros: number;
    pomodoro_price: number;
    isLoading: boolean;
    seconds_offset: number
}

export interface UserState {
    isAuthenticated: boolean,
    firstName: string,
    lastName: string,
    email: string,
    google_linked: boolean,
    password: boolean
}