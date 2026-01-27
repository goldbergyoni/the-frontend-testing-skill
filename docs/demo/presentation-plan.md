# Slidev Presentation Plan: Testing Skill Demo

## Overview

Create a Slidev presentation for the "Motivation" and "What do we want" sections of the Testing Skill demo. All files will be created under `.claude/skills/testing/demo/`.

## Task List

### Phase 1: Setup

- [ ] Initialize Slidev project in `.claude/skills/testing/demo/presentation/`
- [ ] Configure theme (using `seriph` - clean, professional theme)
- [ ] Set up project structure (components/, styles/, public/)

### Phase 2: Motivation Section Slides

- [ ] Slide 1: Cover slide - "Testing Skill" with robot image placeholder
- [ ] Slide 2: Problem 1 - "Tests became a scale issue" with `final-scale-issue.png`
- [ ] Slide 3: Problem 2 - "Prompting doesn't work" with failure images

### Phase 3: "What Do We Want" Section Slides

- [ ] Slide 4: "Prompt & Get Report" - Show test-verifier.md output with v-click animations
- [ ] Slide 5: Create Pipeline component - arrow moving through stations on click

### Phase 4: Custom Components

- [ ] Create `Pipeline.vue` component for the prompt→production visualization
- [ ] Create `CodeReveal.vue` component for line-by-line reveal with arrow

---

## Detailed Implementation Plan

### 1. Project Structure

```
.claude/skills/testing/demo/presentation/
├── slides.md              # Main presentation
├── components/
│   ├── Pipeline.vue       # Custom pipeline visualization
│   └── CodeReveal.vue     # Code with arrow reveal
├── public/
│   └── (symlinks/copies of existing images)
└── package.json
```

### 2. Slide Content Breakdown

#### Cover Slide (layout: cover)

- Title: "Testing Skill"
- Subtitle: "Automated test planning, writing & verification"
- Background: Gradient or robot image

#### Problem 1 Slide (layout: image-right)

- Title: "Tests Became a Scale Issue"
- Content: Bullet points about scale challenges
- Image: `final-scale-issue.png` (existing)
- Use `v-clicks` for progressive reveal

#### Problem 2 Slide (layout: two-cols)

- Title: "Prompting Doesn't Work"
- Left: Show naive prompt approach ("please write tests")
- Right: Show failure results with images
- Images: `failure-all-completed.png`, `failure-comment-a-test.png`

#### Test Verifier Output Slide (layout: default)

- Title: "Prompt & Get Report"
- Show first 10 lines of test-verifier.md
- Use `v-click` with arrow indicator moving line-by-line
- Custom `CodeReveal.vue` component

#### Pipeline Visualization Slide (layout: center)

- Title: "The Journey: Prompt → Production"
- Custom `Pipeline.vue` component showing:
  - Left: "Prompt" input
  - Middle: Stations (Plan → Analyze → Write → Heal → Verify)
  - Right: "Production" output
  - Green/brown colors indicating success/challenge
  - Arrow that moves through stations on click

### 3. Key Slidev Features to Use

| Feature                  | Usage                             |
| ------------------------ | --------------------------------- |
| `v-clicks`               | Progressive list reveals          |
| `v-click` at="N"         | Precise timing for arrow movement |
| `transition: slide-left` | Smooth slide transitions          |
| `layout: image-right`    | Image + text layouts              |
| `layout: two-cols`       | Side-by-side comparison           |
| Custom Vue components    | Pipeline and CodeReveal           |
| UnoCSS classes           | Styling (flex, colors, spacing)   |

### 4. Pipeline Component Design

```vue
<template>
  <div class="pipeline">
    <div class="station start">Prompt</div>
    <div v-for="(station, i) in stations" :key="i">
      <Arrow v-click="i + 1" />
      <div v-click="i + 1" :class="station.color">{{ station.name }}</div>
    </div>
    <div v-click="stations.length + 1" class="station end">Production</div>
  </div>
</template>
```

Stations:

1. **Plan** (green) - Test planner defines what to test
2. **Analyze** (green) - Page analyzer inspects elements
3. **Write** (brown) - Initial test writing (challenges here)
4. **Heal** (brown) - Fix failures
5. **Verify** (green) - Final verification

### 5. Files to Create

1. `presentation/slides.md` - Main slides file
2. `presentation/components/Pipeline.vue` - Pipeline visualization
3. `presentation/components/CodeReveal.vue` - Code reveal with arrow
4. `presentation/package.json` - Slidev dependencies

---

## Verification Plan

1. Run `npm install` in presentation folder
2. Run `npm run dev` to start Slidev
3. Verify all slides render correctly
4. Test click-through animations
5. Test slide transitions
6. Verify images load properly

---

## Available Assets (in demo folder)

Images:

- `final-scale-issue.png` - Scale problem visualization
- `failure-all-completed.png` - Failed completion example
- `failure-comment-a-test.png` - Commented test failure
- `drama.png`, `drama-no-agents.png`, `drama-with-agents.png` - Drama illustrations
- `yuk-shaving.png` - Yak shaving illustration

Markdown files:

- `the-test-verifier.md` - Report output to display in slides
- `test-plan.md` - Test plan example
- `page-analysis.md` - Page analysis example
