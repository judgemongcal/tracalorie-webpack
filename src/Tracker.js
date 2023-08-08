import Storage from "./Storage";

// Calorie Tracker Class

class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories(0);
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();

        this._displayCalorieLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

        document.querySelector('#limit').value = this._calorieLimit;
    }

    // Public Methods/ API

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        Storage.saveMeal(meal);
        this._displayNewMeal(meal);
        this._render();
        };

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        Storage.updateTotalCalories(this._totalCalories);
        Storage.saveWorkout(workout);
        this._displayNewWorkout(workout);
        this._render();
    };

    removeMeal(id) {
        const index = this._meals.findIndex((meal) => meal.id === id);

        if(index !== -1) {
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            Storage.updateTotalCalories(this._totalCalories);
            this._meals.splice(index, 1);
            Storage.removeMeal(id);
            this._render();
        };
    };

    removeWorkout(id) {
        const index = this._workouts.findIndex((workout) => workout.id === id);

        if(index !== -1){
            const workout = this._workouts[index];
            this._totalCalories += workout.calories;
            Storage.updateTotalCalories(this._totalCalories);
            this._workouts.splice(index, 1);
            Storage.removeWorkout(id);
            this._render();
        };
    };

    reset() {
        if(confirm('You are about to reset all data. Are you sure?')){
            this._totalCalories = 0;
            Storage.updateTotalCalories(this._totalCalories);
            this._meals = [];
            this._workouts = [];
            Storage.resetAll();
            this._render();
        };
    };

    setLimit(calorieLimit) {
        this._calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit);
        this._displayCalorieLimit();
        this._render();
    };

    loadItems() {
        this._meals.forEach(meal => this._displayNewMeal(meal));
        this._workouts.forEach(workout => this._displayNewWorkout(workout));
    }

    // Private Methods

    _displayCaloriesTotal() {
        const totalCaloriesEl = document.querySelector('#calories-total');
        totalCaloriesEl.innerText = this._totalCalories;
    };


    _displayCalorieLimit() {
        const calorieLimitEl = document.querySelector('#calories-limit');
        calorieLimitEl.innerText = this._calorieLimit;
    };

    _displayCaloriesConsumed() {
        const caloriesConsumedEl = document.querySelector('#calories-consumed');
        // let calConsumed = 0;
        // for(let x = 0; x < this._meals.length; x++){
        //     calConsumed += this._meals[x].calories;
        // };

        const calConsumed = this._meals.reduce((total, meal) => total + meal.calories, 0);

        caloriesConsumedEl.innerText = calConsumed;

    };

    _displayCaloriesBurned() {
        const caloriesBurnedEl = document.querySelector('#calories-burned');
        // let calBurned = 0;
        // for(let x = 0; x < this._workouts.length; x++){
        //     calBurned += this._workouts[x].calories;
        // }

        const calBurned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
        caloriesBurnedEl.innerText = calBurned;

    };

    _displayCaloriesRemaining() {
        const caloriesRemainingEl = document.querySelector('#calories-remaining');
        const progressEl = document.querySelector('#calorie-progress');

        const calRemaining = this._calorieLimit - this._totalCalories;
        caloriesRemainingEl.innerText = calRemaining;
        
        const div = caloriesRemainingEl.parentElement.parentElement;

        if(calRemaining < 0) {

            div.classList.remove('bg-light');
            div.classList.add('bg-danger');

  
            progressEl.classList.remove('bg-success');
            progressEl.classList.add('bg-danger');
        } else{
            div.classList.remove('bg-danger');
            div.classList.add('bg-add');

            progressEl.classList.remove('bg-danger');
            progressEl.classList.add('bg-success');
        };
    };

    _displayCaloriesProgress() {
        const progressEl = document.querySelector('#calorie-progress');
        const width = (this._totalCalories / this._calorieLimit) * 100;
        progressEl.style.width = width > 0? `${width}%` : `0%`;
    };

    _displayNewMeal(meal){
        const mealsEl = document.querySelector('#meal-items');

        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id', meal.id);

        mealEl.innerHTML = `
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
          ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
        `;

        mealsEl.appendChild(mealEl);
    };

    _displayNewWorkout(workout){
        const workoutsEl = document.querySelector('#workout-items');

        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id', workout.id);

        workoutEl.innerHTML = `
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div
            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
        `;

        workoutsEl.appendChild(workoutEl);
    };

    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

    };
};

export default CalorieTracker;