import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/common/Layout';
import HomePage from './components/home/HomePage';
import SeasonalFoodsList from './components/seasonalFoods/SeasonalFoodsList';
import NutritionPlanForm from './components/nutritionPlan/NutritionPlanForm';
import FitnessPlanForm from './components/fitnessPlan/FitnessPlanForm';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/seasonal-foods" element={<SeasonalFoodsList />} />
            <Route path="/nutrition-plan" element={<NutritionPlanForm />} />
            <Route path="/fitness-plan" element={<FitnessPlanForm />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;