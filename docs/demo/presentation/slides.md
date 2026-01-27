---
theme: seriph
background: '#0f172a'
title: Testing Skill
info: |
  ## Testing Skill
  Automated test planning, writing & verification
class: text-center
transition: slide-left
---

<div class="flex flex-col items-center justify-center h-full">
  <RobotJuggler />

  <h1 class="text-5xl font-bold mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
    Testing Skill
  </h1>

  <p class="text-xl text-gray-400 mt-4">
    Automated test planning, writing & verification
  </p>

  <div class="pt-8">
    <span class="px-4 py-2 text-sm text-gray-500 border border-gray-700 rounded-full">
      Press Space to continue
    </span>
  </div>
</div>

---

layout: image-right
image: /final-scale-issue.png

---

# Tests Became a Scale Issue

<v-clicks>

- **1000+ UI components** across the platform
- **Limited testing resources** vs. feature velocity
- **Manual test writing** doesn't scale
- **Coverage gaps** grow with each release
- **Technical debt** accumulates silently

</v-clicks>

---

## layout: two-cols

# Prompting Doesn't Work

<v-clicks>

"Please write tests for this component"

"Make sure to cover edge cases"

"Follow best practices"

</v-clicks>

<v-click>

<div class="mt-4 p-3 bg-red-100 rounded text-red-800 text-sm">
  Result: Incomplete, flaky, or meaningless tests
</div>

</v-click>

::right::

<div class="pl-4">

<v-click>

<img src="/failure-all-completed.png" class="h-40 rounded shadow mb-4" />

</v-click>

<v-click>

<img src="/failure-comment-a-test.png" class="h-40 rounded shadow" />

</v-click>

</div>

---

# What We Want: Prompt & Get Report

<div class="grid grid-cols-2 gap-8">
<div>

### The Test Verifier Output

<CodeReveal />

</div>
<div>

<v-clicks>

- **Executive summary** at a glance
- **Coverage metrics** before & after
- **Best practices** compliance
- **Mutation testing** results
- **Clear recommendation**

</v-clicks>

</div>
</div>

---

layout: center
class: text-center

---

# The Journey: Prompt to Production

<Pipeline />

<v-click at="7">

<div class="mt-8 text-xl text-green-500 font-bold">
  Mostly green. Automated. Reliable.
</div>

</v-click>
