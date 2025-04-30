// Ahaar - AI-Powered Nutrition & Meal Planning Assistant
// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Scroll animation for features
    const featureElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        featureElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.animationDelay = element.dataset.delay || '0s';
                element.classList.add('active');
            }
        });
    }

    // Check on initial load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Initialize 3D effect for recipe cards if vanilla-tilt.js is loaded
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".recipe-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // Handle user category selection
    const categoryForm = document.getElementById('categoryForm');
    const fitnessOptions = document.getElementById('fitnessOptions');
    const medicalOptions = document.getElementById('medicalOptions');
    const motherhoodOptions = document.getElementById('motherhoodOptions');
    const parentingOptions = document.getElementById('parentingOptions');

    if (categoryForm) {
        const userCategorySelect = document.getElementById('user_category');
        
        userCategorySelect.addEventListener('change', function() {
            // Hide all option groups first
            if (fitnessOptions) fitnessOptions.style.display = 'none';
            if (medicalOptions) medicalOptions.style.display = 'none';
            if (motherhoodOptions) motherhoodOptions.style.display = 'none';
            if (parentingOptions) parentingOptions.style.display = 'none';
            
            // Show relevant option group based on selection
            const selectedValue = this.value;
            if (selectedValue === 'fitness' && fitnessOptions) {
                fitnessOptions.style.display = 'block';
            } else if (selectedValue === 'special_diet' && medicalOptions) {
                medicalOptions.style.display = 'block';
            } else if (selectedValue === 'motherhood' && motherhoodOptions) {
                motherhoodOptions.style.display = 'block';
            } else if (selectedValue === 'parenting' && parentingOptions) {
                parentingOptions.style.display = 'block';
            }
        });
    }

    // Kitchen feature - Ingredient Scanner simulation
    const scanBtn = document.getElementById('scanIngredientBtn');
    const scanResult = document.getElementById('scanResult');
    const ingredientSpinner = document.getElementById('ingredientSpinner');
    
    if (scanBtn && scanResult) {
        scanBtn.addEventListener('click', function() {
            // Show loading spinner
            if (ingredientSpinner) {
                ingredientSpinner.style.display = 'block';
            }
            
            // Hide previous results
            if (scanResult) {
                scanResult.innerHTML = '';
                scanResult.style.display = 'none';
            }
            
            // Simulate processing time
            setTimeout(function() {
                // Sample ingredients for demo
                const ingredients = [
                    'Tomatoes',
                    'Onions',
                    'Ginger',
                    'Green Chilies',
                    'Coriander Leaves'
                ];
                
                // Create HTML for detected ingredients
                let html = '<h5 class="mb-3">Detected Ingredients:</h5>';
                html += '<ul class="list-group">';
                
                ingredients.forEach(ingredient => {
                    html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                        ${ingredient}
                        <span class="badge bg-success rounded-pill">Detected</span>
                    </li>`;
                });
                
                html += '</ul>';
                html += '<div class="mt-3"><button class="btn btn-primary">Find Recipes with These Ingredients</button></div>';
                
                // Hide spinner
                if (ingredientSpinner) {
                    ingredientSpinner.style.display = 'none';
                }
                
                // Show results
                if (scanResult) {
                    scanResult.innerHTML = html;
                    scanResult.style.display = 'block';
                }
            }, 2000); // 2 second delay to simulate processing
        });
    }

    // Animate stats counters on dashboard
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // milliseconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        animateCounter(counter);
    });

    // Recipe cards 3D scroll effect
    const recipeContainer = document.querySelector('.recipes-scroll-container');
    if (recipeContainer) {
        recipeContainer.addEventListener('scroll', function() {
            const cards = this.querySelectorAll('.card');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const centerY = window.innerHeight / 2;
                const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - centerY);
                const scale = Math.max(0.8, 1 - distanceFromCenter / 1000);
                const rotation = (rect.top + rect.height / 2 - centerY) / 20;
                
                card.style.transform = `rotateX(${rotation}deg) scale(${scale})`;
                card.style.zIndex = scale * 10;
            });
        });
    }

    // Personalized recipe recommendation based on time of day
    const recipeRecommendation = document.getElementById('recipeRecommendation');
    if (recipeRecommendation) {
        const hour = new Date().getHours();
        let mealType, mealRecommendation;
        
        if (hour >= 5 && hour < 11) {
            mealType = 'Breakfast';
            mealRecommendation = 'Ragi Dosa with Coconut Chutney';
        } else if (hour >= 11 && hour < 15) {
            mealType = 'Lunch';
            mealRecommendation = 'Vegetable Khichdi with Beet and Carrot Raita';
        } else if (hour >= 15 && hour < 18) {
            mealType = 'Snack';
            mealRecommendation = 'Sprouts Chaat';
        } else {
            mealType = 'Dinner';
            mealRecommendation = 'Dal Tadka with Brown Rice';
        }
        
        recipeRecommendation.innerHTML = `
            <div class="alert alert-success" role="alert">
                <h5>Recommended for ${mealType}</h5>
                <p class="mb-0">Based on your profile and the time of day, we recommend: <strong>${mealRecommendation}</strong></p>
            </div>
        `;
    }

    // Implement tab navigation for kitchen features
    const kitchenTabs = document.querySelectorAll('[data-kitchen-tab]');
    const kitchenTabContents = document.querySelectorAll('.kitchen-tab-content');
    
    if (kitchenTabs.length > 0) {
        kitchenTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs and contents
                kitchenTabs.forEach(t => t.classList.remove('active'));
                kitchenTabContents.forEach(c => c.style.display = 'none');
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const target = this.getAttribute('data-kitchen-tab');
                document.getElementById(target).style.display = 'block';
            });
        });
        
        // Activate first tab by default
        kitchenTabs[0].click();
    }
});
