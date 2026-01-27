<script setup>
import { ref } from 'vue';

const stations = [
  {
    name: 'Plan',
    icon: '1',
    color: 'green',
    desc: 'Test planner defines scope',
  },
  {
    name: 'Analyze',
    icon: '2',
    color: 'green',
    desc: 'Page analyzer inspects',
  },
  { name: 'Write', icon: '3', color: 'amber', desc: 'Generate test code' },
  { name: 'Heal', icon: '4', color: 'amber', desc: 'Fix failures' },
  { name: 'Verify', icon: '5', color: 'green', desc: 'Final validation' },
];
</script>

<template>
  <div class="flex items-center justify-center gap-2 py-8">
    <!-- Start: Prompt -->
    <div class="flex flex-col items-center">
      <div
        class="w-24 h-24 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"
      >
        Prompt
      </div>
      <div class="text-sm mt-2 text-gray-400">Input</div>
    </div>

    <!-- Stations -->
    <template v-for="(station, index) in stations" :key="station.name">
      <!-- Arrow -->
      <v-click :at="index + 1">
        <div class="flex items-center">
          <svg
            class="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </v-click>

      <!-- Station -->
      <v-click :at="index + 1">
        <div class="flex flex-col items-center">
          <div
            class="w-20 h-20 rounded-xl flex flex-col items-center justify-center text-white font-semibold shadow-lg transition-all"
            :class="{
              'bg-green-500': station.color === 'green',
              'bg-amber-500': station.color === 'amber',
            }"
          >
            <span class="text-2xl mb-1">{{ station.icon }}</span>
            <span class="text-xs">{{ station.name }}</span>
          </div>
          <div class="text-xs mt-2 text-gray-400 max-w-20 text-center">
            {{ station.desc }}
          </div>
        </div>
      </v-click>
    </template>

    <!-- Final Arrow -->
    <v-click :at="6">
      <div class="flex items-center">
        <svg
          class="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </v-click>

    <!-- End: Production -->
    <v-click :at="6">
      <div class="flex flex-col items-center">
        <div
          class="w-24 h-24 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold text-lg shadow-lg"
        >
          Production
        </div>
        <div class="text-sm mt-2 text-gray-400">Output</div>
      </div>
    </v-click>
  </div>
</template>
