// Storage Class

class Storage {

    // Calorie Limit
    static getCalorieLimit(defaultLimit = 2000) {
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        };

        return calorieLimit;
    };

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    };


    // Total Calories
    static getTotalCalories(defaultTotal = 2000) {
        let totalCalories;
        if(localStorage.getItem('totalCalories') === null) {
            totalCalories = defaultTotal;
        } else {
            totalCalories = +localStorage.getItem('totalCalories');
        };

        return totalCalories;
    };

    static updateTotalCalories(totalCalories) {
        localStorage.setItem('totalCalories', totalCalories);
    }

    // Meals
    
    static getMeals(){
        let meals;
        if(localStorage.getItem('meals') === null){
            meals = [];
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }

        return meals;
    };

    static saveMeal(meal){
        const meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));
    };

    static removeMeal(id){
        const meals = Storage.getMeals();
        meals.forEach((meal, index) => {
            if(meal.id === id) {
                meals.splice(index,1);
            }
        });

        localStorage.setItem('meals', JSON.stringify(meals));
    };

    // Workouts

    static getWorkouts(){
        let workouts;
        if(localStorage.getItem('workouts') === null){
            workouts = [];
        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;
    };

    static saveWorkout(workout) {
        const workouts = Storage.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    };

    static removeWorkout(id){
        const workouts = Storage.getWorkouts();
        workouts.forEach((workout, index) => {
            if(workout.id === id) {
                workouts.splice(index,1);
            }
        });

        localStorage.setItem('workouts', JSON.stringify(workouts));
    };

    static resetAll(){
        localStorage.removeItem('workouts');
        localStorage.removeItem('meals');
        localStorage.removeItem('calorieLimit');
    }
};

export default Storage;