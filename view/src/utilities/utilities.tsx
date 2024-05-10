import movie from "../images/movie.png"
import videoGame from "../images/video-game.png"
import plane from "../images/plane.png"
import shopping from "../images/shopping.png"
import couch from "../images/couch.png"
import book from "../images/book.png"
import artist from "../images/artist.png"
import cocktail from "../images/cocktail.png"
import beauty from "../images/lipstick.png"
import music from "../images/music.png"
import phone from "../images/phone.png"
import gym from "../images/gym.png"
import sports from "../images/sports.png"
import nature from "../images/nature.png"
import headphones from "../images/headphones.png"
import money from "../images/money.png"
import love from "../images/love.png"
import gift from "../images/gift.png"

export const renderIcon = (icon: string) => {
    switch (icon) {
        case "movie":
            return movie;
        case "videoGame":
            return videoGame;
        case "plane":
            return plane;
        case "shopping":
            return shopping;
        case "couch":
            return couch;
        case "book":
            return book;
        case "artist":
            return artist;
        case "cocktail":
            return cocktail;
        case "beauty":
            return beauty;
        case "music":
            return music;
        case "phone":
            return phone;
        case "gym":
            return gym;
        case "sports":
            return sports;
        case "nature":
            return nature;
        case "headphones":
            return headphones;
        case "money":
            return money;
        case "love":
            return love;
        case "gift":
            return gift;
        default:
            return gift;

    }
}


export const formatDeadline = (deadline: string) => {
    const todayString = new Date().toISOString().slice(0, 10);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().slice(0, 10);

    const deadlineDateString = deadline.slice(0, 10);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().slice(0, 10);

    if (deadlineDateString === todayString) {
        return "Today";
    } else if (deadlineDateString === tomorrowString) {
        return "Tomorrow";
    } else if (deadlineDateString === yesterdayString) {
        return "Yesterday";
    } else {
        const deadlineDate = new Date(deadline);
        const year = deadlineDate.getFullYear().toString().slice(-2);
        const month = (deadlineDate.getMonth() + 1).toString().padStart(2, "0");
        const day = deadlineDate.getDate().toString().padStart(2, "0");
        return `${month}/${day}/${year}`;
    }
}

export const convertDateToString = (value: string) => {
    const timezoneOffsetMinutes = new Date().getTimezoneOffset();

    const today = new Date();
    today.setHours(23 - timezoneOffsetMinutes / 60, 59, 59, 999); 

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23 - timezoneOffsetMinutes / 60, 59, 59, 999);

    if (value === "today") {
        const isoString = today.toISOString();
        return isoString;
    } else if (value === "tomorrow") {
        const isoString = tomorrow.toISOString();
        return isoString;
    } else if (value === "nodeadline") {
        return ""
    } else return ""
}


const currentDate = new Date();

// Options to get the day of the week
const dayOptions: { weekday: "long"; } = {
    weekday: "long"
};
export const day = currentDate.toLocaleDateString('en-US', dayOptions);

// Options to get the month and day without the year
const dateOptions: { month: "long"; day: "numeric"; } = {
    month: "long",
    day: "numeric"
};

export const date = currentDate.toLocaleDateString('en-US', dateOptions);


export const formatDate = (dateStr: string) => {
    const parts = dateStr.split('/');
    parts[2] = parts[2].slice(-2);
    return parts.join('/');
}

export const getFormattedDate = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    return formattedDate;
}