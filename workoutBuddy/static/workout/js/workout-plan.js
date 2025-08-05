
        const synth = new Tone.Synth().toDestination();

        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('.container').classList.add('loaded');
            // For standalone HTML, define mockWorkoutPlan directly
            renderWorkoutPlan(mockWorkoutPlan.data.plan);
            startQuoteRotator();
        });

        // --- Mock Data for Workout Plan (JSON format) ---
        const mockWorkoutPlan = {
            "message": "Weekly workout plan created successfully",
            "status": 201,
            "success": true,
            "data": {
                "plan_id": "687e05733e68e243b2dc12e3",
                "plan": [
                    {
                        "day": "Monday",
                        "focus": "Chest & Triceps",
                        "icon": "🔥", // Added icon for rendering
                        "exercises": [
                            { "name": "Push-ups", "sets": 3, "reps": "10-12", "equipment": "Bodyweight", "duration_per_set": null, "tip": "Keep core tight, full range of motion." },
                            { "name": "Incline Dumbbell Press", "sets": 3, "reps": "8-10", "equipment": "Dumbbells", "duration_per_set": null, "tip": "Focus on upper chest, control the eccentric." },
                            { "name": "Dumbbell Flyes", "sets": 3, "reps": "12-15", "equipment": "Dumbbells", "duration_per_set": null, "tip": "Wide arc, squeeze chest at the top." },
                            { "name": "Close-Grip Bench Press", "sets": 3, "reps": "8-10", "equipment": "Barbell", "duration_per_set": null, "tip": "Elbows tucked, focus on triceps drive." },
                            { "name": "Overhead Dumbbell Extension", "sets": 3, "reps": "10-12", "equipment": "Dumbbells", "duration_per_set": null, "tip": "Keep elbows close to head, full stretch." },
                            { "name": "Triceps Dips", "sets": 3, "reps": "Max", "equipment": "Bodyweight", "duration_per_set": null, "tip": "Lower until arms are parallel, push up with triceps." }
                        ]
                    },
                    {
                        "day": "Tuesday",
                        "focus": "Legs & Shoulders",
                        "icon": "🦵", // Added icon for rendering
                        "exercises": [
                            { "name": "Goblet Squats", "sets": 3, "reps": "10-12", "equipment": "Dumbbell", "duration_per_set": null, "tip": "Chest up, deep squat, knees out." },
                            { "name": "Leg Press", "sets": 3, "reps": "12-15", "equipment": "Leg Press Machine", "duration_per_set": null, "tip": "Push through heels, control descent." },
                            { "name": "Hamstring Curls", "sets": 3, "reps": "12-15", "equipment": "Hamstring Curl Machine", "duration_per_set": null, "tip": "Slow and controlled, squeeze hamstrings." },
                            { "name": "Calf Raises", "sets": 3, "reps": "15-20", "equipment": "Bodyweight", "duration_per_set": null, "tip": "Full range of motion, pause at the top." },
                            { "name": "Overhead Press", "sets": 3, "reps": "8-10", "equipment": "Barbell", "duration_per_set": null, "tip": "Engage core, press straight up." },
                            { "name": "Lateral Raises", "sets": 3, "reps": "12-15", "equipment": "Dumbbells", "duration_per_set": null, "tip": "Lead with elbows, slight bend in arms." }
                        ]
                    },
                    {
                        "day": "Wednesday",
                        "focus": "Cardio",
                        "icon": "🏃", // Added icon for rendering
                        "exercises": [
                            { "name": "Running", "sets": 1, "reps": "30 minutes", "equipment": "Treadmill", "duration_per_set": "30 minutes", "tip": "Maintain a steady, comfortable pace." }
                        ]
                    },
                    {
                        "day": "Thursday",
                        "focus": "Back & Biceps",
                        "icon": "💪", // Added icon for rendering
                        "exercises": [
                            { "name": "Bent-Over Rows", "sets": 3, "reps": "8-10", "equipment": "Barbell", "duration_per_set": null, "tip": "Keep back flat, pull to lower chest." },
                            { "name": "Lat Pulldowns", "sets": 3, "reps": "10-12", "equipment": "Lat Pulldown Machine", "duration_per_set": null, "tip": "Squeeze shoulder blades, feel the lats." },
                            { "name": "Seated Cable Rows", "sets": 3, "reps": "12-15", "equipment": "Cable Machine", "duration_per_set": null, "tip": "Pull to your core, control the stretch." },
                            { "name": "Bicep Curls", "sets": 3, "reps": "10-12", "equipment": "Barbell", "duration_per_set": null, "tip": "Keep elbows tucked, focus on the squeeze." },
                            { "name": "Hammer Curls", "sets": 3, "reps": "12-15", "equipment": "Dumbbells", "duration_per_set": null, "tip": "Palms facing each other, target brachialis." }
                        ]
                    },
                    {
                        "day": "Friday",
                        "focus": "Core & Shoulders",
                        "icon": "💥", // Added icon for rendering
                        "exercises": [
                            { "name": "Plank", "sets": 3, "reps": "30-60 seconds", "equipment": "Bodyweight", "duration_per_set": "30-60 seconds", "tip": "Maintain a straight line, engage core." },
                            { "name": "Crunches", "sets": 3, "reps": "15-20", "equipment": "Bodyweight", "duration_per_set": null, "tip": "Focus on abdominal contraction, not neck." },
                            { "name": "Russian Twists", "sets": 3, "reps": "15-20 per side", "equipment": "Dumbbell (optional)", "duration_per_set": null, "tip": "Rotate from your core, keep feet off ground." },
                            { "name": "Dumbbell Shoulder Press", "sets": 3, "reps": "10-12", "equipment": "Dumbbells", "duration_per_set": null, "tip": "Press straight up, avoid arching your back." },
                            { "name": "Front Raises", "sets": 3, "reps": "12-15", "equipment": "Dumbbells", "duration_per_set": null, "tip": "Controlled movement, avoid swinging." }
                        ]
                    },
                    {
                        "day": "Saturday",
                        "focus": "Rest Day",
                        "icon": "🛌", // Added icon for rendering
                        "exercises": []
                    },
                    {
                        "day": "Sunday",
                        "focus": "Active Recovery",
                        "icon": "🧘", // Added icon for rendering
                        "exercises": [
                            { "name": "Light Jogging", "sets": 1, "reps": "20 minutes", "equipment": "Bodyweight", "duration_per_set": "20 minutes", "tip": "Gentle pace to promote blood flow." },
                            { "name": "Yoga or Stretching", "sets": 1, "reps": "20 minutes", "equipment": "Mat", "duration_per_set": "20 minutes", "tip": "Focus on deep breathing and flexibility." }
                        ]
                    }
                ]
            }
        };


        let currentActiveDayIndex = 0;
        let completedDays = new Set(); // To track progress
        let exerciseCompletionStatus = {}; // {dayIndex: {exerciseIndex: true/false}}

        const motivationalQuotes = [
            "Your body can stand almost anything. It's your mind that you have to convince.",
            "The only bad workout is the one that didn't happen.",
            "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
            "Strength does not come from physical capacity. It comes from an indomitable will.",
            "Today's actions are tomorrow's results.",
            "The journey of a thousand miles begins with a single step.",
            "Push yourself, because no one else is going to do it for you.",
            "The pain you feel today will be the strength you feel tomorrow."
        ];
        let currentQuoteIndex = 0;
        let quoteInterval;

        function startQuoteRotator() {
            if (quoteInterval) clearInterval(quoteInterval); // Clear existing interval if any
            const quoteDisplay = document.getElementById('dailyMotivationalQuote');
            quoteDisplay.textContent = motivationalQuotes[currentQuoteIndex]; // Set initial quote

            quoteInterval = setInterval(() => {
                currentQuoteIndex = (currentQuoteIndex + 1) % motivationalQuotes.length;
                quoteDisplay.textContent = motivationalQuotes[currentQuoteIndex];
            }, 8000); // Change every 8 seconds
        }

        function renderWorkoutPlan(plan) {
            const container = document.getElementById('workoutPlanContainer');
            container.innerHTML = ''; // Clear previous content

            plan.forEach((dayData, index) => {
                const isActive = index === currentActiveDayIndex;
                const dayCard = document.createElement('div');
                dayCard.className = `day-card ${isActive ? 'active' : ''}`;
                dayCard.dataset.index = index;

                // Initialize exercise completion for this day if not already done
                if (!exerciseCompletionStatus[index]) {
                    exerciseCompletionStatus[index] = {};
                    dayData.exercises.forEach((_, exIndex) => {
                        exerciseCompletionStatus[index][exIndex] = false;
                    });
                }

                dayCard.innerHTML = `
                    <div class="flex items-center justify-between">
                        <h3 class="text-2xl font-semibold text-white flex items-center">
                            <span class="text-3xl mr-3 day-icon">${dayData.icon || '🗓️'}</span> ${dayData.day}: ${dayData.focus}
                        </h3>
                        <svg class="w-6 h-6 text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <div class="day-content ${isActive ? 'h-auto max-h-screen' : 'h-0 max-h-0'}">
                        <div class="pt-4">
                            ${dayData.exercises.length > 0 ? dayData.exercises.map((exercise, exIndex) => `
                                <div class="exercise-row ${exerciseCompletionStatus[index][exIndex] ? 'completed' : ''}" data-day-index="${index}" data-ex-index="${exIndex}" style="transition-delay: ${exIndex * 0.05}s;">
                                    <div class="flex-grow">
                                        <p class="font-medium text-gray-100">
                                            ${exercise.name}
                                            <span class="text-sm text-gray-400">
                                                (${exercise.duration_per_set ? exercise.duration_per_set : `${exercise.sets} sets x ${exercise.reps}`})
                                            </span>
                                        </p>
                                        <div class="tooltip">
                                            <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                                            ${exercise.tip ? `<p><strong>Tip:</strong> ${exercise.tip}</p>` : ''}
                                        </div>
                                    </div>
                                    <button class="text-[#2CFF05] hover:text-white text-sm font-semibold ml-4" data-action="mark-complete">
                                        ${exerciseCompletionStatus[index][exIndex] ? 'Completed ✅' : 'Mark Complete'}
                                    </button>
                                </div>
                            `).join('') : '<p class="text-gray-400 italic">No specific exercises planned for today. Enjoy your rest!</p>'}
                        </div>
                    </div>
                `;
                container.appendChild(dayCard);

                // Animate exercises in if the day is active
                if (isActive) {
                    setTimeout(() => {
                        dayCard.querySelectorAll('.exercise-row').forEach(row => {
                            row.classList.add('visible');
                        });
                        // Animate the day icon when active
                        const dayIcon = dayCard.querySelector('.day-icon');
                        if (dayIcon) {
                            dayIcon.animate([
                                { transform: 'scale(1)', opacity: 1 },
                                { transform: 'scale(1.1)', opacity: 0.9 },
                                { transform: 'scale(1)', opacity: 1 }
                            ], { duration: 500, easing: 'ease-in-out', iterations: 1 });
                        }
                    }, 50); // Small delay for initial render
                }
            });

            updateProgressTracker();
        }

        // --- Event Listeners ---
        document.getElementById('workoutPlanContainer').addEventListener('click', (e) => {
            const dayCard = e.target.closest('.day-card');
            if (dayCard) {
                const clickedIndex = parseInt(dayCard.dataset.index);
                if (clickedIndex === currentActiveDayIndex) {
                    // Toggle the current active card if clicked again
                    const content = dayCard.querySelector('.day-content');
                    const icon = dayCard.querySelector('svg');
                    const isActive = content.classList.contains('max-h-screen');

                    content.classList.toggle('max-h-screen', !isActive);
                    content.classList.toggle('h-auto', !isActive);
                    icon.classList.toggle('rotate-180', !isActive);

                    dayCard.querySelectorAll('.exercise-row').forEach(row => {
                        row.classList.toggle('visible', !isActive);
                    });

                    if (isActive) {
                        synth.triggerAttackRelease("G3", "16n"); // Collapse sound
                    } else {
                        synth.triggerAttackRelease("C4", "16n"); // Expand sound
                    }

                } else {
                    currentActiveDayIndex = clickedIndex;
                    renderWorkoutPlan(mockWorkoutPlan.data.plan); // Use mockWorkoutPlan
                    synth.triggerAttackRelease("D4", "16n"); // Day switch sound
                    updateMascot('day-switch');
                }
                completedDays.add(currentActiveDayIndex); // Mark day as viewed/completed
                updateProgressTracker();
            }

            const markCompleteBtn = e.target.closest('button[data-action="mark-complete"]');
            if (markCompleteBtn) {
                const exerciseRow = markCompleteBtn.closest('.exercise-row');
                const dayIndex = parseInt(exerciseRow.dataset.dayIndex);
                const exIndex = parseInt(exerciseRow.dataset.exIndex);

                const isCompleted = exerciseCompletionStatus[dayIndex][exIndex];
                exerciseCompletionStatus[dayIndex][exIndex] = !isCompleted; // Toggle status

                if (exerciseCompletionStatus[dayIndex][exIndex]) {
                    exerciseRow.classList.add('completed');
                    markCompleteBtn.textContent = 'Completed ✅';
                    synth.triggerAttackRelease("E5", "32n"); // Success sound
                    updateMascot('exercise-complete');
                } else {
                    exerciseRow.classList.remove('completed');
                    markCompleteBtn.textContent = 'Mark Complete';
                    synth.triggerAttackRelease("C5", "32n"); // Undo sound
                    updateMascot('exercise-click'); // Revert mascot
                }
            }
        });

        // --- Progress Tracker Logic ---
        function updateProgressTracker() {
            const progressBar = document.getElementById('weeklyProgressBar');
            const progressDotsContainer = document.getElementById('progressDots');
            const totalDays = mockWorkoutPlan.data.plan.length; // Use mockWorkoutPlan
            const progressPercentage = (completedDays.size / totalDays) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            progressDotsContainer.innerHTML = ''; // Clear existing dots
            for (let i = 0; i < totalDays; i++) {
                const dot = document.createElement('span');
                dot.className = `progress-dot ${completedDays.has(i) ? 'completed' : ''} ${i === currentActiveDayIndex ? 'active' : ''}`;
                dot.textContent = i + 1; // Day number
                progressDotsContainer.appendChild(dot);
            }
        }

        // --- Mascot Reactions ---
        function updateMascot(action) {
            const mascot = document.getElementById('mascotEmoji');
            mascot.classList.remove('react'); // Reset animation state
            // Force reflow to restart animation
            void mascot.offsetWidth; 

            if (action === 'day-switch') {
                mascot.textContent = '🤩'; // Excited
            } else if (action === 'exercise-click') {
                mascot.textContent = '🤔'; // Thinking/considering
            } else if (action === 'exercise-complete') {
                mascot.textContent = '✅'; // Checkmark/Success
            } else if (action === 'generate-plan') {
                mascot.textContent = '🎉'; // Celebrating
            } else if (action === 'save-share') {
                mascot.textContent = '👍'; // Thumbs up
            } else {
                mascot.textContent = '👋'; // Default wave
            }
            mascot.classList.add('react'); // Trigger react animation
        }


        // --- Action Buttons Logic ---
        document.getElementById('generateAnotherPlanBtn').addEventListener('click', () => {
            const btn = document.getElementById('generateAnotherPlanBtn');
            btn.classList.add('sparkle'); // Trigger sparkle animation
            btn.disabled = true; // Disable button during fetch
            synth.triggerAttackRelease("C5", "8n", "+0.05", 0.5); // Sound feedback
            synth.triggerAttackRelease("E5", "8n", "+0.1", 0.7);
            synth.triggerAttackRelease("G5", "8n", "+0.15", 0.9);

            // Simulate fetching new data
            setTimeout(() => {
                // In a real app, you'd fetch new data here
                // For demo, we just re-render the same plan or a slightly modified one
                renderWorkoutPlan(mockWorkoutPlan.data.plan); // Use mockWorkoutPlan
                currentActiveDayIndex = 0; // Reset to first day
                completedDays.clear(); // Reset progress
                exerciseCompletionStatus = {}; // Reset exercise completion
                updateProgressTracker();
                updateMascot('generate-plan');
                btn.classList.remove('sparkle'); // Remove sparkle class after animation
                btn.disabled = false; // Re-enable button
            }, 1500); // Simulate API call delay
        });

        // --- Preview Modal Logic ---
        const previewModalOverlay = document.getElementById('previewModalOverlay');
        const modalPlanSummary = document.getElementById('modalPlanSummary');
        const closeModalBtn = document.getElementById('closeModalBtn');

        document.getElementById('previewThisWeekBtn').addEventListener('click', () => {
            modalPlanSummary.innerHTML = ''; // Clear previous summary

            mockWorkoutPlan.data.plan.forEach(dayData => { // Use mockWorkoutPlan
                const summaryCard = document.createElement('div');
                // Updated for dark theme
                summaryCard.className = 'bg-gray-800 text-gray-200 p-4 rounded-lg shadow-md border border-gray-700';
                summaryCard.innerHTML = `
                    <h4 class="font-bold text-[#2CFF05] text-lg mb-2 flex items-center">
                        <span class="text-2xl mr-2">${dayData.icon || '🗓️'}</span> ${dayData.day}: ${dayData.focus}
                    </h4>
                    <ul class="list-disc list-inside text-gray-300 text-sm">
                        ${dayData.exercises.slice(0, 3).map(ex => `<li>${ex.name} (${ex.duration_per_set ? ex.duration_per_set : `${ex.sets} sets x ${ex.reps}`})</li>`).join('')}
                        ${dayData.exercises.length > 3 ? `<li>... and more!</li>` : ''}
                    </ul>
                `;
                modalPlanSummary.appendChild(summaryCard);
            });

            previewModalOverlay.classList.add('show');
            previewModalOverlay.classList.remove('hidden');
            synth.triggerAttackRelease("F4", "8n"); // Modal open sound
        });

        closeModalBtn.addEventListener('click', () => {
            previewModalOverlay.classList.remove('show');
            setTimeout(() => {
                previewModalOverlay.classList.add('hidden');
            }, 300); // Allow transition to complete before hiding
            synth.triggerAttackRelease("C4", "8n"); // Modal close sound
        });

        // Close modal if clicked outside content
        previewModalOverlay.addEventListener('click', (e) => {
            if (e.target === previewModalOverlay) {
                closeModalBtn.click();
            }
        });

        // --- Save and Share Buttons (UI Feedback Only) ---
        document.getElementById('savePlanBtn').addEventListener('click', () => {
            const btn = document.getElementById('savePlanBtn');
            btn.textContent = 'Saving...';
            btn.disabled = true;
            synth.triggerAttackRelease("G4", "16n"); // Saving sound

            setTimeout(() => {
                btn.textContent = 'Plan Saved! ✅';
                btn.style.backgroundImage = 'linear-gradient(to right, #2CFF05, #000)';
                btn.style.boxShadow = '0 0 15px #2CFF05';
                updateMascot('save-share');
                synth.triggerAttackRelease("C5", "8n"); // Success sound
                setTimeout(() => {
                    btn.textContent = 'Save My Plan';
                    btn.style.backgroundImage = 'linear-gradient(to right, #2CFF05, #000)';
                    btn.style.boxShadow = ''; // Reset shadow
                    btn.disabled = false;
                }, 2000);
            }, 1000);
        });

        document.getElementById('sharePlanBtn').addEventListener('click', () => {
            const btn = document.getElementById('sharePlanBtn');
            btn.textContent = 'Sharing...';
            btn.disabled = true;
            synth.triggerAttackRelease("G4", "16n"); // Sharing sound

            setTimeout(() => {
                btn.textContent = 'Shared! 🚀';
                btn.style.backgroundImage = 'linear-gradient(to right, #2CFF05, #000)';
                btn.style.boxShadow = '0 0 15px #2CFF05';
                synth.triggerAttackRelease("C5", "8n"); // Corrected typo here
                updateMascot('save-share');
                setTimeout(() => {
                    btn.textContent = 'Share with Trainer';
                    btn.style.backgroundImage = 'linear-gradient(to right, #2CFF05, #000)';
                    btn.style.boxShadow = ''; // Reset shadow
                    btn.disabled = false;
                }, 2000);
            }, 1000);
        });

        // Adding marked.js CDN for Markdown to HTML conversion (if needed for future plan content)
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = () => {
             if (typeof marked === 'undefined') {
                console.error("marked.js failed to load.");
             }
        };
        document.head.appendChild(script);