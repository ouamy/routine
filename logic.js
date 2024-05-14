async function getPrayerTimes(location) {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/calendarByAddress?address=${location}&method=2&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`);
        const data = await response.json();
        const todayPrayerTimes = data.data[new Date().getDate() - 1].timings;
        const schedule = [];

        for (const prayer in todayPrayerTimes) {
            if (['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(prayer)) {
                const time = todayPrayerTimes[prayer].split(" ")[0];
                schedule.push({ time, prayer });
            }
        }

        const additionalTasks = [
            { time: "06:30", task: "Wake up and Brush teeth" },
            { time: "07:00", task: "Breakfast" },
            { time: "07:30", task: "Leave house" },
            { time: "08:00", task: "Gym" },
            { time: "10:30", task: "Shower" },
            { time: "11:00", task: "Go home" },
            { time: "12:00", task: "Eat salad" },
            { time: "12:30", task: "Gaming or Studying" },
            { time: "18:00", task: "Dinner" },
            { time: "18:30", task: "Read, Create an Application or Watch YouTube" },
            { time: "20:30", task: "Brush teeth" },
            { time: "21:00", task: "Sleep" }
        ];

        schedule.push(...additionalTasks);

        schedule.sort((a, b) => a.time.localeCompare(b.time));

        return schedule;
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
}

async function displaySchedule(location) {
    const scheduleContainer = document.getElementById("schedule");
    const schedule = await getPrayerTimes(location);

    if (schedule.length === 0) {
        scheduleContainer.innerHTML = "<p>Failed to fetch schedule. Please try again later.</p>";
        return;
    }

    let scheduleHTML = "";
    schedule.forEach(item => {
        const [hour, minute] = item.time.split(":");
        const hour12 = ((hour % 12) || 12).toString().padStart(2, "0");
        const minutePadded = minute.padStart(2, "0");
        const ampm = hour < 12 ? "AM" : "PM";
        const time12 = `${hour12}:${minutePadded} ${ampm}`;

        let taskName = item.prayer ? `Meditate/Pray ${item.prayer}` : item.task;

        scheduleHTML += `<div class="schedule-item">${time12}: ${taskName}</div>`;
    });
    scheduleContainer.innerHTML = scheduleHTML;
}

function toggleDarkMode() {
    const container = document.getElementById("container");
    container.classList.toggle("dark-mode");
    document.body.classList.toggle("dark-mode");
    const toggleButton = document.querySelector(".toggle-dark-mode button");
    toggleButton.innerHTML = container.classList.contains("dark-mode") ? "☀️" : "🌙";
}
displaySchedule("Brussels");