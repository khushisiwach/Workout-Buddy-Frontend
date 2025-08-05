const workoutData = JSON.parse(
  document.getElementById("workout-data").textContent
);
console.log("Workout Data:", workoutData);



const container = document.getElementById("workout-plan-container");

function createWorkoutDayCard(dayData, index) {
  const isRestDay = dayData.focus === "Rest";
  let exercisesHtml = "";

  if (!isRestDay) {
    exercisesHtml = dayData.exercises
      .map(
        (ex) => `
            <li class="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                <div>
                    <p class="font-semibold text-white">${ex.name}</p>
                    <p class="text-sm text-gray-400">${ex.sets} sets x ${ex.reps} reps</p>
                </div>
                <span class="text-xs font-medium bg-gray-700 text-gray-300 px-2 py-1 rounded-full">${ex.equipment}</span>
            </li>
        `
      )
      .join("");
  }

  return `
        <div class="workout-card bg-gray-800 rounded-xl shadow-lg overflow-hidden stagger-in" style="animation-delay: ${
          index * 100
        }ms;">
            <div class="p-6">
                <div class="flex flex-col gap-4 justify-between  mb-4">
                    <h2 class="text-2xl font-bold text-neon-500">${
                      dayData.day
                    }</h2>
                    <span class="px-3 py-1 text-sm font-semibold rounded-full ${
                      isRestDay
                        ? "bg-blue-500 text-white"
                        : "bg-neon-700 text-white"
                    }">${dayData.focus}</span>
                </div>
                ${
                  isRestDay
                    ? `
                    <div class="flex flex-col items-center justify-center h-48 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p class="text-lg">Take a break and recover.</p>
                    </div>
                `
                    : `
                    <ul class="space-y-2">
                        ${exercisesHtml}
                    </ul>
                `
                }
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  const plan = workoutData; // ✅ FIXED: Directly use workoutData as it's already an array
  container.innerHTML = plan
    .map((day, index) => createWorkoutDayCard(day, index))
    .join("");
});
