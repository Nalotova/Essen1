# FlowFood

An AI-powered household nutrition planner that helps families manage fridge inventory, plan meals from available ingredients, calculate personalized portions, and keep a daily food log.

FlowFood is built around a practical home problem: what can we cook today, for which family members, with the food already available, while respecting calories, preferences, allergies, and remaining inventory.

## Project Highlights

- AI-assisted virtual fridge with text and image-based food entry
- Product recognition from package photos and nutrition labels
- Multi-profile household system with roles, invites, and permissions
- Personalized meal planning for several people at once
- AI chef that generates recipes from available fridge items
- Portion calculation by profile, kcal targets, and meal type
- Ingredient write-off after accepting a cooking plan
- Food log and daily nutrition summaries
- Firebase-based authentication, household data, and persistence
- Mobile-first PWA-oriented interface

## Core Idea

FlowFood connects three everyday workflows that are usually separated:

1. What food do we have at home?
2. What should we cook for the people eating today?
3. How does this meal affect inventory and daily nutrition?

The app keeps these pieces connected. The fridge inventory feeds the AI cooking planner; the generated plan produces portions and ingredient usage; accepted meals update both the fridge and the food log.

## Key Features

### Virtual Fridge

- Add food manually with calories and macronutrients
- Adjust product amounts directly from the fridge list
- Filter and search products by name, brand, and category
- Parse natural-language food input into structured product cards
- Detect similar existing products and merge quantities when appropriate
- Review AI-generated drafts before saving them

### Photo-Based Product Recognition

FlowFood can analyze photos of product packaging or nutrition labels and convert them into structured food items.

The recognition flow extracts:

- Product name and brand
- Package amount and unit
- Calories and macronutrients per 100g
- Food categories and storage state
- Confidence score, notes, and review warnings

### Household Profiles and Permissions

The app supports shared household use instead of a single-user-only model.

- Google sign-in
- Household creation and switching
- Pending invite handling
- Role-based permissions for editing, inviting, and managing members
- Individual food profiles with kcal targets, portion multipliers, allergies, forbidden foods, likes, and dislikes

### AI Meal Planning

The AI cooking service generates meal plans using only available fridge items. It considers:

- Selected meal type: breakfast, lunch, snack, or dinner
- Selected participants
- Daily kcal targets and already consumed food
- Remaining day calories
- Allergies and forbidden foods
- Preferred and excluded ingredients
- Requested dish names or user comments
- Available inventory and exact product amounts

The result includes:

- Meal name and explanation
- Per-person portions
- Total ingredient list
- Nutrition totals per participant
- Recipe steps and taste notes
- Inventory state after cooking
- Validation warnings when targets or inventory constraints are not met

### AI Chef Chat and Revisions

After a meal plan is generated, the user can chat with the AI chef to ask questions or request changes.

The AI can either:

- Answer questions about the current menu
- Propose a revised cooking result, such as more protein, fewer carbs, a different ingredient, or a more filling version

The proposed revision is reviewed before being accepted.

### Cooking Acceptance Flow

When the user accepts a generated meal:

- Used ingredients are subtracted from the fridge
- A food log entry is created for each participant
- Portion nutrition is saved with the meal
- The cooking result can be stored in history

### Nutrition Tracking

- Daily food log entries
- Quick snack entry
- Per-profile nutrition summaries
- Remaining kcal for the day
- Protein, fat, and carb tracking
- Planned meal integration with daily totals

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Styling and UI | Tailwind CSS, Motion, Lucide React |
| AI | Google Gemini via a shared AI client |
| Backend | Express, tsx |
| Auth and Data | Firebase Auth, Firestore |
| PWA | Web manifest, offline page, mobile app metadata |
| State and Domain Logic | Custom React hooks and services |
| Validation | Custom cooking and nutrition validation utilities |

## Architecture

```text
React / Vite App
  |
  |-- Household profiles and permissions
  |-- Virtual fridge
  |-- Food log
  |-- Cooking planner
  |-- AI chef chat
        |
        v
AI Services
  |
  |-- fridgeAiService: natural-language food parsing
  |-- photoFoodRecognitionService: package and nutrition-label recognition
  |-- aiCookingService: meal planning from inventory and nutrition targets
  |-- chefChatService: questions and revisions for generated meals
        |
        v
Domain Services
  |
  |-- cookingService: target calculations
  |-- cookingHistoryService: saved meal plans
  |-- foodLogService: daily nutrition entries
  |-- fridgeService: inventory persistence
  |-- householdService: roles, members, invites
        |
        v
Firebase / Express
  |
  |-- Firebase Auth
  |-- Firestore household and nutrition data
  |-- Express/Vite local runtime
```

## What I Built

- Designed a household food-management workflow around real family use cases
- Implemented a virtual fridge with structured nutrition data and AI-assisted item entry
- Built photo-based food recognition for product packages and nutrition labels
- Created a multi-profile nutrition model with calories, macros, preferences, allergies, and portion multipliers
- Implemented AI meal planning that respects inventory, restrictions, kcal targets, and meal type
- Added validation to check inventory usage, target deviations, and forbidden-food conflicts
- Built an acceptance workflow that writes off ingredients and creates food log entries
- Added AI chef chat for explaining or revising generated meal plans
- Implemented Firebase-backed authentication, household roles, invites, and persistence
- Built a mobile-first PWA-style interface for kitchen use

## Why This Project Matters

FlowFood demonstrates product thinking across AI, data modeling, and real household operations. The AI is not used as a decorative chat feature: it is connected to inventory, nutrition targets, cooking constraints, and persistent app state.

For recruiters, this project shows experience with:

- Building a complex React/TypeScript application
- Designing AI workflows with structured JSON outputs and validation
- Modeling real-world household, food, inventory, and nutrition data
- Integrating Firebase Auth and Firestore-backed persistence
- Building role-based multi-user product logic
- Turning AI-generated plans into concrete state changes inside the app
- Designing mobile-first interfaces for repeated daily use

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Auth and Firestore configured
- Google Gemini API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Firebase configuration is loaded from `firebase-applet-config.json`.

### Run Locally

```bash
npm run dev
```

or:

```bash
npm start
```

### Build

```bash
npm run build
```

### Type Check

```bash
npm run lint
```

## Data Model Overview

FlowFood works with several connected domain models:

- `FoodItem` - fridge inventory, amount, unit, calories, macros, category, source, and state
- `UserProfile` - household member, daily kcal, meal distribution, preferences, allergies, and restrictions
- `CookingRequest` - selected participants, meal type, preferred/excluded foods, target strategy, and user comments
- `CookingResult` - AI-generated meal, portions, ingredients, inventory movements, recipe, warnings, and validation report
- `FoodLogEntry` - accepted meals, quick snacks, nutrition totals, and daily tracking
- `Household` - shared household, owner, members, roles, and invites

## Privacy and Safety Notes

The app handles household food data, personal nutrition targets, and user profiles. A production deployment should include strict Firestore security rules, consent-aware household sharing, and clear policies for AI-generated nutrition suggestions.

The AI chef should be treated as a meal-planning assistant, not medical or clinical nutrition advice.

## Roadmap

- Rename the GitHub repository from `Essen1` to `FlowFood`
- Add screenshots and a short product walkthrough
- Add a demo mode with sample household, fridge, and cooking data
- Add stronger tests for AI response validation and inventory write-off logic
- Add barcode scanning or product database lookup
- Add weekly meal planning and shopping list generation
- Improve offline support for kitchen use
- Add deployment instructions and production Firebase security notes

## License

Source files include an Apache-2.0 SPDX header.